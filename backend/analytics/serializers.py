from rest_framework import serializers
from .models import ClickAnalytics

class ClickAnalyticsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClickAnalytics
        fields = [
            "ip_address",
            "browser",
            "operating_system",
            "device",
            "clicked_at",
        ]