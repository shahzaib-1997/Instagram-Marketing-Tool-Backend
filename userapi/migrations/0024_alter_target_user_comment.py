# Generated by Django 5.0 on 2024-02-26 20:42

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("userapi", "0023_userdata"),
    ]

    operations = [
        migrations.AlterField(
            model_name="target",
            name="user_comment",
            field=models.TextField(blank=True, default="", null=True),
        ),
    ]
