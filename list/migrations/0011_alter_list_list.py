# Generated by Django 3.2.3 on 2021-10-23 19:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('list', '0010_auto_20211023_0957'),
    ]

    operations = [
        migrations.AlterField(
            model_name='list',
            name='list',
            field=models.ManyToManyField(related_name='stores', to='list.Store'),
        ),
    ]
