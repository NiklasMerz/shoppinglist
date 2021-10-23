from django.contrib import admin

# Register your models here.
from .models import *

admin.site.register(List)
admin.site.register(Item)
admin.site.register(Store)
admin.site.register(Trip)
admin.site.register(Checkout)
