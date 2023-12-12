from django.urls import path
from userapi import views

urlpatterns = [
    path('signup/',views.SignupView.as_view()),
    path('login/',views.LoginView.as_view()),
    path('profile/',views.ProfileView.as_view()),
    path('activity-time/', views.ActivityTimeView.as_view()),
    path('activity-time/<int:pk>/', views.ActivityTimeView.as_view()),
    path('insta-credential/', views.InstaCredentialView.as_view()),
    path('insta-credential/<int:pk>/', views.InstaCredentialView.as_view()),
    path('hashtag/', views.HashtagView.as_view()),
    path('hashtag/<int:pk>/', views.HashtagView.as_view()),
    path('target-user/', views.TargetUserView.as_view()),
    path('target-user/<int:pk>/', views.TargetUserView.as_view()),
    path('post/', views.PostView.as_view()),
    path('post/<int:pk>/', views.PostView.as_view()),
    path('reel/', views.ReelView.as_view()),
    path('reel/<int:pk>/', views.ReelView.as_view()),
    path('activity-log/', views.ActivityLogView.as_view()),
    path('activity-log/<int:pk>/', views.ActivityLogView.as_view()),
    path('stat/', views.StatView.as_view()),
    path('stat/<int:pk>/', views.StatView.as_view()),

]