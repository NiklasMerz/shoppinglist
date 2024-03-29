# Generated by Django 3.2.3 on 2021-11-13 23:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('list', '0016_auto_20211105_1709'),
    ]

    operations = [
        migrations.AlterField(
            model_name='trip',
            name='list',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='trips', to='list.list'),
        ),
        migrations.AlterField(
            model_name='trip',
            name='store',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='trips', to='list.store'),
        ),
    ]
