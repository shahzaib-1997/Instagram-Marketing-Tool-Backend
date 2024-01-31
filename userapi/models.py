"""
Module: models

This module defines Django models for storing various data related to user activities and social media interactions.

Classes:
    - ActivityTime: Model to store user activity time.
    - Credential: Model to store Instagram credentials for a user.
    - Hashtag: Model to store user-defined hashtags.
    - TargetUser: Model to store target usernames for user activity tracking.
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

    time = models.DateTimeField(null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        """
        method __str__(): Returns a string representation of the object.
        """
        return f"{self.user.username} - {self.time}"


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


class TargetType(models.Model):
    """
    Model representing the target type.

    Attributes:
        user (ForeignKey): The user associated with the target type.
        type (CharField): The type of the target, chosen from predefined options.

    Methods:
        __str__: Returns a string representation of the object.
    """

    options = (
        ("post-like", "post-like"),
        ("post-comment", "post-comment"),
        ("comment-like", "comment-like"),
        ("reels-view", "reels-view"),
        ("reels-like", "reels-like"),
        ("reels-comment", "reels-comment"),
        ("hashtag-like", "hashtag-like"),
        ("hashtag-comment", "hashtag-comment"),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    type = models.CharField(max_length=255, choices=options)
    time_stamp = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    def __str__(self):
        """
        method __str__(): Returns a string representation of the object.
        """
        return f"{self.user.username} - {self.type}"


class Action(models.Model):
    """
    Model representing an action.

    Attributes:
        user (ForeignKey): The user associated with the action.
        type (CharField): The type of the action, chosen from predefined options.
        action_target_type (ForeignKey): The target type associated with the action.

    Methods:
        __str__: Returns a string representation of the object.
    """

    options = (("like", "like"), ("view", "view"))

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    type = models.CharField(max_length=255, choices=options)
    action_target_type = models.ForeignKey(
        TargetType, on_delete=models.CASCADE, null=True, blank=True
    )
    time_stamp = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    def __str__(self):
        """
        method __str__(): Returns a string representation of the object.
        """
        return f"{self.user.username} - {self.type} - {self.action_target_type}"


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

    options = [
        (0, "Not Started"),
        (1, "Running"),
        (2, "Completed"),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    insta_user = models.ForeignKey(
        Credential, on_delete=models.CASCADE, null=True, blank=True
    )
    target_type = models.ForeignKey(
        TargetType, on_delete=models.CASCADE, null=True, blank=True
    )
    activity_time = models.ForeignKey(
        ActivityTime, on_delete=models.CASCADE, null=True, blank=True
    )
    actions = models.ForeignKey(Action, on_delete=models.CASCADE, null=True, blank=True)
    time_stamp = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    status = models.IntegerField(choices=options, default=0)

    def __str__(self):
        """
        method __str__(): Returns a string representation of the object.
        """
        return f"{self.user.username} - {dict(self.options).get(self.status)}"


class Hashtag(models.Model):
    """
    Model to store user-defined hashtags.

    Attributes:
        hashtag (CharField): The user-defined hashtag.
        user (ForeignKey): A foreign key to the User model representing the user associated with the hashtag.

    Methods:
        __str__(): Returns a string representation of the object.

    Example:
        >>> hashtag = Hashtag.objects.get(id=1)
        >>> print(hashtag)
        "username - user_defined_hashtag"
    """

    options = (
        ("like", "like"),
        ("comment", "comment"),
    )

    type = models.CharField(max_length=255, choices=options, null=True, blank=True)
    url = models.TextField(default="")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    target = models.ForeignKey(Target, on_delete=models.CASCADE, null=True, blank=True)
    time_stamp = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    def __str__(self):
        """
        method __str__(): Returns a string representation of the object.
        """
        return f"{self.user.username} - {self.url}"


class TargetUser(models.Model):
    """
    Model to store target usernames for user activity tracking.

    Attributes:
        username (CharField): The target username.
        user (ForeignKey): A foreign key to the User model representing the user associated with the target username.

    Methods:
        __str__(): Returns a string representation of the object.

    Example:
        >>> target_user = TargetUser.objects.get(id=1)
        >>> print(target_user)
        "username - target_username"
    """

    username = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    target = models.ForeignKey(Target, on_delete=models.CASCADE, null=True, blank=True)
    time_stamp = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    def __str__(self):
        """
        method __str__(): Returns a string representation of the object.
        """
        return f"{self.user.username} - {self.username}"


class Post(models.Model):
    """
    Model to store user posts.

    Attributes:
        url (URLField): The URL of the user's post.
        user (ForeignKey): A foreign key to the User model representing the user associated with the post.

    Methods:
        __str__(): Returns a string representation of the object.

    Example:
        >>> post = Post.objects.get(id=1)
        >>> print(post)
        "username - post_url"
    """

    options = (
        ("like", "like"),
        ("comment", "comment"),
    )

    type = models.CharField(max_length=255, choices=options, null=True, blank=True)
    url = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    target = models.ForeignKey(Target, on_delete=models.CASCADE, null=True, blank=True)
    time_stamp = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    def __str__(self):
        """
        method __str__(): Returns a string representation of the object.
        """
        return f"{self.user.username} - {self.url}"


class Comment(models.Model):
    url = models.TextField(default="")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    target = models.ForeignKey(Target, on_delete=models.CASCADE, null=True, blank=True)
    time_stamp = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    def __str__(self):
        """
        method __str__(): Returns a string representation of the object.
        """
        return f"{self.user.username} - {self.url[:25]}"


class Reel(models.Model):
    """
    Model to store user reels.

    Attributes:
        url (URLField): The URL of the user's reel.
        user (ForeignKey): A foreign key to the User model representing the user associated with the reel.

    Methods:
        __str__(): Returns a string representation of the object.

    Example:
        >>> reel = Reel.objects.get(id=1)
        >>> print(reel)
        "username - reel_url"
    """

    options = (
        ("like", "like"),
        ("comment", "comment"),
        ("view", "view"),
    )

    type = models.CharField(max_length=255, choices=options, null=True, blank=True)
    url = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    target = models.ForeignKey(Target, on_delete=models.CASCADE, null=True, blank=True)
    time_stamp = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    def __str__(self):
        """
        method __str__(): Returns a string representation of the object.
        """
        return f"{self.user.username} - {self.url}"


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
        ("followers", "followers"),
        ("engagement_rate", "engagement_rate")
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    insta_account = models.ForeignKey(
        Credential, on_delete=models.CASCADE, null=True, blank=True
    )
    type = models.CharField(max_length=255, choices=options, null=True, blank=True)
    count = models.PositiveIntegerField()
    time_stamp = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    def __str__(self):
        """
        method __str__(): Returns a string representation of the object.
        """
        return f"{self.user.username} - {self.type} - {self.count} - {self.time_stamp.date()}"
