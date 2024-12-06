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
from django.utils import timezone
from .dry import BaseAPIView, RenderAPIView, szr_val_save, add_user
from .bot.profileScrapper import profile_thread
from .bot.instaBot import create_profile, InstaBot, delete_gologin_profile
from .models import (
    UserData,
    ActivityTime,
    Credential,
    ActivityLog,
    Stat,
    Target,
)
from .serializers import (
    PasswordChangeSerializer,
    RegistrationSerializer,
    ProfileSerializer,
    ActivityTimeSerializer,
    CredentialSerializer,
    ActivityLogSerializer,
    StatSerializer,
    TargetSerializer,
)


class AllCredentials(APIView):
    def get(self, request):
        try:
            credentials = Credential.objects.all()
            szr = CredentialSerializer(credentials, many=True)
            return Response(szr.data)
        except Exception as e:
            print(e)
            return Response(e)

    def post(self, request):
        try:
            insta_account_id = request.data.get("insta_account")
            stat_type = request.data.get("type")
            count = request.data.get("count")

            if not all([insta_account_id, stat_type, count]):
                return Response(
                    {"error": "insta_account, type and count are required"}, status=400
                )

            # Get today's date
            today = timezone.now().date()

            # Use update_or_create
            stat, created = Stat.objects.update_or_create(
                insta_account_id=insta_account_id,
                type=stat_type,
                time_stamp__date=today,
                defaults={"count": count},
            )
            print(f"Found {count} {stat_type}.")
            print(f"created: {created}")

            return Response(
                {
                    "message": "Stat created" if created else "Stat updated",
                }
            )

        except Exception as e:
            return Response({"error": str(e)}, status=500)


class ActivityLogsView(APIView):
    def get(self, request, id=None):
        if not request.user.is_authenticated:
            messages.error(request, "You need to login first.")
            return redirect(f"/signin/?next={request.path}")
        try:
            insta_creds = Credential.objects.filter(user=request.user)
            if insta_creds:
                if id:
                    instance = get_object_or_404(Credential, id=id)
                else:
                    instance = insta_creds.first()
                activity_logs = ActivityLog.objects.filter(
                    user=request.user, insta_account=instance
                ).order_by("-time_stamp")
                context = {
                    "insta_creds": insta_creds,
                    "data": activity_logs,
                    "insta_username": instance.username,
                    "url": "activity-logs",
                }
                return render(request, "userapi/activity_log.html", context=context)
            messages.error(
                request,
                "Please add Instagram Accounts against your account to add Target.",
            )
            return redirect("userapi:accounts")
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def post(self, request):
        try:
            ActivityLog.objects.filter(user=request.user, read=False).update(read=True)
            return Response(
                {"message": "All Notifications mark as read."},
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


def user_targets(request, id=None):
    if not request.user.is_authenticated:
        messages.error(request, "You need to login first.")
        return redirect(f"/signin/?next={request.path}")
    try:
        insta_creds = Credential.objects.filter(user=request.user)
        context = {"url": "targets"}
        if insta_creds:
            context["insta_creds"] = insta_creds
            if id:
                instance = get_object_or_404(Credential, id=id)
            else:
                instance = insta_creds.first()
            context["insta_username"] = instance.username
            targets = Target.objects.filter(
                user=request.user, insta_user=instance
            ).order_by("-id")
            context["data"] = targets
            return render(request, "userapi/targets.html", context=context)
    except Exception as e:
        messages.error(request, str(e))
    return redirect("userapi:accounts")


def logout_user(request):
    if request.user.is_authenticated:
        Token.objects.get(user=request.user).delete()
        logout(request)
    return redirect("userapi:login")


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


class SignupView(APIView):
    def get(self, request):
        if request.user.is_authenticated:
            return redirect("userapi:accounts")
        email = request.GET.get("email", "")
        return render(request, "userapi/signup.html", {"email": email})

    def post(self, request):
        try:
            user_data = request.data.copy()
            user_data["first_name"], user_data["last_name"] = (
                user_data.pop("fullname")[0].split() + [""]
            )[:2]
            serializer = RegistrationSerializer(
                data=user_data, context={"request": request}
            )
            if serializer.is_valid():
                validated_data = serializer.validated_data
                user = User.objects.create_user(**validated_data)
                UserData.objects.create(user=user, country=request.data["country"])
                messages.success(request, "User registered successfully.")
                return redirect("userapi:login")
            else:
                for value in serializer.errors.values():
                    error = value[0].replace("/", "")
                    messages.error(request, f"{error}")
        except Exception as e:
            messages.error(request, str(e))
        return render(request, "userapi/signup.html")


class LoginView(APIView):
    def get(self, request):
        if request.user.is_authenticated:
            return redirect("userapi:accounts")
        return render(
            request, "userapi/login.html", {"next": request.GET.get("next", "")}
        )

    def post(self, request):
        try:
            value = request.POST.get("username")
            user = User.objects.filter(Q(username=value) | Q(email=value)).first()
            if user is None:
                messages.error(request, "Username or Email is incorrect!")
            else:
                username = user.username
                password = request.POST.get("password")
                user = authenticate(request, username=username, password=password)

                if user is not None:
                    login(request, user)
                    token, _ = Token.objects.get_or_create(user=request.user)
                    request.session["token"] = token.key
                    next_url = request.GET.get("next")
                    if next_url:
                        return redirect(f"{next_url}")
                    return redirect("userapi:accounts")
                messages.error(request, "Password is incorrect!")
        except Exception as e:
            messages.error(request, str(e))
        return render(request, "userapi/login.html")


class DashboardView(APIView):
    def get(self, request, id=None):
        if not request.user.is_authenticated:
            messages.error(request, "You need to login first.")
            return redirect(f"/signin/?next={request.path}")
        try:
            insta_creds = Credential.objects.filter(user=request.user)
            if insta_creds:
                context = {opt: [] for opt, _ in Stat.options} | {
                    f"{opt}_time": [] for opt, _ in Stat.options
                }
                if id:
                    instance = get_object_or_404(Credential, id=id)
                else:
                    instance = insta_creds.first()

                context["insta_creds"] = insta_creds
                context["url"] = "stats"
                context["insta_username"] = instance.username

                stats_filter = {"insta_account": instance.id}

                from_date, to_date = request.GET.get("from"), request.GET.get("to")
                if from_date and to_date:
                    stats_filter["time_stamp__date__range"] = (from_date, to_date)

                stats_data = Stat.objects.filter(**stats_filter)
                for stat in stats_data:
                    context[stat.type].append(stat.count)
                    context[f"{stat.type}_time"].append(f"{stat.time_stamp.date()}")
                print(context)
                return render(request, "Stats.html", context=context)
            messages.error(request, "Please add Instagram Accounts first.")
            return redirect("userapi:accounts")
        except Exception as e:
            print(e)
            messages.error(request, str(e))
            return render(
                request,
                "Stats.html",
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class TargetTemplateView(APIView):
    def get(self, request, pk=None):
        if not request.user.is_authenticated:
            messages.error(request, "You need to login first.")
            return redirect(f"/signin/?next={request.path}")

        try:
            insta_creds = Credential.objects.filter(user=request.user)
            if insta_creds:
                context = {"insta_creds": insta_creds}
                if pk:
                    target = get_object_or_404(Target, id=pk, user=request.user)
                    context["target"] = target

                    activity_times = list(
                        ActivityTime.objects.filter(target=target).values()
                    )
                    context["activity_times"] = activity_times

                    print(context)
                return render(request, "userapi/target.html", context=context)
            messages.error(
                request,
                "Please first add Instagram Accounts to add Target.",
            )
            return redirect("userapi:accounts")
        except Exception as e:
            print(e)
        return redirect("userapi:targets")

    def post(self, request, pk=None):
        if not request.user.is_authenticated:
            messages.error(request, "You need to login first.")
            return redirect(f"/signin/?next={request.path}")
        # try:
        target_type = request.POST.get("type")
        if pk:
            target = get_object_or_404(Target, id=pk)
        else:
            target = Target.objects.create(
                user=request.user,
                target_type=target_type,
                user_comment=request.POST.get("comment"),
            )

        insta_cred = request.POST.get("selected_insta_cred")
        credential = get_object_or_404(Credential, id=insta_cred)
        target.insta_user = credential

        urls = request.POST.get("target-list")
        target.url = urls

        view_story = request.POST.get("view-stories")
        target.view_story = True if view_story else False

        like_story = request.POST.get("like-stories")

        if view_story and like_story:
            target.like_story = True
            target.like_option = request.POST.get("like-stories-type")
        else:
            target.like_story = False
            target.like_option = None
        target.save()

        # Loop through your checkbox names and check if they are in the POST data
        ActivityTime.objects.filter(target=target).delete()
        for key in request.POST.keys():
            if key.startswith("day_"):
                spl = key.split("_")
                day = spl[1]
                time = spl[2]
                activity_time, _ = ActivityTime.objects.get_or_create(
                    target=target, day=day
                )
                if not activity_time.time:
                    activity_time.time = (
                        time  # Initialize time as a list if it's not already
                    )
                else:
                    activity_time.time += (
                        f",{time}"  # Add the new time value to the list
                    )

                activity_time.save()

        return redirect(f"/targets/{credential.id}")
        # except Exception as e:
        #     print(str(e))
        #     return redirect("userapi:target-edit", pk=target.id)


class InstaCredentialView(APIView):
    def get(self, request):
        if request.user.is_authenticated:
            insta_creds = Credential.objects.filter(user=request.user)
            if insta_creds:
                for insta_cred in insta_creds:
                    # Get latest posts count
                    latest_posts = (
                        insta_cred.stats.filter(type="posts")
                        .order_by("-time_stamp")
                        .first()
                    )

                    # Get latest followers count
                    latest_followers = (
                        insta_cred.stats.filter(type="followers")
                        .order_by("-time_stamp")
                        .first()
                    )

                    # Get latest following count
                    latest_following = (
                        insta_cred.stats.filter(type="following")
                        .order_by("-time_stamp")
                        .first()
                    )

                    # Add these values to the insta_cred object
                    insta_cred.posts = latest_posts.count if latest_posts else 0
                    insta_cred.followers = (
                        latest_followers.count if latest_followers else 0
                    )
                    insta_cred.following = (
                        latest_following.count if latest_following else 0
                    )
                print(insta_creds.values())
                return render(
                    request, "Saved Accounts.html", {"insta_creds": insta_creds}
                )
            return render(request, "Accounts.html")
        messages.error(request, "You need to login first.")
        return redirect(f"/signin/?next={request.path}")

    def post(self, request):
        if not request.user.is_authenticated:
            messages.error(request, "You need to login first.")
            return redirect(f"/signin/?next={request.path}")
        try:
            pk = request.POST.get("previous_username")
            username = request.POST.get("username")
            password = request.POST.get("password")
            if pk is None:
                profile_id = create_profile(f"{username} - {request.user}")
                if isinstance(profile_id, str):
                    user_bot = InstaBot(profile_id)
                    user_bot.start_browser()
                    insta_user = None
                    if user_bot.driver:
                        insta_user = user_bot.login(username, password)
                        if insta_user is None:
                            print("Provided credentials are incorrect!")
                            user_bot.stop_browser()
                            delete_gologin_profile(profile_id)
                        else:
                            credential = Credential(
                                user=request.user,
                                username=insta_user,
                                password=password,
                                profile_id=profile_id,
                            )
                            credential.save()
                            szr = CredentialSerializer(credential).data
                            profile_thread(szr, user_bot)
                    else:
                        print("Unable to start browser. No driver.")
                else:
                    print(f"Unable to create profile. Got: {profile_id}")
            else:
                Credential.objects.filter(user=request.user, username=pk).update(
                    username=username, password=password
                )
                print("Details updated successfully!")
            insta_creds = Credential.objects.filter(user=request.user)
            if insta_creds:
                return render(
                    request, "Saved Accounts.html", {"insta_creds": insta_creds}
                )
            return render(request, "Accounts.html")
        except Exception as e:
            if "UNIQUE" in str(e):
                print("Username already exists against your account!")
            else:
                print(str(e))
            return redirect("userapi:accounts")

    def delete(self, request, pk):
        if not request.user.is_authenticated:
            return Response(
                "You need to login first.", status=status.HTTP_401_UNAUTHORIZED
            )
        try:
            credential = get_object_or_404(Credential, username=pk, user=request.user)
            delete_gologin_profile(credential.profile_id)
            credential.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            print(str(e))
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ProfileView(APIView):
    def get(self, request):
        if not request.user.is_authenticated:
            messages.error(request, "You need to login first.")
            return redirect(f"/signin/?next={request.path}")
        try:
            serializer = ProfileSerializer(request.user)
            if request.path == "/profile/":
                return render(
                    request, "userapi/profile.html", {"data": serializer.data}
                )
            else:
                return render(
                    request,
                    "userapi/update_profile.html",
                    {"data": serializer.data},
                )
        except Exception as e:
            messages.error(request, str(e))
            return redirect("userapi:accounts")

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
        return render(request, "userapi/forgot-password.html")

    def post(self, request):
        value = request.POST.get("username")
        user = User.objects.filter(Q(username=value) | Q(email=value)).first()
        if user is not None:
            request.session["user"] = user.id
            return redirect("userapi:change-password")
        messages.error(request, "Username or Email is incorrect.")
        return render(request, "userapi/forgot-password.html")


class PasswordChangeView(APIView):
    def get(self, request):
        if request.session.get("user"):
            return render(request, "userapi/password_change.html")
        messages.error(request, "Please Enter Username or Email first!")
        return redirect("userapi:forgot-password")

    def post(self, request):
        try:
            serializer = PasswordChangeSerializer(data=request.POST)
            if serializer.is_valid():
                password = request.POST["new_password"]
                id = request.session["user"]
                user = get_object_or_404(User, pk=id)
                if not authenticate(username=user.username, password=password):
                    request.session.pop("user", None)
                    user.set_password(password)
                    user.save()
                    update_session_auth_hash(request, user)

                    messages.success(request, "Password changed successfully.")
                    return redirect(f"/signin/?next={request.path}")
                messages.error(request, "New Password is same as current password!")
            else:
                for value in serializer.errors.values():
                    error = value[0].replace("/", "")
                    messages.error(request, f"{error}")
        except Exception as e:
            messages.error(request, str(e))
        return render(request, "userapi/password_change.html")


class ActivityTimeView(BaseAPIView, RenderAPIView):
    def get(self, request):
        try:
            target_id = request.GET.get("target_id")
            activity_times = ActivityTime.objects.filter(target_id=target_id)
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
                {"message": "Instagram Account deleted successfully."},
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


class TargetView(BaseAPIView, RenderAPIView):
    def get(self, request):
        try:
            targets = Target.objects.filter(user=request.user, status=0)
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
            messages.success(request, "Target deleted successfully.")
            return Response(
                status=status.HTTP_204_NO_CONTENT,
            )
        except Exception as e:
            return Response(
                {"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class TargetUpdateView(APIView):
    def get(self, request):
        try:
            count = Target.objects.filter(status=2).update(status=0)
            return Response(count)
        except Exception as e:
            print(e)
            return Response(e)
