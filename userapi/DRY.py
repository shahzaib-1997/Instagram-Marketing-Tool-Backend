"""
Module Description:

This module provides utility functions and classes to ensure the Django DRY (Don't Repeat Yourself) 
rule across multiple files in a Django project. It includes functions for password and email
validation, as well as base classes for API views with authentication and custom renderers.

Functions:
    - check_password(password): Check if a password meets specific requirements.
    - check_email(email): Check if an email address is valid.
    - add_user(mutable_data, user_id): Add user information to mutable data.
    - szr_val_save(serializer, status_code): Validate and save a serializer instance.

Classes:
    - BaseAPIView(APIView): Base class for API views with authentication and permission settings.
    - RenderAPIView(APIView): API view with a custom renderer for user-specific responses.

Usage:
    This module is designed to be imported and used in other Django files to promote code reuse and
    maintainability.
"""

import re
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .renderers import UserRenderers


def check_password(password):
    """
    Check if a password meets specific requirements.

    Args:
        password (str): The password to be checked.

    Returns:
        tuple: A tuple containing a boolean indicating whether the password meets
               the requirements and a corresponding message.

    Example:
        >>> check_password("TestPass123!")
        (True, "Password meets all requirements")
    """
    # Check if password is at least 8 characters long
    if len(password) < 8:
        return False, "Password must be at least 8 characters long"

    # Check if password contains at least 1 uppercase letter
    if not any(char.isupper() for char in password):
        return False, "Password must contain at least 1 uppercase letter"

    # Check if password contains at least 1 lowercase letter
    if not any(char.islower() for char in password):
        return False, "Password must contain at least 1 lowercase letter"

    # Check if password contains at least 1 digit
    if not any(char.isdigit() for char in password):
        return False, "Password must contain at least 1 digit"

    # Check if password contains at least 1 special character
    special_chars = r"!@#$%^&*()_-+={}[]|\:;'<>,.?/~`"
    if not any(char in special_chars for char in password):
        return False, "Password must contain at least 1 special character"

    # If all requirements are met, return True
    return True, "Password meets all requirements"


def check_email(email):
    """
    Check if an email address is valid.

    Args:
        email (str): The email address to be checked.

    Returns:
        bool: True if the email is valid, False otherwise.

    Example:
        >>> check_email("test@example.com")
        True
    """
    email_regix = r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b"

    return bool(re.match(email_regix, email))


class BaseAPIView(APIView):
    """
    Base class for API views with authentication and permission settings.

    Attributes:
        permission_classes (list): List of permission classes.
        authentication_classes (list): List of authentication classes.
    """

    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]


class RenderAPIView(APIView):
    """
    API view with a custom renderer for user-specific responses.

    Attributes:
        renderer_classes (list): List of renderer classes.
    """

    renderer_classes = [UserRenderers]


def add_user(mutable_data, user_id):
    """
    Add user information to mutable data.

    Args:
        mutable_data (dict): Mutable data to which user information is added.
        user_id (int): User ID to be added to the mutable data.

    Returns:
        dict: The updated mutable data with user information.

    Example:
        >>> add_user({"key": "value"}, 123)
        {'key': 'value', 'user': 123}
    """
    mutable_data["user"] = user_id
    return mutable_data


def szr_val_save(serializer, status_code=status.HTTP_200_OK):
    """
    Validate and save a serializer instance.

    Args:
        serializer: The serializer instance to be validated and saved.
        status_code (int): HTTP status code for the response (default: 200).

    Returns:
        Response: Response object containing serialized data or errors.

    Example:
        >>> szr = MyModelSerializer(data={'field': 'value'})
        >>> szr_val_save(szr)
        <Response status_code=200 data={'field': 'value'}>
    """
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status_code)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
