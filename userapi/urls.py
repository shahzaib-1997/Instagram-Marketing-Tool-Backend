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
    path("", views.home, name="home"),
    path("all-users/", views.GetAllUsers.as_view(), name="all-users"),
    path("token/", views.CreateToken.as_view(), name="token"),
    path("signup/", views.SignupView.as_view(), name="signup"),
    path("signin/", views.LoginView.as_view(), name="login"),
    path('logout/', views.logout_user, name='logout'),
    path('about/', views.about, name='about'),
    path('pricing/', views.pricing, name='pricing'),
    path('privacy-policy/', views.pricing, name='privacy-policy'),
    path('terms-condition/', views.pricing, name='terms-condition'),
    path('contact/', views.contact, name='contact'),
    path("profile/", views.ProfileView.as_view(), name="profile"),
    path("password-change-user/", views.PasswordChangeUsernameView.as_view(), name="password-change-user"),
    path("password-change/", views.PasswordChangeView.as_view(), name="password-change"),
    path('dashboard/', views.DashboardView.as_view(), name='dashboard'),
    path("activity-time/", views.ActivityTimeView.as_view(), name="activity-time"),
    path("activity-time/<int:pk>/", views.ActivityTimeView.as_view(), name="activity-time"),
    path("credential/", views.CredentialView.as_view(), name="credential"),
    path("credential/<int:pk>/", views.CredentialView.as_view(), name="credential"),
    path("hashtag/", views.HashtagView.as_view(), name="hashtag"),
    path("hashtag/<int:pk>/", views.HashtagView.as_view(), name="hashtag"),
    path("target-user/", views.TargetUserView.as_view(), name="target-user"),
    path("target-user/<int:pk>/", views.TargetUserView.as_view(), name="target-user"),
    path("post/", views.PostView.as_view(), name="post"),
    path("post/<int:pk>/", views.PostView.as_view(), name="post"),
    path("reel/", views.ReelView.as_view(), name="reel"),
    path("reel/<int:pk>/", views.ReelView.as_view(), name="reel"),
    path("activity-log/", views.ActivityLogView.as_view(), name="activity-log"),
    path("activity-log/<int:pk>/", views.ActivityLogView.as_view(), name="activity-log"),
    path("stat/", views.StatView.as_view(), name="stat"),
    path("stat/<int:pk>/", views.StatView.as_view(), name="stat"),
    path("target-type/", views.TargetTypeView.as_view(), name="target-type"),
    path("target-type/<int:pk>/", views.TargetTypeView.as_view(), name="target-type"),
    path("target/", views.TargetView.as_view(), name="target"),
    path("target/<int:pk>/", views.TargetView.as_view(), name="target"),
    path("action/", views.ActionView.as_view(), name="action"),
    path("action/<int:pk>/", views.ActionView.as_view(), name="action"),
]
