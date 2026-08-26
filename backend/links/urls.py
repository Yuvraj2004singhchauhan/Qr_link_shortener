from django.urls import path
from .views import CreateShortURLView,MyLinksView,DeleteLinkView,UpdateLinkView,DashboardAnalyticsView,healthView

urlpatterns = [
    path("create/", CreateShortURLView.as_view()),
    path("my-links/",MyLinksView.as_view()),
    path("delete/<int:id>/", DeleteLinkView.as_view()),
    path("update/<int:id>/",UpdateLinkView.as_view()),
    path("dashboard-analytics/",DashboardAnalyticsView.as_view(),),
    path("health/",healthView.as_view()),
]
