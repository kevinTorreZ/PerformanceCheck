"""
URL configuration for PerformanceCheck project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework.routers import DefaultRouter
from UserManagerAPI.views import UserViewSet,user_detail,LoginView,RegisterView,ObtenerEquipos,obtenerProyecto,obtenerTodosLosProyectos,ObtenerEquipo,AllSnapshotView,EvaluacionViewSet,SnapshotView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'evaluaciones', EvaluacionViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api/login', LoginView.as_view()),
    path('api/users/<int:user_id>/', user_detail),
    path('api/proyectos', obtenerTodosLosProyectos.as_view()),
    path('api/proyecto/<int:id_equipo>/', obtenerProyecto.as_view()),
    path('api/register', RegisterView.as_view()),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/equipos/',ObtenerEquipos.as_view()),
    path('api/Snapshot/',AllSnapshotView.as_view()),
    path('api/Snapshot/<int:id_snap>/',SnapshotView.as_view()),
    path('api/equipo/<int:id_equipo>/',ObtenerEquipo.as_view()),
    path('api/docs/', include_docs_urls())
]

