from django.contrib.auth.models import User
from rest_framework import serializers
from .helper import check_email, check_password
from .models import (
    ActivityLog,
    ActivityTime,
    Post,
    Reel,
    Hashtag,
    Stat,
    TargetUser,
    InstaCredential,
)


class RegistrationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255)

    class Meta:
        model = User
        fields = ["email", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def validate_email(self, value):
        if not check_email(value):
            raise serializers.ValidationError("Email not valid!")
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with that email already exists.")
        return value

    def validate_password(self, value):
        check, message = check_password(value)
        if not check:
            raise serializers.ValidationError(message)
        return value


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "email"]


class ActivityTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityTime
        fields = "__all__"


class InstaCredentialSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstaCredential
        fields = "__all__"


class HashtagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hashtag
        fields = "__all__"


class TargetUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = TargetUser
        fields = "__all__"


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"


class ReelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reel
        fields = "__all__"


class ActivityLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityLog
        fields = "__all__"


class StatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stat
        fields = "__all__"
