from django.db import models

class ShortURL(models.Model):
    long_url = models.URLField()
    short_code = models.CharField(max_length=10, unique=True)
    qr_code = models.ImageField(upload_to="qr_codes/")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.short_code