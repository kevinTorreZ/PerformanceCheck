from rest_framework.response import Response
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework import viewsets
from .serializers import UserSerializer,UserRegister
from .models import usuario
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate

class UserViewSet(viewsets.ModelViewSet):
    queryset = usuario.objects.all()
    serializer_class = UserSerializer

@api_view(['GET'])
def user_detail(request, user_id):
    try:
        user = usuario.objects.get(pk=user_id)
    except usuario.DoesNotExist:
        return Response(status=404)
    serializer = UserSerializer(user)
    return Response(serializer.data)


class LoginView(APIView):
    def post(self, request):
        username = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user is None:
            return Response({'error': 'Credenciales inválidas'}, status=400)

        return Response({'token': 'your-token'})

class RegisterView(generics.CreateAPIView):
    queryset = usuario.objects.all()
    serializer_class = UserRegister