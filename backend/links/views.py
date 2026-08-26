from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from drf_spectacular.utils import extend_schema
from django.db.models import Count
from django.db.models.functions import TruncDate
from django.http import JsonResponse


import qrcode
from io import BytesIO

from django.core.files import File

from .models import ShortURL
from .serializers import ShortURLSerializer,MyLinksSerializer,UpdateLinkSerializer,ClickTrendSerializer,TopLinkSerializer,RecentActivitySerializer,DashboardAnalyticsSerializer
from .utils import generate_short_code
from .services import generate_qr_code,update_short_url
from .pagination import LinkPagination

from django.shortcuts import get_object_or_404, redirect
from analytics.models import ClickAnalytics
from rest_framework.permissions import IsAuthenticated


from user_agents import parse

class DashboardAnalyticsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        links = ShortURL.objects.filter(user=request.user)

        clicks = ClickAnalytics.objects.filter(
            short_url__user=request.user
        )

        total_links = links.count()

        total_clicks = clicks.count()

        unique_visitors = (
            clicks.values("ip_address")
            .distinct()
            .count()
        )

        browser_stats = {
            item["browser"]: item["count"]
            for item in clicks.values("browser")
            .annotate(count=Count("id"))
        }

        device_stats = {
            item["device"]: item["count"]
            for item in clicks.values("device")
            .annotate(count=Count("id"))
        }
        click_trend = (
                clicks.annotate(
                    date=TruncDate("clicked_at")
                )
                .values("date")
                .annotate(clicks=Count("id"))
                .order_by("date")
            )

        click_trend_data = [
                {
                    "date": item["date"],
                    "clicks": item["clicks"],
                }
                for item in click_trend
            ]

        top_links = (
            links.annotate(
                total_clicks=Count("clicks")
            )
            .order_by("-total_clicks")[:5]
        )

        top_links_data = [
    {
        "short_code": link.short_code,
        "short_url": request.build_absolute_uri("/")[:-1] + "/" + link.short_code,
        "long_url": link.long_url,
        "clicks": link.total_clicks,
    }
    for link in top_links
    ]

        recent_activity = (
            clicks.select_related("short_url")
            .order_by("-clicked_at")[:10]
        )

        recent_activity_data = [
            {
                "short_code": click.short_url.short_code,
                "browser": click.browser,
                "device": click.device,
                "operating_system": click.operating_system,
                "ip_address": click.ip_address,
                "clicked_at": click.clicked_at,
            }
            for click in recent_activity
        ]

        data = {
            "total_links": total_links,
            "total_clicks": total_clicks,
            "unique_visitors": unique_visitors,
            "browser_stats": browser_stats,
            "device_stats": device_stats,
            "click_trend": click_trend_data,
            "top_links": top_links_data,
            "recent_activity": recent_activity_data,
        }

        serializer = DashboardAnalyticsSerializer(data)

        return Response(serializer.data)

class CreateShortURLView(APIView):
    def post(self, request):

        serializer = ShortURLSerializer(data=request.data)
        custom_alias = request.data.get("custom_alias") 

        if serializer.is_valid():

            if custom_alias:

                if ShortURL.objects.filter(
                    short_code=custom_alias
                ).exists():

                    return Response(
                        {
                            "error": "Alias already exists."
                        },
                        status=400
                    )

                short_code = custom_alias

            else:

                short_code = generate_short_code()            

            short_url = ShortURL.objects.create(
                user=request.user,
                long_url=serializer.validated_data["long_url"],
                short_code=short_code,
            )
            base_url = request.build_absolute_uri("/")[:-1]

            complete_short_url = f"{base_url}/{short_code}"

            generate_qr_code(
                short_url,
                complete_short_url
            )

            response_serializer = ShortURLSerializer(
                short_url,
                context={"request": request}
            )
            return Response(
                response_serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
    
class RedirectShortURLView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request, short_code):

        short_url = get_object_or_404(
            ShortURL,
            short_code=short_code
        )

        ip_address = request.META.get("REMOTE_ADDR")

        user_agent = request.META.get("HTTP_USER_AGENT", "")

        referrer = request.META.get("HTTP_REFERER", "")
        
        user_agent_data = parse(user_agent)

        browser = user_agent_data.browser.family

        operating_system = user_agent_data.os.family

        device = (
            "Mobile"
            if user_agent_data.is_mobile
            else "Tablet"
            if user_agent_data.is_tablet
            else "PC"
        )

        ClickAnalytics.objects.create(
            short_url=short_url,
            ip_address=ip_address,
            user_agent=user_agent,
            browser=browser,
            operating_system=operating_system,
            device=device,
            referrer=referrer if referrer else None,
        )

        return redirect(short_url.long_url)

class MyLinksView(APIView):

    def get(self, request):

        links = (
            ShortURL.objects
            .filter(user=request.user)
            .order_by("-created_at")
        )
        search = request.query_params.get("search")

        if search:

            links = links.filter(
                long_url__icontains=search
            )

        paginator = LinkPagination()

        page = paginator.paginate_queryset(
            links,
            request
        )

        serializer = MyLinksSerializer(
            page,
            many=True,
            context={
                "request":request
            }
        )

        return paginator.get_paginated_response(
            serializer.data
        )

class DeleteLinkView(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request, id):

        link = get_object_or_404(
            ShortURL,
            id=id,
            user=request.user
        )

        link.delete()

        return Response(
            {
                "message": "Link deleted successfully."
            },
            status=status.HTTP_200_OK
        )

class UpdateLinkView(APIView):
    @extend_schema(
        request=UpdateLinkSerializer,
        responses=ShortURLSerializer,
    )

    def put(self, request, id):

        serializer = UpdateLinkSerializer(
            data=request.data
        )

        serializer.is_valid(raise_exception=True)

        short_url = get_object_or_404(
            ShortURL,
            id=id,
            user=request.user
        )
        try:

            updated_link = update_short_url(
                short_url=short_url,
                request=request,
                **serializer.validated_data
            )

        except ValueError as e:

            return Response(
                {
                    "error": str(e)
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response(
            ShortURLSerializer(updated_link).data
        )

def healthView(request):
    return JsonResponse({"status": "ok"})
