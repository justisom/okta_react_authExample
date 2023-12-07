from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import VCUser

class VCUserCreationForm(UserCreationForm):

    class Meta:
        model = VCUser
        fields = ('username', 'email')

class VCUserChangeForm(UserChangeForm):

    class Meta:
        model = VCUser
        fields = ('username', 'email')