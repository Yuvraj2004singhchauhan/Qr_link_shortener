from django.urls import path
from .views import CreateShortURLView,MyLinksView

urlpatterns = [
    path("create/", CreateShortURLView.as_view()),
    path("my-links/",MyLinksView.as_view()),
]