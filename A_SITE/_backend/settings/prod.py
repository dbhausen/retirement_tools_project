from _backend.settings.common import *

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = ["*"]

CORS_ALLOWED_ORIGINS = [
    "http://dbhausen.pythonanywhere.com",
]

CSRF_TRUSTED_ORIGINS = [
    "http://dbhausen.pythonanywhere.com",
]


CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SECURE = True
SECURE_SSL_REDIRECT = True

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
