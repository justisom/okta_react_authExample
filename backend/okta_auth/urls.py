from django.urls import path
from .api import AuthenticateUserAPI, RevokeSessionAPI, UserInfoAPI

urlpatterns = [
    path("auth/user", AuthenticateUserAPI.as_view(), name='authenticate_user'),
    path("auth/revoke", RevokeSessionAPI.as_view(), name='revoke_session'),
    path("user_info", UserInfoAPI.as_view(), name='user_info'),
]
