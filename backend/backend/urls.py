# from django.contrib import admin
from django.urls import path, re_path, include
from django.shortcuts import render
from django.views.generic import TemplateView

urlpatterns = [
    path("api/", include("okta_auth.urls")),
    path("", include("frontend.urls")),
]