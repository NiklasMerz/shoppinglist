# Generated by Django 3.2.3 on 2021-11-14 12:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('list', '0018_auto_20211114_1135'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='list',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='items', to='list.list'),
        ),
        migrations.AlterField(
            model_name='item',
            name='text',
            field=models.CharField(max_length=255),
        ),
    ]
