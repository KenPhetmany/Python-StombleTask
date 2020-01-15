"""stombleapp URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
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
from django.contrib import admin
from django.conf.urls import url, include
from django.urls import path, include
from rest_framework import routers
from todolist import views

router = routers.DefaultRouter()
router.register(r'todolists', views.TodolistView, 'todo')
router.register(r'users', views.UserView, 'user')


urlpatterns = [
    path('', views.home, name="home"),
    path('signup/', views.signup, name='signup'),
    path("accounts/", include("django.contrib.auth.urls")),
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    url(r'^api/password_reset/',
        include('django_rest_passwordreset.urls', namespace='password_reset')),
    path('api/login/', views.UserLoginAPIView.as_view(), name='login'),



]
