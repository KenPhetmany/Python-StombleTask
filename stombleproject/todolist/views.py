from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from . models import Todolist
from . serializer import TodolistSerializer
# Create your views here.


def index(request):
    return HttpResponse("hello world")


class TodolistView(viewsets.ModelViewSet):
    serializer_class = TodolistSerializer
    queryset = Todolist.objects.all()
