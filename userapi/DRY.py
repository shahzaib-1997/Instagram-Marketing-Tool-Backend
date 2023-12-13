import re
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .renderers import UserRenderers


def check_password(password):
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
    email_regix = r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b"

    return bool(re.match(email_regix, email))


class BaseAPIView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]


class RenderAPIView(APIView):
    renderer_classes = [UserRenderers]


def add_user(mutable_data, user_id):
    mutable_data["user"] = user_id
    return mutable_data


def szr_val_save(serializer, status_code=status.HTTP_200_OK):
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status_code)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
