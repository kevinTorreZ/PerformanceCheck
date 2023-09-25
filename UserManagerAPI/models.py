from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class proyecto(models.Model):
    idProyecto = models.AutoField(primary_key=True, unique=True)
    Nombre = models.CharField(max_length=30, blank=None)
    Descripcion = models.TextField(blank=None)
    FechaLimite = models.DateTimeField()

class equipo(models.Model):
    idEquipo = models.AutoField(primary_key=True, unique=True)
    Nombre_equipo = models.CharField(max_length=30, blank=None)
    Lider = models.IntegerField(default=None, null=True)
    Fk_proyecto_asignado = models.ForeignKey(proyecto, on_delete=models.CASCADE)


class UsuarioManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('El campo Email es obligatorio')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)
class usuario(AbstractBaseUser, PermissionsMixin):
    idUsuario = models.AutoField(primary_key=True, unique=True)
    Nombre = models.CharField(max_length=30, blank=None)
    email = models.EmailField(max_length=80, unique=True)
    Cargo = models.CharField(max_length=50)
    Usuario = models.CharField(max_length=50)
    password = models.CharField(max_length=100)
    Fk_proyecto_asignado = models.ForeignKey(proyecto, on_delete=models.CASCADE, null=True)
    Fk_equipo_asignado = models.ForeignKey(equipo, on_delete=models.CASCADE, null=True)
    objects = UsuarioManager()
    USERNAME_FIELD = 'email'
