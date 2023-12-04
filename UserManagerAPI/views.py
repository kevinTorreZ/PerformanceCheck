from rest_framework.response import Response
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework import viewsets,status
from .serializers import UserSerializer, UserRegister,EquipoSerializer,ProyectoSerializer,CustomTokenObtainPairSerializer,SnapshotSerializer
from .models import usuario, equipo,proyecto,Snapshot
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
@api_view(['GET', 'PUT', 'DELETE'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def user_detail(request, user_id):
    try:
        user = usuario.objects.get(pk=user_id)
    except usuario.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'PUT':
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class LoginView(APIView):
    def post(self, request):
        serializer = CustomTokenObtainPairSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data, status=200)

# @authentication_classes([JWTAuthentication])
# @permission_classes([IsAuthenticated])
class RegisterView(generics.CreateAPIView):
    queryset = usuario.objects.all()
    serializer_class = UserRegister


class ObtenerEquipos(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        queryset = equipo.objects.all()
        serializer = EquipoSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = EquipoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ObtenerEquipo(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, id_equipo):
        try:
            equipo_obj = equipo.objects.get(pk=id_equipo)
        except equipo.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = EquipoSerializer(equipo_obj)
        return Response(serializer.data)

    def put(self, request, id_equipo):
        try:
            equipo_obj = equipo.objects.get(pk=id_equipo)
        except equipo.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = EquipoSerializer(equipo_obj, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id_equipo):
        try:
            equipo_obj = equipo.objects.get(pk=id_equipo)
        except equipo.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        equipo_obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        

class obtenerProyecto(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, id_proyecto):
        try:
            Proyecto = proyecto.objects.get(pk=id_proyecto)
        except proyecto.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = ProyectoSerializer(Proyecto)
        return Response(serializer.data)

    def put(self, request, id_proyecto):
        try:
            Proyecto = proyecto.objects.get(pk=id_proyecto)
        except proyecto.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = ProyectoSerializer(Proyecto, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id_proyecto):
        try:
            Proyecto = proyecto.objects.get(pk=id_proyecto)
        except proyecto.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        Proyecto.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class obtenerTodosLosProyectos(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        Proyectos = proyecto.objects.all()
        serializer = ProyectoSerializer(Proyectos, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ProyectoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SnapshotView(APIView):
    serializer_class = SnapshotSerializer
    queryset = Snapshot.objects.all()

    def get(self, request):
        # Obtiene todos los snapshots
        snapshots = Snapshot.objects.all()

        # Serializa los snapshots
        serializer = self.serializer_class(snapshots, many=True)

        # Devuelve los snapshots serializados
        return Response(serializer.data)

    def post(self, request):
        # Crea un nuevo serializer con los datos de la solicitud
        serializer = self.serializer_class(data=request.data)

        # Valida los datos de la solicitud
        if serializer.is_valid(raise_exception=True):
            # Crea el snapshot
            snapshot = serializer.save()

            # Devuelve el snapshot creado
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)











