from django.apps import AppConfig


class TodolistConfig(AppConfig):
    name = 'todolist'


class UserConfig(AppConfig):
    name = 'user'


class ResetConfig(AppConfig):
    name = 'todolist'
    verbose_name = 'Todolist'

    def ready(self):
        import todolist.signals
