import logging
from django.http import HttpResponseRedirect, JsonResponse
from django.middleware.csrf import get_token
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.views import generic

from .models import Choice, Question

from rest_framework import permissions
from rest_framework import views
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics, response
from django.contrib.auth import login, logout
from django.utils.decorators import method_decorator

from . import serializers
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect, csrf_exempt


@method_decorator(csrf_protect, name='dispatch')
class LoginView(views.APIView):
    # This view should be accessible also for unauthenticated users.
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = serializers.LoginSerializer(data=self.request.data,
                                                 context={'request': self.request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        serializers.LoginSerializer(request, user)
        # return Response(None, status=status.HTTP_202_ACCEPTED)
        return response.Response(serializers.UserSerializer(user).data, status=status.HTTP_202_ACCEPTED)


class LogoutView(views.APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        logout(request)
        return response.Response()


@method_decorator(csrf_protect, name='dispatch')
class ProfileView(generics.RetrieveAPIView):
    serializer_class = serializers.UserSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        return self.request.user


@method_decorator(ensure_csrf_cookie, name="dispatch")
class GetCSRFToken(views.APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):

        return response.Response({'sucsess': 'CSRF cookie set'})


def csrf(request):
    return JsonResponse({"csrfToken": get_token(request)})


class IndexView(generic.ListView):
    template_name = "annuity_app/index.html"
    # context_object_name = "latest_question_list"

    def get_queryset(self):
        """Return the last five published questions."""
        return Question.objects.order_by("-pub_date")[:5]


class DetailView(generic.DetailView):
    model = Question


#    template_name = "annuity_app/question_detail.html"


#   uses default name: annuity_app/question_detail.html


class ResultsView(generic.DetailView):
    model = Question
    template_name = "annuity_app/results.html"


def vote(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    try:
        selected_choice = question.choice_set.get(pk=request.POST["choice"])
    except (KeyError, Choice.DoesNotExist):
        # Redisplay the question voting form.
        return render(
            request,
            "annuity_app/question_detail.html",
            {
                "question": question,
                "error_message": "You didn't select a choice.",
            },
        )
    else:
        selected_choice.votes += 1
        selected_choice.save()
        # Always return an HttpResponseRedirect after successfully dealing
        # with POST data. This prevents data from being posted twice if a
        # user hits the Back button.
        return HttpResponseRedirect(reverse("annuity_app:results", args=(question.id,)))
