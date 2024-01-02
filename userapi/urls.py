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
from django.views.generic import TemplateView
from userapi import views

app_name = "userapi"

urlpatterns = [
    path("", views.home, name="home"),
    path("all-users/", views.GetAllUsers.as_view(), name="all-users"),
    path("token/", views.CreateToken.as_view(), name="token"),
    path("signup/", views.SignupView.as_view(), name="signup"),
    path("signin/", views.LoginView.as_view(), name="login"),
    path("logout/", views.logout_user, name="logout"),
    path("dashboard/", views.DashboardView.as_view(), name="dashboard"),
    path(
        "insta-credentials/",
        views.InstaCredentialView.as_view(),
        name="insta-credentials",
    ),
    path(
        "insta-credential/<str:pk>/",
        views.InstaCredentialView.as_view(),
        name="insta-credential",
    ),
    path("target-edit/", views.TargetTemplateView.as_view(), name="target-edit"),
    path(
        "target-edit/<int:pk>/", views.TargetTemplateView.as_view(), name="target-edit"
    ),
    path("about/", views.about, name="about"),
    path(
        "pricing/",
        TemplateView.as_view(template_name="userapi/pricing.html"),
        name="pricing",
    ),
    path(
        "privacy-policy/",
        TemplateView.as_view(template_name="userapi/privacy.html"),
        name="privacy-policy",
    ),
    path(
        "terms-condition/",
        TemplateView.as_view(template_name="userapi/terms.html"),
        name="terms-condition",
    ),
    path("contact/", views.contact, name="contact"),
    path("profile/", views.ProfileView.as_view(), name="profile"),
    path("update-profile/", views.ProfileView.as_view(), name="update-profile"),
    path(
        "forgot-password/",
        views.PasswordChangeUsernameView.as_view(),
        name="forgot-password",
    ),
    path(
        "change-password/", views.PasswordChangeView.as_view(), name="change-password"
    ),
    path("activity-time/", views.ActivityTimeView.as_view(), name="activity-time"),
    path(
        "activity-time/<int:pk>/",
        views.ActivityTimeView.as_view(),
        name="activity-time",
    ),
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
    path(
        "activity-log/<int:pk>/", views.ActivityLogView.as_view(), name="activity-log"
    ),
    path("stat/", views.StatView.as_view(), name="stat"),
    path("stat/<int:pk>/", views.StatView.as_view(), name="stat"),
    path("target-type/", views.TargetTypeView.as_view(), name="target-type"),
    path("target-type/<int:pk>/", views.TargetTypeView.as_view(), name="target-type"),
    path("target/", views.TargetView.as_view(), name="target"),
    path("target/<int:pk>/", views.TargetView.as_view(), name="target"),
    path("action/", views.ActionView.as_view(), name="action"),
    path("action/<int:pk>/", views.ActionView.as_view(), name="action"),
    path("how/", TemplateView.as_view(template_name="userapi/how.html"), name="how"),
    path(
        "features/",
        TemplateView.as_view(template_name="userapi/features.html"),
        name="features",
    ),
    path(
        "instagram-growth-service/",
        TemplateView.as_view(template_name="userapi/instagram-growth-service.html"),
        name="instagram-growth-service",
    ),
    path(
        "testimonials/",
        TemplateView.as_view(template_name="userapi/testimonials.html"),
        name="testimonials",
    ),
    path(
        "instagram-agency/",
        TemplateView.as_view(template_name="userapi/instagram-agency.html"),
        name="instagram-agency",
    ),
    path(
        "instagram-for-business/",
        TemplateView.as_view(template_name="userapi/instagram-for-business.html"),
        name="instagram-for-business",
    ),
    path(
        "instagram-creator-account/",
        TemplateView.as_view(template_name="userapi/instagram-creator-account.html"),
        name="instagram-creator-account",
    ),
    path(
        "instagram-manager/",
        TemplateView.as_view(template_name="userapi/instagram-manager.html"),
        name="instagram-manager",
    ),
    path(
        "partners/",
        TemplateView.as_view(template_name="userapi/partners.html"),
        name="partners",
    ),
    path(
        "instagram-influencers/",
        TemplateView.as_view(template_name="userapi/instagram-influencers.html"),
        name="instagram-influencers",
    ),
    path(
        "instagram-models/",
        TemplateView.as_view(template_name="userapi/instagram-models.html"),
        name="instagram-models",
    ),
    path(
        "instagram-meme-accounts/",
        TemplateView.as_view(template_name="userapi/instagram-meme-accounts.html"),
        name="instagram-meme-accounts",
    ),
    path(
        "affiliate/",
        TemplateView.as_view(template_name="userapi/affiliate.html"),
        name="affiliate",
    ),
    path(
        "careers/",
        TemplateView.as_view(template_name="userapi/careers.html"),
        name="careers",
    ),
    path(
        "press/", TemplateView.as_view(template_name="userapi/press.html"), name="press"
    ),
    path(
        "instagram-tools/",
        TemplateView.as_view(template_name="userapi/instagram-tools.html"),
        name="instagram-tools",
    ),
]
