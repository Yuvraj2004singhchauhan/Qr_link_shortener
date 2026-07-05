import qrcode

from io import BytesIO

from django.core.files import File
from django.core.files.storage import default_storage

from .models import ShortURL
from .utils import generate_short_code


def generate_qr_code(short_url, complete_short_url):
    
    qr = qrcode.make(complete_short_url)

    buffer = BytesIO()

    qr.save(buffer, format="PNG")

    filename = f"{short_url.short_code}.png"

    short_url.qr_code.save(
        filename,
        File(buffer),
        save=True
    )

    return short_url

def update_short_url(*,short_url,long_url,custom_alias="",request):

    alias_changed = False

    short_url.long_url = long_url

    #custom_alias = custom_alias.strip()

    if custom_alias:
        if custom_alias != short_url.short_code:

            if ShortURL.objects.filter(short_code=custom_alias).exists():
                raise ValueError("Alias already exists.")
                print("Updated short_code:", short_url.short_code)

            alias_changed = True
            short_url.short_code = custom_alias

    short_url.save()
    if alias_changed:
        if short_url.qr_code:
            short_url.qr_code.delete(save=False)

        base_url = request.build_absolute_uri("/")[:-1]

        complete_short_url = f"{base_url}/{short_url.short_code}"

        generate_qr_code(
            short_url,
            complete_short_url
        )

    return short_url