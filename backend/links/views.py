from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from drf_spectacular.utils import extend_schema


import qrcode
from io import BytesIO

from django.core.files import File

from .models import ShortURL
from .serializers import ShortURLSerializer,MyLinksSerializer,UpdateLinkSerializer
from .utils import generate_short_code
from .services import generate_qr_code,update_short_url
from .pagination import LinkPagination

from django.shortcuts import get_object_or_404, redirect
from analytics.models import ClickAnalytics

from user_agents import parse

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

            response_serializer = ShortURLSerializer(short_url)

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