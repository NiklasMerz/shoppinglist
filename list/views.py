from typing import List
from django.views.generic.base import View
import turbo
from django.http import HttpResponse
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.views.generic import ListView, DetailView
from django.views.generic.edit import CreateView, DeleteView, UpdateView
from turbo import APPEND
from .models import Item, List


class ListList(ListView):
    model = List
    context_object_name = "lists"


class ListDetail(DetailView):
    model = List
    context_object_name = "list"


class ListUpdate(UpdateView):
    model = List
    fields = ["name"]


class ItemCreate(CreateView):
    model = Item
    fields = ["text", "note"]

    def get_success_url(self):
        # Redirect to the empty form
        return reverse("send", kwargs={"pk": self.kwargs["pk"]})

    def form_valid(self, form):
        list = get_object_or_404(List, pk=self.kwargs["pk"])
        form.instance.list = list
        form.instance.save()
        return super().form_valid(list)

class ItemDelete(DeleteView):
    model = Item

    def get_success_url(self):
        # Redirect to list
        return reverse("done")

def done(request):
    # Empty frame, TODO stimulus?

    return HttpResponse('<turbo-frame id="delete-item"></turbo-frame>')
    

def wiretap(request):
    """
    This is a View that just receives all messages sent in all rooms while its connected.
    """
    return render(request, "list/wiretap.html", {})


def second_broadcast_view(request):
    context = {"broadcast": "This is a broadcast and NO MESSAGE"}
    turbo.broadcast_stream(
        "broadcasts", "messages", APPEND, "list/broadcast.html", context
    )

    return HttpResponse("Sent a Broadcast")
