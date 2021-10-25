from django.contrib import admin

# Register your models here.
from .models import *

admin.site.register(List)
admin.site.register(Item)
admin.site.register(Store)
admin.site.register(Checkout)

class CheckoutInline(admin.StackedInline):
    model = Checkout
    extra = 1


class TripAdmin(admin.ModelAdmin):
    inlines = [CheckoutInline]

admin.site.register(Trip, TripAdmin)
