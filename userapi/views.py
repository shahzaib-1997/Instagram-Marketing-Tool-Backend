from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .renderers import UserRenderers
from .DRY import BaseAPIView, szr_val_save, add_user
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
    renderer_classes = [UserRenderers]

    def post(self, request):
        try:
            serializer = RegistrationSerializer(data=request.data)
            if serializer.is_valid():
                validated_data = serializer.validated_data
                User.objects.create_user(**validated_data)
                return Response(
                    {"message": "User registered successfully."},
                    status=status.HTTP_201_CREATED,
                )
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class LoginView(APIView):
    renderer_classes = [UserRenderers]

    def post(self, request):
        try:
            username = request.data.get("username")
            password = request.data.get("password")
            user = authenticate(username=username, password=password)

            if user:
                token, _ = Token.objects.get_or_create(user=user)
                return Response(
                    {
                        "message": "Login successfully!",
                        "token": token.key,
                        "user": str(user.id),
                    }
                )
            return Response(
                {"error": "Invalid Credentials!"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class ProfileView(BaseAPIView):
    def get(self, request):
        try:
            serializer = ProfileSerializer(request.user)
            return Response(serializer.data)
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def put(self, request):
        try:
            serializer = ProfileSerializer(request.user, data=request.data)
            return szr_val_save(serializer)
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def delete(self, request):
        try:
            user = request.user
            user.delete()
            return Response(
                {"message": "User deleted successfully"},
                status=status.HTTP_204_NO_CONTENT,
            )
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class ActivityTimeView(BaseAPIView):
    def get(self, request):
        try:
            activity_times = ActivityTime.objects.filter(user=request.user)
            serializer = ActivityTimeSerializer(activity_times, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def post(self, request):
        try:
            mutable_data = add_user(request.data.copy(), request.user.id)
            serializer = ActivityTimeSerializer(data=mutable_data)
            return szr_val_save(serializer, status.HTTP_201_CREATED)
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def put(self, request, pk):
        try:
            activity_time = get_object_or_404(ActivityTime, pk=pk, user=request.user)
            mutable_data = add_user(request.data.copy(), request.user.id)
            serializer = ActivityTimeSerializer(activity_time, data=mutable_data)
            return szr_val_save(serializer)
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def delete(self, request, pk):
        try:
            activity_time = get_object_or_404(ActivityTime, pk=pk, user=request.user)
            activity_time.delete()
            return Response(
                {"message": "ActivityTime deleted successfully"},
                status=status.HTTP_204_NO_CONTENT,
            )
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class InstaCredentialView(BaseAPIView):
    def get(self, request):
        try:
            insta_credentials = InstaCredential.objects.filter(user=request.user)
            serializer = InstaCredentialSerializer(insta_credentials, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def post(self, request):
        try:
            mutable_data = add_user(request.data.copy(), request.user.id)
            serializer = InstaCredentialSerializer(data=mutable_data)
            return szr_val_save(serializer, status.HTTP_201_CREATED)
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def put(self, request, pk):
        try:
            insta_credential = get_object_or_404(
                InstaCredential, pk=pk, user=request.user
            )
            mutable_data = add_user(request.data.copy(), request.user.id)
            serializer = InstaCredentialSerializer(insta_credential, data=mutable_data)
            return szr_val_save(serializer)
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def delete(self, request, pk):
        try:
            insta_credential = get_object_or_404(
                InstaCredential, pk=pk, user=request.user
            )
            insta_credential.delete()
            return Response(
                {"message": "Insta Credential deleted successfully"},
                status=status.HTTP_204_NO_CONTENT,
            )
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class HashtagView(BaseAPIView):
    def get(self, request):
        try:
            hashtags = Hashtag.objects.filter(user=request.user)
            serializer = HashtagSerializer(hashtags, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def post(self, request):
        try:
            mutable_data = add_user(request.data.copy(), request.user.id)
            serializer = HashtagSerializer(data=mutable_data)
            return szr_val_save(serializer, status.HTTP_201_CREATED)
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def put(self, request, pk):
        try:
            hashtag = get_object_or_404(Hashtag, pk=pk, user=request.user)
            mutable_data = add_user(request.data.copy(), request.user.id)
            serializer = HashtagSerializer(hashtag, data=mutable_data)
            return szr_val_save(serializer)
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def delete(self, request, pk):
        try:
            hashtag = get_object_or_404(Hashtag, pk=pk, user=request.user)
            hashtag.delete()
            return Response(
                {"message": "Hashtag deleted successfully"},
                status=status.HTTP_204_NO_CONTENT,
            )
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class TargetUserView(BaseAPIView):
    def get(self, request):
        try:
            target_users = TargetUser.objects.filter(user=request.user)
            serializer = TargetUserSerializer(target_users, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def post(self, request):
        try:
            mutable_data = add_user(request.data.copy(), request.user.id)
            serializer = TargetUserSerializer(data=mutable_data)
            return szr_val_save(serializer, status.HTTP_201_CREATED)
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def put(self, request, pk):
        try:
            target_user = get_object_or_404(TargetUser, pk=pk, user=request.user)
            mutable_data = add_user(request.data.copy(), request.user.id)
            serializer = TargetUserSerializer(target_user, data=mutable_data)
            return szr_val_save(serializer)
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def delete(self, request, pk):
        try:
            target_user = get_object_or_404(TargetUser, pk=pk, user=request.user)
            target_user.delete()
            return Response(
                {"message": "Target User deleted successfully"},
                status=status.HTTP_204_NO_CONTENT,
            )
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class PostView(BaseAPIView):
    def get(self, request):
        try:
            posts = Post.objects.filter(user=request.user)
            serializer = PostSerializer(posts, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def post(self, request):
        try:
            mutable_data = add_user(request.data.copy(), request.user.id)
            serializer = PostSerializer(data=mutable_data)
            return szr_val_save(serializer, status.HTTP_201_CREATED)
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def put(self, request, pk):
        try:
            post = get_object_or_404(Post, pk=pk, user=request.user)
            mutable_data = add_user(request.data.copy(), request.user.id)
            serializer = PostSerializer(post, data=mutable_data)
            return szr_val_save(serializer)
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def delete(self, request, pk):
        try:
            post = get_object_or_404(Post, pk=pk, user=request.user)
            post.delete()
            return Response(
                {"message": "Post deleted successfully"},
                status=status.HTTP_204_NO_CONTENT,
            )
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class ReelView(BaseAPIView):
    def get(self, request):
        try:
            reels = Reel.objects.filter(user=request.user)
            serializer = ReelSerializer(reels, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def post(self, request):
        try:
            mutable_data = add_user(request.data.copy(), request.user.id)
            serializer = ReelSerializer(data=mutable_data)
            return szr_val_save(serializer, status.HTTP_201_CREATED)
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def put(self, request, pk):
        try:
            reel = get_object_or_404(Reel, pk=pk, user=request.user)
            mutable_data = add_user(request.data.copy(), request.user.id)
            serializer = ReelSerializer(reel, data=mutable_data)
            return szr_val_save(serializer)
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def delete(self, request, pk):
        try:
            reel = get_object_or_404(Reel, pk=pk, user=request.user)
            reel.delete()
            return Response(
                {"message": "Reel deleted successfully"},
                status=status.HTTP_204_NO_CONTENT,
            )
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class ActivityLogView(BaseAPIView):
    def get(self, request):
        try:
            activity_logs = ActivityLog.objects.filter(user=request.user)
            serializer = ActivityLogSerializer(activity_logs, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def post(self, request):
        try:
            mutable_data = add_user(request.data.copy(), request.user.id)
            serializer = ActivityLogSerializer(data=mutable_data)
            return szr_val_save(serializer, status.HTTP_201_CREATED)
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def put(self, request, pk):
        try:
            activity_log = get_object_or_404(ActivityLog, pk=pk, user=request.user)
            mutable_data = add_user(request.data.copy(), request.user.id)
            serializer = ActivityLogSerializer(activity_log, data=mutable_data)
            return szr_val_save(serializer)
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def delete(self, request, pk):
        try:
            activity_log = get_object_or_404(ActivityLog, pk=pk, user=request.user)
            activity_log.delete()
            return Response(
                {"message": "Activity Log deleted successfully"},
                status=status.HTTP_204_NO_CONTENT,
            )
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class StatView(BaseAPIView):
    def get(self, request):
        try:
            activity_logs = Stat.objects.filter(user=request.user)
            serializer = StatSerializer(activity_logs, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def post(self, request):
        try:
            mutable_data = add_user(request.data.copy(), request.user.id)
            serializer = StatSerializer(data=mutable_data)
            return szr_val_save(serializer, status.HTTP_201_CREATED)
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def put(self, request, pk):
        try:
            activity_log = get_object_or_404(Stat, pk=pk, user=request.user)
            mutable_data = add_user(request.data.copy(), request.user.id)
            serializer = StatSerializer(activity_log, data=mutable_data)
            return szr_val_save(serializer)
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def delete(self, request, pk):
        try:
            activity_log = get_object_or_404(Stat, pk=pk, user=request.user)
            activity_log.delete()
            return Response(
                {"message": "Stat deleted successfully"},
                status=status.HTTP_204_NO_CONTENT,
            )
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
