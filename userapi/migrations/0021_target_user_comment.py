# Generated by Django 5.0 on 2024-02-01 16:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userapi', '0020_stat_insta_account'),
    ]

    operations = [
        migrations.AddField(
            model_name='target',
            name='user_comment',
            field=models.TextField(default=''),
        ),
    ]
