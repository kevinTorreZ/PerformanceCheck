from rest_framework import serializers
from .models import usuario, equipo, proyecto
from django.contrib.auth import get_user_model

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
        fields = ('email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        email = validated_data.get('email')
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError("Un usuario con ese email ya existe")
        user = User.objects.create_user(**validated_data)
        return user



class UserSerializer(serializers.ModelSerializer):
    Fk_equipo_asignado_id = serializers.SerializerMethodField()  
    Fk_proyecto_asignado_id = serializers.SerializerMethodField()

    class Meta:
        model = usuario
        fields = ['idUsuario','Nombre', 'email', 'Cargo','Usuario','password','Fk_equipo_asignado_id','Fk_proyecto_asignado_id']

    def get_Fk_equipo_asignado_id(self, obj):
        equipo_instance = equipo.objects.get(idEquipo=obj.Fk_equipo_asignado_id)
        return EquipoSerializer(equipo_instance).data

    def get_Fk_proyecto_asignado_id(self, obj):
        proyecto_instance = proyecto.objects.get(idProyecto=obj.Fk_proyecto_asignado_id)
        return ProyectoSerializer(proyecto_instance).data