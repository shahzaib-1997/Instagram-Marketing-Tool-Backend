# Generated by Django 5.0 on 2024-09-19 22:00

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userapi', '0025_activitylog_insta_account'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='activitytime',
            name='user',
        ),
        migrations.RemoveField(
            model_name='target',
            name='activity_time',
        ),
        migrations.AddField(
            model_name='activitytime',
            name='day',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='activitytime',
            name='target',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='activity_time', to='userapi.target'),
        ),
        migrations.AlterField(
            model_name='activitytime',
            name='time',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
