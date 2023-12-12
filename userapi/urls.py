from django.urls import path
from userapi import views

urlpatterns = [
    path('signup/',views.SignupView.as_view()),
    path('login/',views.LoginView.as_view()),
    path('profile/',views.ProfileView.as_view()),
    path('activity-time/', views.ActivityTimeView.as_view()),
    path('activity-time/<int:pk>/', views.ActivityTimeView.as_view()),
    path('hashtags/', views.HashtagView.as_view()),
    path('hashtags/<int:pk>/', views.HashtagView.as_view()),

]