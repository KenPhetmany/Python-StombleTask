from django.contrib import admin
from . models import (Todolist)


class Todoadmin(admin.ModelAdmin):
    list_diplay = ('title', 'desc', 'completed')


# Register your models here.
admin.site.register(Todolist, Todoadmin)
