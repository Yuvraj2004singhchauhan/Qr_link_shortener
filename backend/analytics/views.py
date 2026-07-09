from django.shortcuts import render

from collections import Counter
from django.db.models import Count

from rest_framework.views import APIView
from rest_framework.response import Response

from links.models import ShortURL
from .models import ClickAnalytics
from .serializers import ClickAnalyticsSerializer
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated


class AnalyticsView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, short_code):

        short_url = get_object_or_404(
            ShortURL,
            short_code=short_code,
            user=request.user
        )
        clicks = ClickAnalytics.objects.filter(
            short_url=short_url
        )

        total_clicks = clicks.count()

        unique_visitors = clicks.values(
            "ip_address"
        ).distinct().count()

        browser_stats = Counter(
            clicks.values_list("browser", flat=True)
        )

        device_stats = Counter(
            clicks.values_list("device", flat=True)
        )

        recent_clicks = ClickAnalyticsSerializer(
            clicks.order_by("-clicked_at")[:10],
            many=True
        ).data

        return Response({

            "short_code": short_code,

            "total_clicks": total_clicks,

            "unique_visitors": unique_visitors,

            "browser_stats": browser_stats,

            "device_stats": device_stats,

            "recent_clicks": recent_clicks,

        })

class DashboardView(APIView):

    def get(self, request):

        links = ShortURL.objects.filter(
            user=request.user
        )

        total_links = links.count()

        clicks = ClickAnalytics.objects.filter(
            short_url__user=request.user
        )

        total_clicks = clicks.count()

        unique_visitors = (
            clicks.values("ip_address")
            .distinct()
            .count()
        )

        most_clicked = (
            links
            .annotate(click_count=Count("clicks"))
            .order_by("-click_count")
            .first()
        )

        recent_links = (
            links.order_by("-created_at")[:5]
        )

        return Response({

            "total_links": total_links,

            "total_clicks": total_clicks,

            "unique_visitors": unique_visitors,

            "most_clicked_link": {

                "id": most_clicked.id if most_clicked else None,

                "short_code": (
                    most_clicked.short_code
                    if most_clicked
                    else None
                ),

                "clicks": (
                    most_clicked.click_count
                    if most_clicked
                    else 0
                )

            },

            "recent_links": [
                {
                    "id": link.id,
                    "short_code": link.short_code,
                    "long_url": link.long_url
                }
                for link in recent_links
            ]

        })
