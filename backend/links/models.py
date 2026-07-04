from django.db import models
from users.models import User

class ShortURL(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name="links")
    long_url = models.URLField()
    short_code = models.CharField(max_length=10, unique=True)
    qr_code = models.ImageField(upload_to="qr_codes/")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.short_code