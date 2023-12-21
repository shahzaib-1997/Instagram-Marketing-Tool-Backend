from django.apps import AppConfig
class UserapiConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "userapi"

    def ready(self):
        # Your startup code here
        print("Startup code executed")        
