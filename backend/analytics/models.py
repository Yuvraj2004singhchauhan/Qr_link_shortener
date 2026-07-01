from django.db import models
from links.models import ShortURL


class ClickAnalytics(models.Model):
    short_url = models.ForeignKey(
        ShortURL,
        on_delete=models.CASCADE,
        related_name="clicks"
    )

    ip_address = models.GenericIPAddressField()

    user_agent = models.TextField()

    browser = models.CharField(max_length=100, blank=True)

    operating_system = models.CharField(max_length=100, blank=True)

    device = models.CharField(max_length=100, blank=True)

    referrer = models.URLField(
        blank=True,
        null=True
    )

    clicked_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.short_url.short_code