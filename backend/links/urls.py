from django.urls import path
from .views import CreateShortURLView,MyLinksView,DeleteLinkView,UpdateLinkView

urlpatterns = [
    path("create/", CreateShortURLView.as_view()),
    path("my-links/",MyLinksView.as_view()),
    path("delete/<int:id>/", DeleteLinkView.as_view()),
    path("update/<int:id>/",UpdateLinkView.as_view()),
]