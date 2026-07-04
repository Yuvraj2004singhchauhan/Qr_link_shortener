from rest_framework import serializers
from .models import ShortURL

class ShortURLSerializer(serializers.ModelSerializer):
    custom_alias = serializers.CharField(
        required=False,
        allow_blank=True,
        write_only=True
    )
    class Meta:
        model = ShortURL
        fields = "__all__"
        read_only_fields = [
            "user", 
            "short_code",
            "qr_code",
            "created_at",
        ]

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