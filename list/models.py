from django.db import models
from django.urls import reverse

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
    list = models.ManyToManyField(Store, related_name="stores", null=True, blank=True)

    def __str__(self):
       return self.name

class Item(BroadcastableMixin, models.Model):
    id = models.BigAutoField(primary_key=True)
    broadcasts_to = ["list", "all-lists"]
    broadcast_self = False

    list = models.ForeignKey(List, related_name="items", on_delete=models.CASCADE)
    text = models.TextField()
    note = models.TextField(default=None, blank=True, null=True)
    ean = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    current_count = models.IntegerField(default=None, blank=True, null=True)
    last_count = models.IntegerField(default=None, blank=True, null=True)
    buy = models.BooleanField(default=True)

    def __str__(self):
       return self.text
class Trip(models.Model):
    id = models.BigAutoField(primary_key=True)
    time = models.DateTimeField(auto_now_add=True)
    store = models.ForeignKey(Store, related_name="trips", on_delete=models.CASCADE)
    list = models.ForeignKey(List, related_name="trips", on_delete=models.CASCADE)
    count = models.IntegerField(default=0)

    def __str__(self):
        return self.time.strftime("%Y-%m-%d %H:%M")

class Checkout(models.Model):
    id = models.BigAutoField(primary_key=True)
    time = models.DateTimeField(auto_now_add=True)
    trip = models.ForeignKey(Trip, related_name="checkouts", on_delete=models.CASCADE)
    item = models.ForeignKey(Item, related_name="checkouts", on_delete=models.CASCADE)
    count = models.IntegerField(default=0)