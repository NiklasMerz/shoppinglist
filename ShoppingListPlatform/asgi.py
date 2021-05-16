"""
ASGI config for ShoppingListPlatform project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/howto/deployment/asgi/
"""

import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ShoppingListPlatform.settings")

from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from turbo.consumers import TurboStreamsConsumer


application = ProtocolTypeRouter(
    {"http": get_asgi_application(), "websocket": TurboStreamsConsumer.as_asgi()}
)
