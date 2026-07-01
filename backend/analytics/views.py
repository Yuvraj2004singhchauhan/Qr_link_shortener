from django.shortcuts import render

from collections import Counter

from rest_framework.views import APIView
from rest_framework.response import Response

from links.models import ShortURL
from .models import ClickAnalytics
from .serializers import ClickAnalyticsSerializer
from rest_framework.permissions import AllowAny


class AnalyticsView(APIView):

    permission_classes = [AllowAny]
    def get(self, request, short_code):

        short_url = ShortURL.objects.get(
            short_code=short_code
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
