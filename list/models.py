from django.db import models
from djmoney.models.fields import MoneyField

from turbo.mixins import BroadcastableMixin


class Store(BroadcastableMixin, models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.TextField()
    note = models.TextField(default=None, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    location = models.TextField(blank=True, null=True)

    def __str__(self):
       return self.name

class List(BroadcastableMixin, models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=255)

    def __str__(self):
       return self.name

# Sorting

class Item(BroadcastableMixin, models.Model):
    id = models.BigAutoField(primary_key=True)
    index = None # for sorting

    broadcasts_to = ["list", "all-lists"]
    broadcast_self = False

    list = models.ForeignKey(List, related_name="items", on_delete=models.CASCADE)
    text = models.TextField()
    note = models.TextField(default=None, blank=True, null=True)
    ean = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    current_count = models.IntegerField(default=None, blank=True, null=True)
    last_count = models.IntegerField(default=None, blank=True, null=True)
    buy = models.BooleanField(default=True)
    index = models.IntegerField(default=0)

    def __str__(self):
       return self.text
class Trip(models.Model):
    id = models.BigAutoField(primary_key=True)
    time = models.DateTimeField(auto_now_add=True)
    finish_time = models.DateTimeField(blank=True, null=True)
    store = models.ForeignKey(Store, related_name="trips", on_delete=models.CASCADE)
    list = models.ForeignKey(List, related_name="trips", on_delete=models.CASCADE)
    count = models.IntegerField(default=0)
    reciept = models.FileField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    total = MoneyField(max_digits=19, decimal_places=2, default_currency='EUR', blank=True, null=True)

    @property
    def label(self):
        return f'{self.store.name} - {self.time.strftime("%Y-%m-%d %H:%M")}'

    def __str__(self):
        return self.label

class Checkout(models.Model):
    id = models.BigAutoField(primary_key=True)
    time = models.DateTimeField(auto_now_add=True)
    trip = models.ForeignKey(Trip, related_name="checkouts", on_delete=models.CASCADE)
    item = models.ForeignKey(Item, related_name="checkouts", on_delete=models.CASCADE)
    count = models.IntegerField(default=0)

    class Meta:
        get_latest_by = ['-time']