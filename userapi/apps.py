from django.apps import AppConfig
import threading

class UserapiConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "userapi"

    # def ready(self):
    #     # Your startup code here
    #     print("Startup code executed")        
    #     # while True:
    #     #     fetch_users.fetch_users()
    #     s=threading.Thread(target = fetch_users.fetch_users)
    #     s.start()


