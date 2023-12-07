from django.contrib.auth import get_user_model

import logging
logger = logging.getLogger(__name__)


def get_user(username):
    return _get_user_case_insensitive(username)


def _get_user_case_insensitive(username):
    """
    Finds a user (if one exists) no matter the case of the provided
    username.

    :param username: <str> the username
    :returns: <object> user object or None
    """
    user_model = get_user_model()

    case_insensitive_username_field = '{}__iexact'.format(
        user_model.USERNAME_FIELD
    )

    user = user_model._default_manager.get(
        **{case_insensitive_username_field: username}
    )
    return user


def update_user(user, force_update=False, **kwargs):
    # Force update will always change values even if they exist.
    # Otherwise only null values will be updated.
    if user:
        pass
        # TODO implement something.
    user.save()  

