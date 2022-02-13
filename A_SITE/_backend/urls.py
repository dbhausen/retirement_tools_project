from django.contrib import admin
from django.urls import include, path
from django.views.generic import TemplateView


urlpatterns = [
    path("polls/", include("annuity_app.urls")),
    path("rest/", include("quickstart.urls")),
    path("snip/", include("snippets.urls")),
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls")),
    path("a/", TemplateView.as_view(template_name="index.html")),
]
