# Generated by Django 3.2.3 on 2021-11-14 18:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('list', '0022_auto_20211114_1834'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='lineitem',
            name='tax',
        ),
        migrations.RemoveField(
            model_name='lineitem',
            name='tax_currency',
        ),
    ]
