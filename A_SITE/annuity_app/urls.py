from django.urls import include, path

from . import views
from drf_auto_endpoint.router import router

from .models import Junk, Junk_Detail, Choice

router.register(Junk)
router.register(Junk_Detail)
router.register(Choice)

urlpatterns = [
    path('', include(router.urls)),
]

app_name = "annuity_app"
urlpatterns += [
    path("", views.IndexView.as_view(), name="index"),
    path("<int:pk>/", views.DetailView.as_view(), name="question_detail"),
    path("<int:pk>/results/", views.ResultsView.as_view(), name="results"),
    path("<int:question_id>/vote/", views.vote, name="vote"),
    path('login/', views.LoginView.as_view()),
    path('register/', views.RegisterView.as_view()),
    path('profile/', views.ProfileView.as_view()),
    path('logout/', views.LogoutView.as_view()),
    path("csrf/", views.GetCSRFToken.as_view()),
    path("validatorHelp/", views.validatorHelp),
    path("junk/", views.CreateJunkView.as_view()),
    path("updatejunk/<int:pk>", views.UpdateJunkView.as_view()),
    path("listjunk/", views.ListJunkView.as_view()),
    path("opt/", views.GetMeta.as_view()),
]
