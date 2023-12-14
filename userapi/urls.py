"""
Module: urls

This module defines the URL patterns for the userapi app.

Usage:
    These URL patterns are intended to be included in the Django project's main URL configuration (urls.py).
    The patterns map various endpoints to corresponding views in the userapi.views module.

Example:
    >>> from django.urls import include, path
    >>> from userapi import views

    # Include the userapi URL patterns in the main URL configuration
    >>> urlpatterns = [
    ...     path("userapi/", include("userapi.urls")),
    ... ]

    # The userapi.urls module would contain patterns like:
    >>> from django.urls import path
    >>> from userapi import views

    >>> urlpatterns = [
    ...     path("signup/", views.SignupView.as_view()),
    ...     path("login/", views.LoginView.as_view()),
    ...     # ... other paths ...
    ... ]
"""
from django.urls import path
from userapi import views

app_name = "userapi"

urlpatterns = [
    path("signup/", views.SignupView.as_view()),
    path("login/", views.LoginView.as_view()),
    path("profile/", views.ProfileView.as_view()),
    path("password-change/", views.PasswordChangeView.as_view()),
    path("activity-time/", views.ActivityTimeView.as_view()),
    path("activity-time/<int:pk>/", views.ActivityTimeView.as_view()),
    path("insta-credential/", views.InstaCredentialView.as_view()),
    path("insta-credential/<int:pk>/", views.InstaCredentialView.as_view()),
    path("hashtag/", views.HashtagView.as_view()),
    path("hashtag/<int:pk>/", views.HashtagView.as_view()),
    path("target-user/", views.TargetUserView.as_view()),
    path("target-user/<int:pk>/", views.TargetUserView.as_view()),
    path("post/", views.PostView.as_view()),
    path("post/<int:pk>/", views.PostView.as_view()),
    path("reel/", views.ReelView.as_view()),
    path("reel/<int:pk>/", views.ReelView.as_view()),
    path("activity-log/", views.ActivityLogView.as_view()),
    path("activity-log/<int:pk>/", views.ActivityLogView.as_view()),
    path("stat/", views.StatView.as_view()),
    path("stat/<int:pk>/", views.StatView.as_view()),
    path("target-type/", views.TargetTypeView.as_view()),
    path("target-type/<int:pk>/", views.TargetTypeView.as_view()),
    path("target/", views.TargetView.as_view()),
    path("target/<int:pk>/", views.TargetView.as_view()),
    path("action/", views.ActionView.as_view()),
    path("action/<int:pk>/", views.ActionView.as_view()),
]
