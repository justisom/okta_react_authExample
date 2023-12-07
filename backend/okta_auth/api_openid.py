import base64
from functools import wraps
import requests

from django.conf import settings
from django.core.cache import cache
from rest_framework.response import Response
from rest_framework import status

import logging
logger = logging.getLogger(__name__)

def response_401(err_msg=None):
    if err_msg is None:
        err_msg = "That's all the info we have."
    
    err_response = {
        "error": "Request Invalid",
        "error_description": err_msg
    }
    
    return Response(
        err_response, 
        status=status.HTTP_401_UNAUTHORIZED, 
        headers={'WWW-Authenticate': 'Bearer'}
    )


def verify_request(_request):
    if _request.status_code != 401:
        return _request.json()
    else:
        return response_401("Could not access user info. Is token valid?")


def get_user_info(token):
    header = {
        "Authorization": f"Bearer {token}"
    }

    userinfo_endpoint = settings.USERINFO_ENDPOINT
    req = requests.get(userinfo_endpoint, headers=header)
    return verify_request(req)


def token_introspect(token, clientless_origin=False):
    """
    Check access token validity.

    :param token: <str> An oauth access token.
    :param clientless_origin: <bool> True if token originated from a 
    location outside the session ie an external REST call.

    :returns: introspection payload
    """
    _client_id = settings.CLIENT_ID
    _client_secret = settings.CLIENT_SECRET
    introspect_endpoint = settings.INTROSPECT_ENDPOINT

    basic_auth_str = f"{_client_id}:{_client_secret}"
    auth_header = base64.b64encode(basic_auth_str.encode())
    header = {
        "Authorization": f"Basic: {auth_header.decode('utf-8')}",
        "Content-type": "application/x-www-form-urlencoded"
    }

    data = {
        "token": token,
        "token_type_hint": "access_token",
    }
    
    req = requests.post(introspect_endpoint, headers=header, params=data)
    return verify_request(req)