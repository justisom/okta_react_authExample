from django.conf import settings
from django.contrib.auth.backends import BaseBackend
from .models import VCUser as User

from .api_openid import get_user_info
from .users import get_user, update_user

import logging
logger = logging.getLogger(__name__)

class OktaAuthBackend(BaseBackend):
    """
    Authenticate against the OIDC Access Token
    """    
    def authenticate(self, request, token=None):
        user_info = get_user_info(token)
        if user_info:
            username = user_info.get("preferred_username")
            try:
                user = get_user(username)
                update_user(
                    user
                )
            except User.DoesNotExist:
                logger.warning(
                    f"User '{username}' does not exist. Creating new user."
                )
                user = User(username=username)
                user.email = user_info["email"]
                user.first_name = user_info["given_name"]
                user.last_name = user_info["family_name"]
                user.save()
            return user
        return None