from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class equipo(models.Model):
    idEquipo = models.AutoField(primary_key=True, unique=True)
    Nombre_equipo = models.CharField(max_length=30, blank=None)
    Lider = models.IntegerField(default=None, null=True)


class proyecto(models.Model):
    idProyecto = models.AutoField(primary_key=True, unique=True)
    Nombre = models.CharField(max_length=30, blank=None)
    Descripcion = models.TextField(blank=None)
    FechaInicio = models.DateTimeField()
    FechaTermino = models.DateTimeField()
    Fk_equipo_asignado = models.ForeignKey(equipo, on_delete=models.CASCADE)


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
    Rut = models.CharField(max_length=10)
    email = models.EmailField(max_length=80, unique=True)
    Cargo = models.CharField(max_length=50)
    Usuario = models.CharField(max_length=50)
    password = models.CharField(max_length=100)
    Fk_proyecto_asignado = models.ForeignKey(proyecto, on_delete=models.CASCADE, null=True)
    Fk_equipo_asignado = models.ForeignKey(equipo, on_delete=models.CASCADE, null=True)
    objects = UsuarioManager()
    USERNAME_FIELD = 'email'
    def validate_unique(self, exclude=None):
        if self.pk is not None:  # Si el usuario ya existe (es decir, estás actualizando, no creando)
            if 'email' in exclude:  # Si 'email' está en la lista de campos excluidos
                exclude.remove('email')  # Elimina 'email' de la lista de campos excluidos

        super().validate_unique(exclude=exclude)

class Snapshot(models.Model):
    idSnapshot = models.AutoField(primary_key=True, unique=True)
    Funcion = models.CharField(max_length=255)
    startDate = models.DateField()
    endDate = models.DateField()
    Estado = models.CharField(max_length=50)
    additionalInfo = models.TextField(blank=True, null=True)
    user = models.ForeignKey(usuario, on_delete=models.CASCADE)
    project = models.ForeignKey(proyecto, on_delete=models.CASCADE)
    team = models.ForeignKey(equipo, on_delete=models.CASCADE)

from django.db import models

class Evaluacion(models.Model):
    RESPUESTAS = [
        ('totalmenteEnDesacuerdo', 'Totalmente en desacuerdo'),
        ('enDesacuerdo', 'En desacuerdo'),
        ('neutral', 'Neutral'),
        ('deAcuerdo', 'De acuerdo'),
        ('totalmenteDeAcuerdo', 'Totalmente de acuerdo'),
    ]
    SI_NO = [
        ('si', 'Sí'),
        ('no', 'No'),
    ]
    idEvaluacion = models.AutoField(primary_key=True, unique=True)
    pregunta1 = models.CharField(max_length=22, choices=RESPUESTAS)
    pregunta2 = models.CharField(max_length=22, choices=RESPUESTAS)
    pregunta3 = models.CharField(max_length=22, choices=RESPUESTAS)
    pregunta4 = models.CharField(max_length=2, choices=SI_NO)
    justificacion4 = models.TextField()
    pregunta5 = models.CharField(max_length=2, choices=SI_NO)
    justificacion5 = models.TextField()
    Evaluador = models.ForeignKey(usuario, on_delete=models.CASCADE, related_name='evaluaciones_como_evaluador')
    Evaluado = models.ForeignKey(usuario, on_delete=models.CASCADE, related_name='evaluaciones_como_evaluado')
    Snapshot = models.ForeignKey(Snapshot, on_delete=models.CASCADE)

