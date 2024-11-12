"""
URL configuration for instagram_marketing project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("userapi.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


from apscheduler.schedulers.background import BackgroundScheduler
from userapi.bot.fetch_users import thread_func, daily_update_target
from userapi.bot.profileScrapper import get_profile_data
import atexit

# Initialize the scheduler
scheduler = BackgroundScheduler()
scheduler.add_job(thread_func, "interval", hours=1)

# Schedule the second function to run every day at midnight
scheduler.add_job(daily_update_target, "interval", hours=1)

# Schedule the second function to run once a day at a specific time
# For example, let's say you want it to run every day at 5 AM
scheduler.add_job(get_profile_data, "cron", hour=5)

# Start the scheduler
scheduler.start()

# Register a function to be called on program exit
atexit.register(lambda: scheduler.shutdown())
