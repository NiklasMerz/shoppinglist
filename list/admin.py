from django.contrib import admin

# Register your models here.
from .models import *

admin.site.register(List)
admin.site.register(Store)
admin.site.register(Checkout)

class SKUInline(admin.StackedInline):
    model = SKU
    extra = 0

class ItemAdmin(admin.ModelAdmin):
    inlines = [SKUInline]

admin.site.register(Item, ItemAdmin)
admin.site.register(SKU)
class CheckoutInline(admin.StackedInline):
    model = Checkout
    extra = 1

class TripAdmin(admin.ModelAdmin):
    inlines = [CheckoutInline]

admin.site.register(Trip, TripAdmin)
class LineItemInline(admin.StackedInline):
    model = LineItem
    extra = 1
class ReceiptAdmin(admin.ModelAdmin):
    inlines = [LineItemInline]

admin.site.register(Receipt, ReceiptAdmin)
