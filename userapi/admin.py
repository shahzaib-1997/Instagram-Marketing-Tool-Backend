from django.contrib import admin
from .models import (
    ActivityLog,
    ActivityTime,
    Post,
    Reel,
    Hashtag,
    Stat,
    TargetUser,
    InstaCredential,
    Target,
    TargetType,
    Action
)

admin.site.register(ActivityLog)
admin.site.register(ActivityTime)
admin.site.register(Post)
admin.site.register(Reel)
admin.site.register(Hashtag)
admin.site.register(Stat)
admin.site.register(TargetUser)
admin.site.register(InstaCredential)
admin.site.register(TargetType)
admin.site.register(Target)
admin.site.register(Action)
