from django.conf import settings
from django.contrib.auth import logout

from rest_framework import generics
from rest_framework.response import Response

from .token import validate_token
from .users import get_user

import logging
logger = logging.getLogger(__name__)

class UserInfoAPI(generics.GenericAPIView):
    """
    This was just a sanity check class. Keeping it for the time being.
    """
    @validate_token()
    def get(self, request, *args, **kwargs):
        user = get_user(request.session.get("username"))
        return Response(user.username)


class AuthenticateUserAPI(generics.GenericAPIView):
    @validate_token()
    def get(self, request, *args, **kwargs):
        user = request.user
        logger.debug(
            f"User {user} is authenticated?: {user.is_authenticated}"
        )
        request.session.modified = True
        user_data = {
            "username": user.username,
            "email": user.email,
            "user_id": user.id,
            "admin": user.is_superuser,
            "user_fullname": user.get_full_name(),
            "new_user": request.session.get('new_user')
        }
        return Response(user_data)


class RevokeSessionAPI(generics.GenericAPIView):
    @validate_token()
    def post(self, request, *args, **kwargs):
        logger.info(f"User {request.user} has logged out.")
        logout(request)
        return Response({"revocation": True})

