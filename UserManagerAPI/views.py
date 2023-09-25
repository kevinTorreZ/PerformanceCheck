from rest_framework.response import Response
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework import viewsets
from .serializers import UserSerializer, UserRegister,EquipoSerializer,ProyectoSerializer
from .models import usuario, equipo,proyecto
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = usuario.objects.all()
    serializer_class = UserSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def user_detail(request, user_id):
    try:
        user = usuario.objects.get(pk=user_id)
    except usuario.DoesNotExist:
        return Response(status=404)
    serializer = UserSerializer(user)
    return Response(serializer.data)

class LoginView(APIView):
    def post(self, request):
        serializer = TokenObtainPairSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data, status=200)

class RegisterView(generics.CreateAPIView):
    queryset = usuario.objects.all()
    serializer_class = UserRegister

@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
class ObtenerEquipos(APIView):
    def get(self, request, format=None):
        queryset = equipo.objects.all()
        serializer = EquipoSerializer(queryset, many=True)

        return Response(serializer.data)
@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def obtenerProyecto(request, id_equipo):
    try:
        Proyecto = proyecto.objects.get(pk=id_equipo)
    except usuario.DoesNotExist:
        return Response(status=404)
    serializer = ProyectoSerializer(Proyecto)
    return Response(serializer.data)
