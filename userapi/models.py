from django.db import models
from django.contrib.auth.models import User


class ActivityTime(models.Model):
    time = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class InstaCredential(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=255)
    password = models.CharField(max_length=255)


class Hashtag(models.Model):
    hashtag = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class TargetUser(models.Model):
    username = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class Post(models.Model):
    url = models.URLField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class Reel(models.Model):
    url = models.URLField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class ActivityLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    activity = models.CharField(max_length=255)
    time_stamp = models.DateTimeField(auto_now_add=True, blank=True, null=True)


class Stat(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    followers = models.PositiveIntegerField()
    engagement_rate = models.FloatField()
    time_stamp = models.DateTimeField(auto_now_add=True, blank=True, null=True)
