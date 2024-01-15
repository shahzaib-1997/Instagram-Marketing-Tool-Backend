# middleware.py

from django.utils import timezone
from django.contrib import messages
from django.contrib.auth import logout


class SessionTimeoutMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if hasattr(request, "user") and request.user.is_authenticated:
            last_activity = request.session.get("last_activity", None)
            request.session["last_activity"] = timezone.now().isoformat()
            if last_activity:
                last_activity = timezone.datetime.fromisoformat(last_activity)
                if (timezone.now() - last_activity).seconds > 14400:
                    request.session.pop("last_activity")
                    logout(request)
                    messages.error(request, "Session Timed Out.")

        response = self.get_response(request)
        return response
