# Generated by Django 3.2.3 on 2021-05-22 21:14

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('list', '0002_item_note'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='current_count',
            field=models.IntegerField(blank=True, default=None, null=True),
        ),
        migrations.AddField(
            model_name='item',
            name='ean',
            field=models.TextField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='item',
            name='last_bought',
            field=models.DateTimeField(blank=True, default=None, null=True),
        ),
        migrations.AddField(
            model_name='item',
            name='standard_count',
            field=models.IntegerField(blank=True, default=None, null=True),
        ),
    ]
