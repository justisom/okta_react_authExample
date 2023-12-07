from functools import wraps

from django.conf import settings
from django.core.cache import cache

from django.contrib.auth import authenticate, logout
from django.contrib.auth.models import update_last_login

from .api_openid import token_introspect, response_401
from .users import get_user

import logging
logger = logging.getLogger(__name__)


def validate_request_token(scopes_required=None):
    """
    Decorator function used to validate oauth token coming from
    external REST call. These are one-off authentication tokens and
    do not persist in the session.
    """
    def wrapper(func):
        @wraps(func)
        def decorated(self, request, *args, **kwargs):
            logger.info("validating request token")
            token = None
            if _token_header:= request.META.get("HTTP_AUTHORIZATION"):
                token = _token_header.strip("Bearer").strip()
            token_info = token_introspect(token, clientless_origin=True)
            token_valid = token_info.get("active")
            if token_valid:
                return func(self, request, *args, **kwargs)
            else:
                return response_401("token invalid")
        return decorated
    return wrapper


def validate_token(scopes_required=None):
    """
    Decorator function used to validate OKTA token coming from 
    frontend REST calls. This will also authenticate the user and
    set user to the session.
    """
    def wrapper(func):
        @wraps(func)
        def decorated(self, request, *args, **kwargs):
            logger.debug(request.META)
            token = None
            if _token_header:= request.META.get("HTTP_AUTHORIZATION"):
                token = _token_header.strip("Bearer").strip()            
            token_info, msg = _validate_oauth_token(
                token,
                scopes_required=scopes_required
            )
            
            token_valid = token_info.get("active")
            if token_valid:
                user = authenticate(token=token)
                user_last_login = user.last_login
                update_last_login(None, user)
                # Set the request user to the authenticated user.
                request.user = user
                new_user = True if not user_last_login else False
                request.session["new_user"] = new_user
                
                # Set session variables
                request.session["username"] = user.username
                request.session["token"] = token
                
                request.session.modified = True
                return func(self, request, *args, **kwargs)
            else:
                username = request.session.get("username")
                # Revoke cache settings
                if username:
                    cache.delete(username)
                logger.error(
                    f"User {username} login error. Token was invalid: {msg}."
                )
                if username:
                    logout(request)
                return response_401(msg)

        return decorated
    return wrapper


def _validate_oauth_token(token, scopes_required=None):
    if scopes_required is None:
        scopes_required = []
    scopes_required = set(scopes_required)

    token_info = {}
    valid_token = False
    has_required_scopes = False
    if token:
        try:
            token_info = token_introspect(token)
        except Exception as e:
            token_info = {"active": False}
            logger.error(
                "Unable to get token info: {}".format(str(e))
            )

        valid_token = token_info.get("active", False)
        if valid_token:
            token_scopes = token_info.get("scope", "").split(" ")
        else:
            token_scopes = []

        has_required_scopes = scopes_required.issubset(
            set(token_scopes))

        if not has_required_scopes:
            logger.warning("Token missed required scopes")

    if (valid_token and has_required_scopes):
        return token_info, "Token has been validated."

    if not valid_token:
        return token_info, "Token Invalid"
    elif not has_required_scopes:
        return token_info, "Token does not have required scopes"
    else:
        return token_info, "Something went wrong checking your token"