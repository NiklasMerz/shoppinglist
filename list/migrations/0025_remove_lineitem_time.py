# Generated by Django 3.2.3 on 2021-11-15 20:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('list', '0024_auto_20211115_1904'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='lineitem',
            name='time',
        ),
    ]
