# Generated by Django 5.0 on 2024-01-25 16:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userapi', '0018_activitylog_read'),
    ]

    operations = [
        migrations.RenameField(
            model_name='stat',
            old_name='followers',
            new_name='count',
        ),
        migrations.RemoveField(
            model_name='stat',
            name='engagement_rate',
        ),
        migrations.RemoveField(
            model_name='stat',
            name='read',
        ),
        migrations.AddField(
            model_name='stat',
            name='type',
            field=models.CharField(blank=True, choices=[('like', 'like'), ('comment', 'comment'), ('followers', 'followers'), ('engagement_rate', 'engagement_rate')], max_length=255, null=True),
        ),
    ]
