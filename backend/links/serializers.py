from rest_framework import serializers
from .models import ShortURL

class ShortURLSerializer(serializers.ModelSerializer):

    short_url = serializers.SerializerMethodField()

    class Meta:
        model = ShortURL
        fields = [
            "id",
            "long_url",
            "short_code",
            "short_url",
            "qr_code",
            "created_at",
        ]
        read_only_fields = [
            "short_code",
            "short_url",
            "qr_code",
            "created_at",
        ]

    def get_short_url(self, obj):
        request = self.context.get("request")

        if request:
            return request.build_absolute_uri("/")[:-1] + "/" + obj.short_code

        return obj.short_code

class MyLinksSerializer(serializers.ModelSerializer):

    short_url = serializers.SerializerMethodField()

    class Meta:
        model = ShortURL
        fields = [
            "id",
            "long_url",
            "short_url",
            "short_code",
            "qr_code",
            "created_at",
        ]

    def get_short_url(self, obj):
        request = self.context.get("request")

        if request:
            return request.build_absolute_uri(f"/{obj.short_code}")

        return obj.short_code

class UpdateLinkSerializer(serializers.Serializer):

    long_url = serializers.URLField()

    custom_alias = serializers.CharField(
        required=False,
        allow_blank=True
    )