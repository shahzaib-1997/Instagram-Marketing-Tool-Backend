from django.apps import AppConfig
from .bot import fetch_users
import threading

class UserapiConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "userapi"

    def ready(self):
        # Your startup code here
        print("Startup code executed")        
        # while True:
        #     fetch_users.fetch_users()
        self.start_process()

    def main(self):
        fetch_users.fetch_users()

    def start_process(self):
        s=threading.Thread(target=self.main)
        s.start()
