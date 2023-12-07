from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .forms import VCUserCreationForm, VCUserChangeForm
from .models import VCUser

class VCUserAdmin(UserAdmin):
    add_form = VCUserCreationForm
    form = VCUserChangeForm
    model = VCUser
    list_display = ['email', 'username',]

admin.site.register(VCUser, VCUserAdmin)