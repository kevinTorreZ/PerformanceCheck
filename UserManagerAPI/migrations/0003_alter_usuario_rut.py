# Generated by Django 4.2.5 on 2023-09-26 04:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('UserManagerAPI', '0002_alter_usuario_rut'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuario',
            name='Rut',
            field=models.CharField(max_length=10),
        ),
    ]