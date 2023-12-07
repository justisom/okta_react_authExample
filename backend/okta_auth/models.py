from django.contrib.auth.models import AbstractUser, UserManager
from django.db import models

class CustomUserManager(UserManager):
    def get_by_natural_key(self, username):
        case_insensitive_username_field = '{}__iexact'.format(
            self.model.USERNAME_FIELD
        )

        return self.get(**{case_insensitive_username_field: username})


class VCUser(AbstractUser):
    objects = CustomUserManager()
    sg_id = models.IntegerField(null=True)
    user_type = models.CharField(max_length=12, blank=True, null=True)

    def __str__(self):
        return self.username