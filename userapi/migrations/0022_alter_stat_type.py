# Generated by Django 5.0 on 2024-02-05 17:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userapi', '0021_target_user_comment'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stat',
            name='type',
            field=models.CharField(blank=True, choices=[('like', 'like'), ('comment', 'comment'), ('posts', 'posts'), ('followers', 'followers'), ('following', 'following'), ('engagement_rate', 'engagement_rate')], max_length=255, null=True),
        ),
    ]
