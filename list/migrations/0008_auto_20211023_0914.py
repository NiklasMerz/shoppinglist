# Generated by Django 3.2.3 on 2021-10-23 09:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('list', '0007_alter_item_buy'),
    ]

    operations = [
        migrations.CreateModel(
            name='Store',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField()),
                ('note', models.TextField(blank=True, default=None, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('location', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Trip',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('count', models.IntegerField(default=0)),
                ('list', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='trips', to='list.list')),
                ('store', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='trips', to='list.store')),
            ],
        ),
        migrations.CreateModel(
            name='Checkout',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', models.DateTimeField(auto_now_add=True)),
                ('count', models.IntegerField(default=0)),
                ('item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='checkouts', to='list.item')),
                ('trip', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='checkouts', to='list.trip')),
            ],
        ),
        migrations.AddField(
            model_name='list',
            name='list',
            field=models.ManyToManyField(blank=True, null=True, related_name='stores', to='list.Store'),
        ),
    ]
