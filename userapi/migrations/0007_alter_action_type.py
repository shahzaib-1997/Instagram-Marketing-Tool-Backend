# Generated by Django 5.0 on 2023-12-15 20:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userapi', '0006_rename_instacredential_credential'),
    ]

    operations = [
        migrations.AlterField(
            model_name='action',
            name='type',
            field=models.CharField(choices=[('like', 'like'), ('view', 'view')], max_length=255),
        ),
    ]
