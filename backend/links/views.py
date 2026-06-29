from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny

import qrcode
from io import BytesIO

from django.core.files import File

from .models import ShortURL
from .serializers import ShortURLSerializer
from .utils import generate_short_code

from django.shortcuts import get_object_or_404, redirect

class CreateShortURLView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):

        serializer = ShortURLSerializer(data=request.data)

        if serializer.is_valid():

            short_code = generate_short_code()

            short_url = ShortURL.objects.create(
                long_url=serializer.validated_data["long_url"],
                short_code=short_code,
            )
            base_url = request.build_absolute_uri("/")[:-1]

            complete_short_url = f"{base_url}/{short_code}"

            qr = qrcode.make(complete_short_url)

            buffer = BytesIO()

            qr.save(buffer, format="PNG")

            filename = f"{short_code}.png"

            short_url.qr_code.save(
                filename,
                File(buffer),
                save=True
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

        return redirect(short_url.long_url)