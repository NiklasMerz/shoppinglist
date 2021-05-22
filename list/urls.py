from django.urls import path

from . import views

urlpatterns = [
    path("", views.ListList.as_view(), name="index"),
    
    # Lists
    path("<slug:pk>/", views.ListDetail.as_view(), name="detail"),
    path("<slug:pk>/edit", views.ListUpdate.as_view(), name="update"),
    path("<slug:pk>/send", views.ItemCreate.as_view(), name="send"),
    path("<slug:pk>/items", views.ListItems.as_view(), name="items"),

    # Items
    path("<slug:pk>/check", views.ItemCheck.as_view(), name="check"),

    # Misc
    path("wiretap", views.wiretap, name="wiretap"),
    path("broadcast", views.second_broadcast_view, name="broadcast"),
    path("done", views.done, name="done"),
]
