from django.contrib import admin
from django.urls import include, path


urlpatterns = [
    path("polls/", include("annuity_app.urls")),
    path("rest/", include("quickstart.urls")),
    path("snip/", include("snippets.urls")),
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls")),
]
