from django.apps import AppConfig
from django.conf import settings
import os


class UserapiConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "userapi"

    def ready(self):
        # This prevents running the commands during Django's auto-reload
        if os.environ.get('RUN_MAIN') == 'true' or not settings.DEBUG:
            # Import here to avoid circular imports
            from .scheduler import start_scheduler
            print("start_scheduler")
            start_scheduler()