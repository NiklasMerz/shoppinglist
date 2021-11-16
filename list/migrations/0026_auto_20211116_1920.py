# Generated by Django 3.2.3 on 2021-11-16 19:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('list', '0025_remove_lineitem_time'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='lineitem',
            name='item',
        ),
        migrations.CreateModel(
            name='BrandItem',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('description', models.CharField(max_length=255)),
                ('item', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='brand_items', to='list.item')),
            ],
        ),
        migrations.AddField(
            model_name='lineitem',
            name='brand_item',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='line_items', to='list.branditem'),
        ),
    ]
