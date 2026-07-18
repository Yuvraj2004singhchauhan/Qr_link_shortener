from rest_framework import serializers
from .models import ShortURL

from rest_framework import serializers


class ClickTrendSerializer(serializers.Serializer):
    date = serializers.DateField()
    clicks = serializers.IntegerField()


class TopLinkSerializer(serializers.Serializer):
    short_code = serializers.CharField()
    short_url = serializers.URLField()
    long_url = serializers.URLField()
    clicks = serializers.IntegerField()


class RecentActivitySerializer(serializers.Serializer):
    short_code = serializers.CharField()
    browser = serializers.CharField()
    device = serializers.CharField()
    operating_system = serializers.CharField()
    ip_address = serializers.CharField()
    clicked_at = serializers.DateTimeField()


class DashboardAnalyticsSerializer(serializers.Serializer):
    total_links = serializers.IntegerField()
    total_clicks = serializers.IntegerField()
    unique_visitors = serializers.IntegerField()

    browser_stats = serializers.DictField(
        child=serializers.IntegerField()
    )

    device_stats = serializers.DictField(
        child=serializers.IntegerField()
    )

    click_trend = ClickTrendSerializer(many=True)

    top_links = TopLinkSerializer(many=True)

    recent_activity = RecentActivitySerializer(many=True)

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