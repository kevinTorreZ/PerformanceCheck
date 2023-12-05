# Generated by Django 4.2.5 on 2023-12-04 19:19

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('UserManagerAPI', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Evaluacion',
            fields=[
                ('idEvaluacion', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('pregunta1', models.CharField(choices=[('totalmenteEnDesacuerdo', 'Totalmente en desacuerdo'), ('enDesacuerdo', 'En desacuerdo'), ('neutral', 'Neutral'), ('deAcuerdo', 'De acuerdo'), ('totalmenteDeAcuerdo', 'Totalmente de acuerdo')], max_length=22)),
                ('pregunta2', models.CharField(choices=[('totalmenteEnDesacuerdo', 'Totalmente en desacuerdo'), ('enDesacuerdo', 'En desacuerdo'), ('neutral', 'Neutral'), ('deAcuerdo', 'De acuerdo'), ('totalmenteDeAcuerdo', 'Totalmente de acuerdo')], max_length=22)),
                ('pregunta3', models.CharField(choices=[('totalmenteEnDesacuerdo', 'Totalmente en desacuerdo'), ('enDesacuerdo', 'En desacuerdo'), ('neutral', 'Neutral'), ('deAcuerdo', 'De acuerdo'), ('totalmenteDeAcuerdo', 'Totalmente de acuerdo')], max_length=22)),
                ('pregunta4', models.CharField(choices=[('si', 'Sí'), ('no', 'No')], max_length=2)),
                ('justificacion4', models.TextField()),
                ('pregunta5', models.CharField(choices=[('si', 'Sí'), ('no', 'No')], max_length=2)),
                ('justificacion5', models.TextField()),
                ('Evaluado', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='evaluaciones_como_evaluado', to=settings.AUTH_USER_MODEL)),
                ('Evaluador', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='evaluaciones_como_evaluador', to=settings.AUTH_USER_MODEL)),
                ('Snapshot', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='UserManagerAPI.snapshot')),
            ],
        ),
    ]
