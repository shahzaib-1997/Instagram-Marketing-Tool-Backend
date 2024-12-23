"""
Serializers for Django Models:

This module provides serializers for various Django models, including User registration, profile,
and other application-specific models. Each serializer defines the fields to be serialized and
includes validation logic for email addresses and passwords.

Serializers:
    - RegistrationSerializer(serializers.ModelSerializer): Serializer for user registration.
    - ProfileSerializer(serializers.ModelSerializer): Serializer for user profiles.
    - ActivityTimeSerializer(serializers.ModelSerializer): Serializer for ActivityTime model.
    - CredentialSerializer(serializers.ModelSerializer): Serializer for Credential model.
    - HashtagSerializer(serializers.ModelSerializer): Serializer for Hashtag model.
    - PostSerializer(serializers.ModelSerializer): Serializer for Post model.
    - ReelSerializer(serializers.ModelSerializer): Serializer for Reel model.
    - ActivityLogSerializer(serializers.ModelSerializer): Serializer for ActivityLog model.
    - StatSerializer(serializers.ModelSerializer): Serializer for Stat model.

Usage:
    These serializers are designed to be used with Django REST Framework to convert complex data
    types, such as Django models, into Python data types that can be easily rendered into JSON
    responses.They include validation logic to ensure that the data received or sent through API
    requests meets specific criteria.
"""

from django.contrib.auth.models import User
from rest_framework import serializers
from .dry import check_password
from .models import (
    ActivityLog,
    ActivityTime,
    Stat,
    Credential,
    Target,
)


class RegistrationSerializer(serializers.ModelSerializer):
    """
    Serializer for user registration.

    Fields:
        - email: Email address for user registration.
        - username: User's username for registration.
        - password: User's password for registration.

    Extra Attributes:
        - password: Write-only attribute to ensure password is not included in serialized output.

    Example:
        >>> data = {'email': 'test@example.com', 'username': 'testuser', 'password': 'TestPass123!'}
        >>> serializer = RegistrationSerializer(data=data)
        >>> serializer.is_valid()
        True
    """

    email = serializers.EmailField(max_length=255)

    class Meta:
        model = User
        fields = ["email", "username", "password", "first_name", "last_name"]
        extra_kwargs = {"password": {"write_only": True}}

    def validate_email(self, value):
        """
        Validate the email address during user registration.

        This method checks whether the provided email address is not already in use.

        Args:
            value (str): The email address to be validated.

        Raises:
            serializers.ValidationError: If the email is not valid or already exists.

        Returns:
            str: The validated email address.

        Example:
            >>> validate_email("test@example.com")
            "test@example.com"
        """
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with that email already exists.")
        return value

    def validate_password(self, value):
        """
        Validate the password during user registration.

        This method checks whether the provided password meets the specified criteria.

        Args:
            value (str): The password to be validated.

        Raises:
            serializers.ValidationError: If the password does not meet the requirements.

        Returns:
            str: The validated password.

        Example:
            >>> validate_password("TestPass123!")
            "TestPass123!"
        """
        check, message = check_password(value)
        if not check:
            raise serializers.ValidationError(message)
        return value


class PasswordChangeSerializer(serializers.Serializer):
    new_password = serializers.CharField(write_only=True)

    def validate_new_password(self, password):
        check, message = check_password(password)
        if not check:
            raise serializers.ValidationError(message)
        return password


class ProfileSerializer(serializers.ModelSerializer):
    """
    Serializer for user profiles.

    Fields:
        - username: User's username.
        - email: User's email address.

    Example:
        >>> user = User.objects.get(username='testuser')
        >>> serializer = ProfileSerializer(user)
        >>> serializer.data
        {'username': 'testuser', 'email': 'test@example.com'}
    """

    class Meta:
        model = User
        fields = ["username", "email"]

    def validate_email(self, value):
        """
        Validate the email address during user registration.

        This method checks whether the provided email address is not already in use.

        Args:
            value (str): The email address to be validated.

        Raises:
            serializers.ValidationError: If the email is not valid or already exists.

        Returns:
            str: The validated email address.

        Example:
            >>> validate_email("test@example.com")
            "test@example.com"
        """
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with that email already exists.")
        return value


class ActivityTimeSerializer(serializers.ModelSerializer):
    """
    Serializer for ActivityTime model.

    Fields:
        - All fields from the ActivityTime model.

    Example:
        >>> activity_time = ActivityTime.objects.get(pk=1)
        >>> serializer = ActivityTimeSerializer(activity_time)
        >>> serializer.data
        {'id': 1, 'field1': 'value1', 'field2': 'value2', ...}
    """

    class Meta:
        model = ActivityTime
        fields = "__all__"


class CredentialSerializer(serializers.ModelSerializer):
    """
    Serializer for Credential model.

    Fields:
        - All fields from the Credential model.

    Example:
        >>> insta_credential = Credential.objects.get(pk=1)
        >>> serializer = CredentialSerializer(insta_credential)
        >>> serializer.data
        {'id': 1, 'field1': 'value1', 'field2': 'value2', ...}
    """

    class Meta:
        model = Credential
        fields = "__all__"


class ActivityLogSerializer(serializers.ModelSerializer):
    """
    Serializer for ActivityLog model.

    Fields:
        - All fields from the ActivityLog model.

    Example:
        >>> activity_log = ActivityLog.objects.get(pk=1)
        >>> serializer = ActivityLogSerializer(activity_log)
        >>> serializer.data
        {'id': 1, 'field1': 'value1', 'field2': 'value2', ...}
    """

    class Meta:
        model = ActivityLog
        fields = "__all__"


class StatSerializer(serializers.ModelSerializer):
    """
    Serializer for Stat model.

    Fields:
        - All fields from the Stat model.

    Example:
        >>> stat = Stat.objects.get(pk=1)
        >>> serializer = StatSerializer(stat)
        >>> serializer.data
        {'id': 1, 'field1': 'value1', 'field2': 'value2', ...}
    """

    class Meta:
        model = Stat
        fields = "__all__"


class TargetSerializer(serializers.ModelSerializer):
    insta_user = CredentialSerializer(required=False)

    class Meta:
        model = Target
        fields = "__all__"
