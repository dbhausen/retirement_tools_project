from _backend.settings.common import *


ALLOWED_HOSTS = ["*"]

CORS_ALLOW_CREDENTIALS = True

# change to app.example.com in production settings
CORS_ALLOWED_ORIGINS = [
    "http://dbhausen.pythonanywhere.com",
]

CSRF_TRUSTED_ORIGINS = [
    "http://dbhausen.pythonanywhere.com",
]

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-nt5x(^hmvy0vutc5(&v_gkn_#bduvinhox+rpwrxbmw!kub=f6"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["*"]


# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "NAME": "dbhausen$ret_db",
        "USER": "dbhausen",
        "PASSWORD": "fhKBdLR@u79Gdme",
        "HOST": "dbhausen.mysql.pythonanywhere-services.com",
    }
}
