# Generated by Django 4.2.5 on 2023-09-25 18:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='equipo',
            fields=[
                ('idEquipo', models.IntegerField(primary_key=True, serialize=False)),
                ('Nombre_equipo', models.CharField(blank=None, max_length=30)),
                ('Lider', models.IntegerField(default=None, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='proyecto',
            fields=[
                ('idProyecto', models.IntegerField(primary_key=True, serialize=False)),
                ('Nombre', models.CharField(blank=None, max_length=30)),
                ('Descripcion', models.TextField(blank=None)),
                ('FechaLimite', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='usuario',
            fields=[
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('idUsuario', models.IntegerField(primary_key=True, serialize=False, unique=True)),
                ('Nombre', models.CharField(blank=None, max_length=30)),
                ('email', models.EmailField(max_length=80, unique=True)),
                ('Cargo', models.CharField(max_length=50)),
                ('Usuario', models.CharField(max_length=50)),
                ('password', models.CharField(max_length=100)),
                ('Fk_equipo_asignado', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='UserManagerAPI.equipo')),
                ('Fk_proyecto_asignado', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='UserManagerAPI.proyecto')),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.AddField(
            model_name='equipo',
            name='Fk_proyecto_asignado',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='UserManagerAPI.proyecto'),
        ),
    ]
