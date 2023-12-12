from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import (
    ActivityTime,
    InstaCredential,
    Hashtag,
    TargetUser,
    Post,
    Reel,
    ActivityLog,
    Stat,
)
from .serializers import (
    RegistrationSerializer,
    ProfileSerializer,
    ActivityTimeSerializer,
    InstaCredentialSerializer,
    HashtagSerializer,
    TargetUserSerializer,
    PostSerializer,
    ReelSerializer,
    ActivityLogSerializer,
    StatSerializer,
)


class SignupView(APIView):
    def post(self, request):
        serializer = RegistrationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data
        User.objects.create_user(**validated_data)
        return Response(
            {"message": "User registered successfully."}, status=status.HTTP_201_CREATED
        )


class LoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)

        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response(
                {
                    "message": "Login successfully!",
                    "token": token.key,
                    "user": str(user.id),
                }
            )
        else:
            return Response(
                {"error": "Invalid Credentials!"}, status=status.HTTP_401_UNAUTHORIZED
            )


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get(self, request):
        serializer = ProfileSerializer(request.user)
        return Response(serializer.data)

    def put(self, request):
        serializer = ProfileSerializer(request.user, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request):
        user = request.user
        user.delete()
        return Response(
            {"message": "User deleted successfully"}, status=status.HTTP_204_NO_CONTENT
        )


class ActivityTimeView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get(self, request):
        activity_times = ActivityTime.objects.filter(user=request.user)
        serializer = ActivityTimeSerializer(activity_times, many=True)
        return Response(serializer.data)

    def post(self, request):
        request.data["user"] = request.user.id
        serializer = ActivityTimeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def put(self, request, pk):
        activity_time = get_object_or_404(ActivityTime, pk=pk, user=request.user)
        request.data["user"] = request.user.id
        serializer = ActivityTimeSerializer(activity_time, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, pk):
        activity_time = get_object_or_404(ActivityTime, pk=pk, user=request.user)
        activity_time.delete()
        return Response(
            {"message": "ActivityTime deleted successfully"},
            status=status.HTTP_204_NO_CONTENT,
        )


class InstaCredentialAPIView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get(self, request):
        insta_credentials = InstaCredential.objects.filter(user=request.user)
        serializer = InstaCredentialSerializer(insta_credentials, many=True)
        return Response(serializer.data)

    def post(self, request):
        request.data["user"] = request.user.id
        serializer = InstaCredentialSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def put(self, request, pk):
        insta_credential = get_object_or_404(InstaCredential, pk=pk, user=request.user)
        request.data["user"] = request.user.id
        serializer = InstaCredentialSerializer(insta_credential, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, pk):
        insta_credential = get_object_or_404(InstaCredential, pk=pk, user=request.user)
        insta_credential.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class HashtagView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get(self, request):
        hashtags = Hashtag.objects.filter(user=request.user)
        serializer = HashtagSerializer(hashtags, many=True)
        return Response(serializer.data)

    def post(self, request):
        request.data["user"] = request.user.id
        serializer = HashtagSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def put(self, request, pk):
        hashtag = get_object_or_404(Hashtag, pk=pk, user=request.user)
        request.data["user"] = request.user.id
        serializer = HashtagSerializer(hashtag, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, pk):
        hashtag = get_object_or_404(Hashtag, pk=pk, user=request.user)
        hashtag.delete()
        return Response(
            {"message": "Hashtag deleted successfully"},
            status=status.HTTP_204_NO_CONTENT,
        )
