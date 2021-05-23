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
from datetime import datetime


class ListList(ListView):
    model = List
    context_object_name = "lists"


class ListDetail(DetailView):
    model = List
    context_object_name = "list"

class ListItems(DetailView):
    model = List
    context_object_name = "list"
    template_name = "list/items_list.html"

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

class ItemCheck(UpdateView):
    model = Item
    fields = ["last_count"]
    template_name = 'list/check.html'
    
    def form_valid(self, form):
        form.instance.last_bought = datetime.now()
        form.instance.buy = False
        form.instance.current_count = form.instance.last_count
        form.instance.save()
        return super().form_valid(form)

    def get_success_url(self):
        # Redirect to list
        return reverse("items", kwargs={"pk": "1"})

def done(request):
    return HttpResponse('')

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
