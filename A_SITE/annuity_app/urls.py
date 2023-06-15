from django.urls import path

from . import views

app_name = "annuity_app"
urlpatterns = [
    path("", views.IndexView.as_view(), name="index"),
    path("<int:pk>/", views.DetailView.as_view(), name="question_detail"),
    path("<int:pk>/results/", views.ResultsView.as_view(), name="results"),
    path("<int:question_id>/vote/", views.vote, name="vote"),
    path('login/', views.LoginView.as_view()),
    path('profile/', views.ProfileView.as_view()),
    path('logout/', views.LogoutView.as_view()),
    path("csrf/", views.GetCSRFToken.as_view()),
    path("csrfObj/", views.csrf),


]
