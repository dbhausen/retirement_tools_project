from _backend.settings.common import *

"""
Django settings for _backend project.
"""

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-nt5x(^hmvy0vutc5(&v_gkn_#bduvinhox+rpwrxbmw!kub=f6"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["*"]


# Database
# https://docs.djangoproject.com/en/4.0/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}



