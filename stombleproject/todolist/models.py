from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User


# Create your models here.


class Todolist(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=255)
    date_created = models.DateTimeField(default=timezone.now)
    date_due = models.CharField(max_length=25)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title
