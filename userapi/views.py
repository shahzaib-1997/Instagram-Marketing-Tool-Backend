import json
from rest_framework import status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from django.db.models import Q
from django.shortcuts import get_object_or_404, render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout, update_session_auth_hash
from django.contrib import messages
from .dry import BaseAPIView, RenderAPIView, szr_val_save, add_user
from .models import (
    ActivityTime,
    Credential,
    Hashtag,
    TargetUser,
    Post,
    Reel,
    ActivityLog,
    Stat,
    Target,
    TargetType,
    Action,
)
from .serializers import (
    PasswordChangeSerializer,
    RegistrationSerializer,
    ProfileSerializer,
    ActivityTimeSerializer,
    CredentialSerializer,
    HashtagSerializer,
    TargetUserSerializer,
    PostSerializer,
    ReelSerializer,
    ActivityLogSerializer,
    StatSerializer,
    TargetTypeSerializer,
    TargetSerializer,
    ActionSerializer,
)


def home(request):
    return render(request, "userapi/index.html")


class GetAllUsers(APIView):
    def get(self, request):
        user_ids = User.objects.values_list("id", flat=True)
        return Response(user_ids)


class CreateToken(APIView):
    def post(self, request):
        user_id = int(request.data.get("user_id"))
        user = get_object_or_404(User, pk=user_id)
        token, _ = Token.objects.get_or_create(user=user)
        return Response({"Authorization": f"Token {token.key}"})


class DashboardView(APIView):
    def get(self, request):
        if request.user.is_authenticated:
            token, _ = Token.objects.get_or_create(user=request.user)
            request.session["token"] = token.key
            return render(request, "userapi/dashboard.html")
        messages.error(request, "You need to login first.")
        return redirect("userapi:login")


class SignupView(APIView):
    def get(self, request):
        if not request.user.is_authenticated:
            return render(request, "userapi/signup.html")
        return redirect("userapi:dashboard")

    def post(self, request):
        try:
            serializer = RegistrationSerializer(
                data=request.POST, context={"request": request}
            )
            if serializer.is_valid():
                validated_data = serializer.validated_data
                User.objects.create_user(**validated_data)
                messages.success(request, "User registered successfully.")
                return redirect("userapi:login")
            else:
                for value in serializer.errors.values():
                    error = value[0].replace('/', '')
                    messages.error(request, f"{error}")
        except Exception as e:
            messages.error(request, str(e))
        return render(request, "userapi/signup.html")


class LoginView(APIView):
    def get(self, request):
        if request.user.is_authenticated:
            return redirect("userapi:dashboard")
        return render(request, "userapi/login.html")

    def post(self, request):
        try:
            value = request.POST.get("username")
            password = request.POST.get("password")
            user = User.objects.filter(Q(username=value) | Q(email=value)).first()
            if user is None:
                messages.error(request, "Username or Email is incorrect!")
            else:
                username = user.username
                user = authenticate(request, username=username, password=password)

                if user is not None:
                    login(request, user)
                    return redirect("userapi:dashboard")
                messages.error(request, "Password is incorrect!")
        except Exception as e:
            messages.error(request, str(e))
        return render(request, "userapi/login.html")


def pricing(request):
    return render(request, "userapi/pricing.html")


def about(request):
    return render(request, "userapi/about.html")


def contact(request):
    return render(request, "userapi/contact.html")


def logout_user(request):
    if request.user.is_authenticated:
        token = Token.objects.get(user=request.user)
        token.delete()
        logout(request)
    return redirect("userapi:login")


class ProfileView(APIView):
    def get(self, request):
        try:
            if request.user.is_authenticated:
                serializer = ProfileSerializer(request.user)
                return render(
                    request, "userapi/profile.html", {"data": serializer.data}
                )
            else:
                messages.error(request, "You need to login first.")
                return redirect("userapi:login")
        except Exception as e:
            messages.error(request, str(e))
            return redirect("userapi:dashboard")

    def post(self, request):
        try:
            serializer = ProfileSerializer(request.user, data=request.POST)
            check = szr_val_save(serializer)
            if check:
                messages.success(request, "Profile Updated Successfully.")
            else:
                for error in serializer.errors.values():
                    messages.error(request, json.dumps(error)[2:-2])
        except Exception as e:
            messages.error(request, str(e))
        return redirect("userapi:profile")

    def delete(self, request):
        try:
            user = request.user
            user.delete()
            messages.success(request, "User deleted successfully.")
            return redirect("userapi:signup")
        except Exception as e:
            messages.error(request, str(e))
        return redirect("userapi:profile")


class PasswordChangeUsernameView(APIView):
    def get(self, request):
        return render(request, "userapi/password_change_username.html")

    def post(self, request):
        value = request.POST.get("username")
        user = User.objects.filter(Q(username=value) | Q(email=value)).first()
        if user is not None:
            request.session["user"] = user.id
            return redirect("userapi:password-change")
        messages.error(request, "Username or Email is incorrect.")
        return render(request, "userapi/password_change_username.html")


class PasswordChangeView(APIView):
    def get(self, request):
        if request.session.get("user"):
            return render(request, "userapi/password_change.html")
        return redirect("userapi:password-change-user")

    def post(self, request):
        try:
            serializer = PasswordChangeSerializer(data=request.POST)
            if serializer.is_valid():
                password = request.POST["new_password"]
                id = request.session["user"]
                user = get_object_or_404(User, pk=id)
                if authenticate(username=user.username, password=password):
                    messages.error(request, "New Password is same as current password!")
                request.session.pop("user", None)
                user.set_password(password)
                user.save()
                update_session_auth_hash(request, user)

                messages.success(request, "Password changed successfully.")
                return redirect("userapi:login")
            else:
                for value in serializer.errors.values():
                    error = value[0].replace('/', '')
                    messages.error(request, f"{error}")
        except Exception as e:
            messages.error(request, str(e))
        return render(request, "userapi/password_change.html")


class ActivityTimeView(BaseAPIView, RenderAPIView):
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
            if szr_val_save(serializer):
                return Response(serializer.data)
            return Response(serializer.errors)
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def put(self, request, pk):
        try:
            activity_time = get_object_or_404(ActivityTime, pk=pk, user=request.user)
            mutable_data = add_user(request.data.copy(), request.user.id)
            serializer = ActivityTimeSerializer(activity_time, data=mutable_data)
            if szr_val_save(serializer):
                return Response(serializer.data)
            return Response(serializer.errors)
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def delete(self, request, pk):
        try:
            activity_time = get_object_or_404(ActivityTime, pk=pk, user=request.user)
            activity_time.delete()
            return Response(
                {"message": "ActivityTime deleted successfully."},
                status=status.HTTP_204_NO_CONTENT,
            )
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class CredentialView(BaseAPIView, RenderAPIView):
    def get(self, request):
        try:
            credentials = Credential.objects.filter(user=request.user)
            serializer = CredentialSerializer(credentials, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def post(self, request):
        try:
            mutable_data = add_user(request.data.copy(), request.user.id)
            serializer = CredentialSerializer(data=mutable_data)
            if szr_val_save(serializer):
                return Response(serializer.data)
            return Response(serializer.errors)
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def put(self, request, pk):
        try:
            credential = get_object_or_404(Credential, pk=pk, user=request.user)
            mutable_data = add_user(request.data.copy(), request.user.id)
            serializer = CredentialSerializer(credential, data=mutable_data)
            if szr_val_save(serializer):
                return Response(serializer.data)
            return Response(serializer.errors)
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def delete(self, request, pk):
        try:
            credential = get_object_or_404(Credential, pk=pk, user=request.user)
            credential.delete()
            return Response(
                {"message": "Insta Credential deleted successfully."},
                status=status.HTTP_204_NO_CONTENT,
            )
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class HashtagView(BaseAPIView, RenderAPIView):
    def get(self, request):
        try:
            target_id = request.GET.get("target_id")

            if target_id:
                hashtags = Hashtag.objects.filter(target_id=target_id)
            else:
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
            if szr_val_save(serializer):
                return Response(serializer.data)
            return Response(serializer.errors)
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def put(self, request, pk):
        try:
            hashtag = get_object_or_404(Hashtag, pk=pk, user=request.user)
            mutable_data = add_user(request.data.copy(), request.user.id)
            serializer = HashtagSerializer(hashtag, data=mutable_data)
            if szr_val_save(serializer):
                return Response(serializer.data)
            return Response(serializer.errors)
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def delete(self, request, pk):
        try:
            hashtag = get_object_or_404(Hashtag, pk=pk, user=request.user)
            hashtag.delete()
            return Response(
                {"message": "Hashtag deleted successfully."},
                status=status.HTTP_204_NO_CONTENT,
            )
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class TargetUserView(BaseAPIView, RenderAPIView):
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
            if szr_val_save(serializer):
                return Response(serializer.data)
            return Response(serializer.errors)
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def put(self, request, pk):
        try:
            target_user = get_object_or_404(TargetUser, pk=pk, user=request.user)
            mutable_data = add_user(request.data.copy(), request.user.id)
            serializer = TargetUserSerializer(target_user, data=mutable_data)
            if szr_val_save(serializer):
                return Response(serializer.data)
            return Response(serializer.errors)
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def delete(self, request, pk):
        try:
            target_user = get_object_or_404(TargetUser, pk=pk, user=request.user)
            target_user.delete()
            return Response(
                {"message": "Target User deleted successfully."},
                status=status.HTTP_204_NO_CONTENT,
            )
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class PostView(BaseAPIView, RenderAPIView):
    def get(self, request):
        try:
            target_id = request.GET.get("target_id")

            if target_id:
                posts = Post.objects.filter(target=target_id)
            else:
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
            if szr_val_save(serializer):
                return Response(serializer.data)
            return Response(serializer.errors)
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def put(self, request, pk):
        try:
            post = get_object_or_404(Post, pk=pk, user=request.user)
            mutable_data = add_user(request.data.copy(), request.user.id)
            serializer = PostSerializer(post, data=mutable_data)
            if szr_val_save(serializer):
                return Response(serializer.data)
            return Response(serializer.errors)
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def delete(self, request, pk):
        try:
            post = get_object_or_404(Post, pk=pk, user=request.user)
            post.delete()
            return Response(
                {"message": "Post deleted successfully."},
                status=status.HTTP_204_NO_CONTENT,
            )
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class ReelView(BaseAPIView, RenderAPIView):
    def get(self, request):
        try:
            target_id = request.GET.get("target_id")

            if target_id:
                reels = Reel.objects.filter(target=target_id)
            else:
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
            if szr_val_save(serializer):
                return Response(serializer.data)
            return Response(serializer.errors)
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def put(self, request, pk):
        try:
            reel = get_object_or_404(Reel, pk=pk, user=request.user)
            mutable_data = add_user(request.data.copy(), request.user.id)
            serializer = ReelSerializer(reel, data=mutable_data)
            if szr_val_save(serializer):
                return Response(serializer.data)
            return Response(serializer.errors)
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def delete(self, request, pk):
        try:
            reel = get_object_or_404(Reel, pk=pk, user=request.user)
            reel.delete()
            return Response(
                {"message": "Reel deleted successfully."},
                status=status.HTTP_204_NO_CONTENT,
            )
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class ActivityLogView(BaseAPIView, RenderAPIView):
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
            if szr_val_save(serializer):
                return Response(serializer.data)
            return Response(serializer.errors)
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def put(self, request, pk):
        try:
            activity_log = get_object_or_404(ActivityLog, pk=pk, user=request.user)
            mutable_data = add_user(request.data.copy(), request.user.id)
            serializer = ActivityLogSerializer(activity_log, data=mutable_data)
            if szr_val_save(serializer):
                return Response(serializer.data)
            return Response(serializer.errors)
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def delete(self, request, pk):
        try:
            activity_log = get_object_or_404(ActivityLog, pk=pk, user=request.user)
            activity_log.delete()
            return Response(
                {"message": "Activity Log deleted successfully."},
                status=status.HTTP_204_NO_CONTENT,
            )
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class StatView(BaseAPIView, RenderAPIView):
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
            if szr_val_save(serializer):
                return Response(serializer.data)
            return Response(serializer.errors)
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def put(self, request, pk):
        try:
            activity_log = get_object_or_404(Stat, pk=pk, user=request.user)
            mutable_data = add_user(request.data.copy(), request.user.id)
            serializer = StatSerializer(activity_log, data=mutable_data)
            if szr_val_save(serializer):
                return Response(serializer.data)
            return Response(serializer.errors)
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def delete(self, request, pk):
        try:
            activity_log = get_object_or_404(Stat, pk=pk, user=request.user)
            activity_log.delete()
            return Response(
                {"message": "Stat deleted successfully."},
                status=status.HTTP_204_NO_CONTENT,
            )
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class TargetTypeView(BaseAPIView, RenderAPIView):
    def get(self, request):
        try:
            target_types = TargetType.objects.filter(user=request.user)
            serializer = TargetTypeSerializer(target_types, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def post(self, request):
        try:
            mutable_data = add_user(request.data.copy(), request.user.id)
            serializer = TargetTypeSerializer(data=mutable_data)
            if szr_val_save(serializer):
                return Response(serializer.data)
            return Response(serializer.errors)
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def put(self, request, pk):
        try:
            target_type = get_object_or_404(TargetType, pk=pk, user=request.user)
            mutable_data = add_user(request.data.copy(), request.user.id)
            serializer = TargetTypeSerializer(target_type, data=mutable_data)
            if szr_val_save(serializer):
                return Response(serializer.data)
            return Response(serializer.errors)
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def delete(self, request, pk):
        try:
            target_type = get_object_or_404(TargetType, pk=pk, user=request.user)
            target_type.delete()
            return Response(
                {"message": "TargetType deleted successfully."},
                status=status.HTTP_204_NO_CONTENT,
            )
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class TargetView(BaseAPIView, RenderAPIView):
    def get(self, request):
        try:
            targets = Target.objects.filter(user=request.user)
            serializer = TargetSerializer(targets, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def post(self, request):
        try:
            mutable_data = add_user(request.data.copy(), request.user.id)
            serializer = TargetSerializer(data=mutable_data)
            if szr_val_save(serializer):
                return Response(serializer.data)
            return Response(serializer.errors)
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def put(self, request, pk):
        try:
            target = get_object_or_404(Target, pk=pk, user=request.user)
            mutable_data = add_user(request.data.copy(), request.user.id)
            serializer = TargetSerializer(target, data=mutable_data)
            if szr_val_save(serializer):
                return Response(serializer.data)
            return Response(serializer.errors)
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def delete(self, request, pk):
        try:
            target = get_object_or_404(Target, pk=pk, user=request.user)
            target.delete()
            return Response(
                {"message": "Target deleted successfully."},
                status=status.HTTP_204_NO_CONTENT,
            )
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class ActionView(BaseAPIView, RenderAPIView):
    def get(self, request):
        try:
            actions = Action.objects.filter(user=request.user)
            serializer = ActionSerializer(actions, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def post(self, request):
        try:
            mutable_data = add_user(request.data.copy(), request.user.id)
            serializer = ActionSerializer(data=mutable_data)
            if szr_val_save(serializer):
                return Response(serializer.data)
            return Response(serializer.errors)
            return Response(serializer.errors)
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def put(self, request, pk):
        try:
            action = get_object_or_404(Action, pk=pk, user=request.user)
            mutable_data = add_user(request.data.copy(), request.user.id)
            serializer = ActionSerializer(action, data=mutable_data)
            if szr_val_save(serializer):
                return Response(serializer.data)
            return Response(serializer.errors)
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def delete(self, request, pk):
        try:
            action = get_object_or_404(Action, pk=pk, user=request.user)
            action.delete()
            return Response(
                {"message": "Action deleted successfully."},
                status=status.HTTP_204_NO_CONTENT,
            )
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
