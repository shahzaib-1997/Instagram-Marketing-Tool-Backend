"""
Module: models

This module defines Django models for storing various data related to user activities and social media interactions.

Classes:
    - ActivityTime: Model to store user activity time.
    - Credential: Model to store Instagram credentials for a user.
    - Hashtag: Model to store user-defined hashtags.
    - Post: Model to store user posts.
    - Reel: Model to store user reels.
    - ActivityLog: Model to store user activity logs.
    - Stat: Model to store user statistics.

Each class includes a string representation method (__str__) for better human-readable output.

Usage:
    These models are intended to be used in a Django project for data storage related to user activities,
    social media interactions, and statistics. They provide a structured way to organize and retrieve data.

Example:
    >>> from models import ActivityTime

    # Create an instance of ActivityTime
    >>> activity_time = ActivityTime.objects.create(user=user_instance, time=datetime_instance)

    # Retrieve and display the string representation of the instance
    >>> print(activity_time)
    "username - timestamp"
"""

from django.db import models
from django.contrib.auth.models import User


class UserData(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    country = models.CharField(max_length=255)
    image = models.ImageField(upload_to="User/", default="User/dummy.jpg")


class ActivityTime(models.Model):
    """
    Model to store user activity time.

    Attributes:
        time (DateTimeField): The timestamp of the activity time.
        user (ForeignKey): A foreign key to the User model representing the user associated with the activity time.

    Methods:
        __str__(): Returns a string representation of the object.

    Example:
        >>> activity_time = ActivityTime.objects.get(id=1)
        >>> print(activity_time)
        "username - timestamp"
    """

    target = models.ForeignKey(
        "Target",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="activity_time",
    )
    time = models.CharField(max_length=255, null=True, blank=True)
    day = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        """
        method __str__(): Returns a string representation of the object.
        """
        return f"{self.target} - {self.day} - {self.time}"


class Credential(models.Model):
    """
    Model to store Instagram credentials for a user.

    Attributes:
        user (ForeignKey): A foreign key to the User model representing the user associated with the credentials.
        username (CharField): The Instagram username.
        password (CharField): The Instagram password.

    Methods:
        __str__(): Returns a string representation of the object.

    Example:
        >>> insta_credential = Credential.objects.get(id=1)
        >>> print(insta_credential)
        "username - instagram_username"
    """

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    profile_id = models.CharField(max_length=255, blank=True, null=True)
    time_stamp = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    class Meta:
        unique_together = ("user", "username")

    def __str__(self):
        """
        method __str__(): Returns a string representation of the object.
        """
        return f"{self.user.username} - {self.username}"


class Target(models.Model):
    """
    Model representing a target.

    Attributes:
        user (ForeignKey): The user associated with the target.
        target_type (ForeignKey): The target type associated with the target.
        activity_time (ForeignKey): The activity time associated with the target.
        actions (ForeignKey): The actions associated with the target.

    Methods:
        __str__: Returns a string representation of the object.
    """

    TARGET_TYPE_CHOICES = (
        ("post-like", "post-like"),
        ("post-comment", "post-comment"),
        ("comment-like", "comment-like"),
        ("reels-view", "reels-view"),
        ("reels-like", "reels-like"),
        ("reels-comment", "reels-comment"),
        ("hashtag-like", "hashtag-like"),
        ("hashtag-comment", "hashtag-comment"),
    )
    options = [
        (0, "Not Started"),
        (1, "Running"),
        (2, "Completed"),
    ]
    LIKE_CHOICES = [
        ("first","First"),
        ("last","Last"),
        ("last & first","Last & first"),
        ("all","All"),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    insta_user = models.ForeignKey(
        Credential, on_delete=models.CASCADE, null=True, blank=True
    )
    target_type = models.CharField(max_length=50, choices=TARGET_TYPE_CHOICES, null=True, blank=True)
    user_comment = models.TextField(default="", null=True, blank=True)
    url = models.TextField(default="")
    view_story = models.BooleanField(default=False)
    like_story = models.BooleanField(default=False)
    like_option = models.CharField(max_length=20, choices=LIKE_CHOICES, null=True, blank=True)
    time_stamp = models.DateTimeField(auto_now_add=True)
    status = models.IntegerField(choices=options, default=0)

    def __str__(self):
        """
        method __str__(): Returns a string representation of the object.
        """
        return f"{self.user.username} - {self.insta_user.username} - {self.target_type} - {dict(self.options).get(self.status)}"


class ActivityLog(models.Model):
    """
    Model to store user activity logs.

    Attributes:
        user (ForeignKey): A foreign key to the User model representing the user associated with the activity log.
        activity (CharField): The description of the activity.
        time_stamp (DateTimeField): The timestamp of the activity log.

    Methods:
        __str__(): Returns a string representation of the object.

    Example:
        >>> activity_log = ActivityLog.objects.get(id=1)
        >>> print(activity_log)
        "username - activity_description"
    """

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    insta_account = models.ForeignKey(
        Credential, on_delete=models.CASCADE, blank=True, null=True
    )
    activity = models.CharField(max_length=255)
    time_stamp = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    read = models.BooleanField(default=False)

    def __str__(self):
        """
        method __str__(): Returns a string representation of the object.
        """
        return f"{self.user.username} - {self.activity}"


class Stat(models.Model):
    """
    Model to store user statistics.

    Attributes:
        user (ForeignKey): A foreign key to the User model representing the user associated with the statistics.
        followers (PositiveIntegerField): The number of followers.
        engagement_rate (FloatField): The engagement rate.
        time_stamp (DateTimeField): The timestamp of the statistics.

    Example:
        >>> stat = Stat.objects.get(id=1)
        >>> print(stat)
        "username - followers_count"
    """

    options = (
        ("like", "like"),
        ("comment", "comment"),
        ("posts", "posts"),
        ("followers", "followers"),
        ("following", "following"),
        ("engagement_rate", "engagement_rate"),
    )
    insta_account = models.ForeignKey(
        Credential, on_delete=models.CASCADE, null=True, blank=True, related_name="stats"
    )
    type = models.CharField(max_length=255, choices=options, null=True, blank=True)
    count = models.PositiveIntegerField()
    time_stamp = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    def __str__(self):
        """
        method __str__(): Returns a string representation of the object.
        """
        return f"{self.user.username} - {self.type} - {self.count} - {self.time_stamp.date()}"
