# Generated by Django 3.2.3 on 2021-10-23 09:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('list', '0009_auto_20211023_0949'),
    ]

    operations = [
        migrations.AlterField(
            model_name='checkout',
            name='id',
            field=models.BigAutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='item',
            name='id',
            field=models.BigAutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='list',
            name='id',
            field=models.BigAutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='store',
            name='id',
            field=models.BigAutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='trip',
            name='id',
            field=models.BigAutoField(primary_key=True, serialize=False),
        ),
    ]
