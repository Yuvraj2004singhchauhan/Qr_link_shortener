from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny

from .models import ShortURL
from .serializers import ShortURLSerializer
from .utils import generate_short_code

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

            response_serializer = ShortURLSerializer(short_url)

            return Response(
                response_serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )