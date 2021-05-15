from django.db import models
from django.urls import reverse

from turbo.mixins import BroadcastableMixin


class List(BroadcastableMixin, models.Model):
    name = models.CharField(max_length=255)

    def get_absolute_url(self):
        return reverse("detail", kwargs={"pk": self.pk})


class Item(BroadcastableMixin, models.Model):
    broadcasts_to = ["list", "all-lists"]
    broadcast_self = False

    list = models.ForeignKey(List, related_name="items", on_delete=models.CASCADE)
    text = models.TextField()
    note = models.TextField(default=None, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
