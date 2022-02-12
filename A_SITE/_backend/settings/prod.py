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

# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "NAME": "dbhausen$reg_db",
        "USER": "dbhausen",
        "PASSWORD": "fhKBdLR@u79Gdme",
        "HOST": "dbhausen.mysql.pythonanywhere-services.com",
    }
}
