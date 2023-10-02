from rest_framework import serializers
from .models import usuario, equipo, proyecto
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class ProyectoSerializer(serializers.ModelSerializer):
    class Meta:
        model = proyecto
        fields = ['idProyecto','Nombre','Descripcion','FechaLimite']  # Añade aquí los campos que necesites

class EquipoSerializer(serializers.ModelSerializer):
    class Meta:
        model = equipo
        fields = ['idEquipo','Nombre_equipo','Lider','Fk_proyecto_asignado_id']



User = get_user_model()

class UserRegister(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email','password','Cargo','Rut','Nombre','Fk_equipo_asignado_id','Fk_proyecto_asignado_id')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        email = validated_data.get('email')
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError("Un usuario con ese email ya existe")
        user = User.objects.create_user(**validated_data)
        return user



class UserSerializer(serializers.ModelSerializer):
    Fk_equipo_asignado_id = serializers.PrimaryKeyRelatedField(queryset=equipo.objects.all(), allow_null=True)
    Fk_proyecto_asignado_id = serializers.PrimaryKeyRelatedField(queryset=proyecto.objects.all(), allow_null=True)

    class Meta:
        model = usuario
        fields = ['idUsuario','Nombre', 'email', 'Cargo','Rut','Usuario','password','Fk_equipo_asignado_id','Fk_proyecto_asignado_id']

    def get_Fk_equipo_asignado_id(self, obj):
        try:
            equipo_instance = equipo.objects.get(idEquipo=obj.Fk_equipo_asignado_id)
        except equipo.DoesNotExist:
            equipo_instance = None
        return EquipoSerializer(equipo_instance).data if equipo_instance else None


    def get_Fk_proyecto_asignado_id(self, obj):
        try:
            proyecto_instance = proyecto.objects.get(idProyecto=obj.Fk_proyecto_asignado_id)
        except proyecto.DoesNotExist:
            proyecto_instance = None
        return ProyectoSerializer(proyecto_instance).data if proyecto_instance else None

    def update(self, instance, validated_data):
        if 'email' in validated_data and validated_data['email'] == instance.email:
            validated_data.pop('email')
        instance.Fk_proyecto_asignado_id = validated_data.get('Fk_proyecto_asignado_id', instance.Fk_proyecto_asignado_id)
        return super().update(instance, validated_data)


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['Nombre'] = user.Nombre
        token['email'] = user.email
        token['is_superuser'] = user.is_superuser
        token['is_staff'] = user.is_staff
        token['user_id'] = user.idUsuario
        token['user_rol'] = user.Cargo
        return token