from django.contrib import admin
from .models import (
    ActivityLog,
    ActivityTime,
    Stat,
    Credential,
    Target,
    UserData,
)

admin.site.register(ActivityLog)
admin.site.register(ActivityTime)
admin.site.register(Stat)
admin.site.register(Credential)
admin.site.register(Target)
admin.site.register(UserData)
