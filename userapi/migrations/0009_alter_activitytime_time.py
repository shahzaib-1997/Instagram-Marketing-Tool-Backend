# Generated by Django 5.0 on 2023-12-20 20:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userapi', '0008_alter_targettype_type_comment'),
    ]

    operations = [
        migrations.AlterField(
            model_name='activitytime',
            name='time',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]