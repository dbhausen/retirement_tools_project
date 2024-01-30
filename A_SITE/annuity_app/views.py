
from django.http import HttpResponseRedirect, JsonResponse
from django.middleware.csrf import get_token
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.views import generic


from .models import Choice, Junk, Question, modelDict

from rest_framework import permissions
from rest_framework import views
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics, response
from django.contrib.auth import login, logout
from django.utils.decorators import method_decorator
from rest_framework.decorators import api_view

from . import serializers
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect, csrf_exempt

from rest_framework.decorators import api_view, permission_classes, renderer_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from django.contrib.auth.password_validation import password_validators_help_texts
from django.contrib.auth.models import User
# from .muiFields import MuiField
from .muiFields import getMuiColDef


@method_decorator(csrf_protect, name='dispatch')
@api_view(['POST'])
def create_auth(request):
    serialized = serializers.UserSerializer(data=request.DATA)
    if serialized.is_valid():
        serializers.UserSerializer.objects.create_user(
            serialized.init_data['email'],
            serialized.init_data['username'],
            serialized.init_data['password']
        )
        return Response(serialized.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serialized._errors, status=status.HTTP_400_BAD_REQUEST)


# does not work
@api_view(['POST'])
@permission_classes([AllowAny])
@method_decorator(csrf_protect, name='dispatch')
def register(self, request):
    serializer = serializers.RegisterSerializer(data=self.request.data,
                                                context={'request': self.request})
    user = serializer.create(self.request.data)
    return response.Response(serializers.UserSerializer(user).data, status=status.HTTP_202_ACCEPTED)


@method_decorator(ensure_csrf_cookie, name="dispatch")
class GetMeta(views.APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        modelName = request.query_params.get('model')
        gridColDef = getMuiColDef(modelDict[modelName])
        returnData = {'gridColDef': gridColDef}
        return response.Response(data=returnData)


@api_view(['POST', 'GET'])
@permission_classes([AllowAny])
def createJunk(request):
    serializer = serializers.JunkSerializer(data=request.data)
    junk = serializer.create(request.data)
    return response.Response(data={'pk': junk.id, 'junk': serializers.JunkSerializer(junk).data}, status=status.HTTP_202_ACCEPTED)


@permission_classes([IsAuthenticated])
@method_decorator(csrf_protect, name='dispatch')
class CreateJunkView(generics.CreateAPIView):
    queryset = Junk.objects.all()
    serializer_class = serializers.JunkSerializer


@permission_classes([IsAuthenticated])
@method_decorator(csrf_protect, name='dispatch')
class UpdateJunkView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Junk.objects.all()
    serializer_class = serializers.JunkSerializer


@permission_classes([IsAuthenticated])
@method_decorator(csrf_protect, name='dispatch')
class ListJunkView(generics.ListAPIView):
    queryset = Junk.objects.all()
    serializer_class = serializers.JunkSerializer


@permission_classes([AllowAny])
@method_decorator(csrf_protect, name='dispatch')
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = serializers.RegisterSerializer


@permission_classes([AllowAny])
@method_decorator(csrf_protect, name='dispatch')
class LoginView(views.APIView):

    def post(self, request, format=None):
        serializer = serializers.LoginSerializer(data=self.request.data,
                                                 context={'request': self.request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        serializers.LoginSerializer(request, user)
        # return Response(None, status=status.HTTP_202_ACCEPTED)
        return response.Response(serializers.UserSerializer(user).data, status=status.HTTP_202_ACCEPTED)


@permission_classes([AllowAny])
class LogoutView(views.APIView):

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


def validatorHelp(request):
    return JsonResponse({"helpTextList": password_validators_help_texts()})


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
