from django.contrib import admin
from .models import (
    ActivityLog,
    ActivityTime,
    Post,
    Reel,
    Hashtag,
    Stat,
    TargetUser,
    InstaCredential
)

admin.site.register(ActivityLog)
admin.site.register(ActivityTime)
admin.site.register(Post)
admin.site.register(Reel)
admin.site.register(Hashtag)
admin.site.register(Stat)
admin.site.register(TargetUser)
admin.site.register(InstaCredential)
