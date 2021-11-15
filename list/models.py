from django.db import models
from djmoney.models.fields import MoneyField

class Store(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.TextField()
    note = models.TextField(default=None, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    location = models.TextField(blank=True, null=True)
    address = models.TextField(blank=True, null=True)

    def __str__(self):
       return self.name

class List(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=255)

    def __str__(self):
       return self.name

# Sorting

class Item(models.Model):
    id = models.BigAutoField(primary_key=True)
    index = None # for sorting

    broadcasts_to = ["list", "all-lists"]
    broadcast_self = False

    list = models.ForeignKey(List, related_name="items", on_delete=models.SET_NULL, blank=True, null=True)
    description = models.CharField(max_length=255)
    note = models.TextField(default=None, blank=True, null=True)
    ean = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    current_count = models.IntegerField(default=None, blank=True, null=True)
    last_count = models.IntegerField(default=None, blank=True, null=True)
    buy = models.BooleanField(default=True)
    index = models.IntegerField(default=0)

    def __str__(self):
       return self.description
class Trip(models.Model):
    id = models.BigAutoField(primary_key=True)
    time = models.DateTimeField(auto_now_add=True)
    finish_time = models.DateTimeField(blank=True, null=True)
    store = models.ForeignKey(Store, related_name="trips", on_delete=models.CASCADE, null=True, blank=True)
    list = models.ForeignKey(List, related_name="trips", on_delete=models.CASCADE, null=True, blank=True)
    count = models.IntegerField(default=0)
    notes = models.TextField(blank=True, null=True)

    @property
    def label(self):
        return f'{self.store.name if self.store else self.notes} - {self.time.strftime("%Y-%m-%d %H:%M")}'

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

class Receipt(models.Model):
    id = models.BigAutoField(primary_key=True)
    time = models.DateTimeField(auto_now_add=True)
    trip = models.ForeignKey(Trip, related_name="receipts", on_delete=models.CASCADE, null=True, blank=True)
    total = MoneyField(max_digits=19, decimal_places=2, default_currency='EUR', blank=True, null=True)
    image = models.ImageField(upload_to='receipts', blank=True, null=True)
    ocr_data = models.JSONField(blank=True, null=True)
    class Meta:
        get_latest_by = ['-time']

    def __str__(self):
        return f"{self.time} - {self.total}"

class LineItem(models.Model):
    id = models.BigAutoField(primary_key=True)
    description = models.CharField(max_length=255)
    receipt = models.ForeignKey(Receipt, related_name="line_items", on_delete=models.CASCADE)
    item = models.ForeignKey(Item, related_name="line_items", on_delete=models.CASCADE, null=True, blank=True)
    total = MoneyField(max_digits=19, decimal_places=2, default_currency='EUR', blank=True, null=True)
    quantity = models.IntegerField(default=0)

    def __str__(self):
        return self.description