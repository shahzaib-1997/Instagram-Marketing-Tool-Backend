# Generated by Django 5.0 on 2024-01-08 21:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userapi', '0013_alter_credential_unique_together'),
    ]

    operations = [
        migrations.AddField(
            model_name='hashtag',
            name='type',
            field=models.CharField(blank=True, choices=[('like', 'like'), ('comment', 'comment')], max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='post',
            name='type',
            field=models.CharField(blank=True, choices=[('like', 'like'), ('comment', 'comment')], max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='reel',
            name='type',
            field=models.CharField(blank=True, choices=[('like', 'like'), ('comment', 'comment'), ('view', 'view')], max_length=255, null=True),
        ),
    ]
