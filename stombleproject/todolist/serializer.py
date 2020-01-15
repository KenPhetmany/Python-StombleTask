from . models import Todolist
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth import get_user_model
from django.db.models import Q
from rest_framework.serializers import (
    CharField,
    EmailField,
    ModelSerializer,
    ValidationError
)

User = get_user_model()


class TodolistSerializer(ModelSerializer):
    class Meta:
        model = Todolist
        fields = (
            'id',
            'title',
            'description',
            'date_created',
            'completed',
            'date_due'
        )


class UserSerializer(ModelSerializer):
    email = EmailField(label="Email")
    email2 = EmailField(write_only=True, label="Confirm Email")

    class Meta:
        model = User
        fields = [
            'username', 'email', 'email2', 'password'
        ]
        extra_kwargs = {"password": {"write_only": True},
                        'email2': {"write_only": True}}

    def validate(self, data):
        email = data['email']
        user_qs = User.objects.filter(email=email)
        if user_qs.exists():
            raise ValidationError("This user has already registered")
        return data

    def validate_email2(self, value):
        data = self.get_initial()
        email1 = data.get("email")
        email2 = value
        if email1 != email2:
            raise ValidationError("Email do not match")
        return value

    def create(self, validate_data):
        username = validate_data['username']
        password = validate_data['password']
        email = validate_data['email']
        user_obj = User(
            username=username,
            email=email
        )
        user_obj.set_password(password)
        user_obj.save()
        return validate_data


class UserLoginSerializer(ModelSerializer):
    token = CharField(read_only=True)
    username = CharField(required=False, allow_blank=True)
    email = EmailField(required=False, allow_blank=True)

    class Meta:
        model = User
        fields = [
            'username', 'email', 'password', 'token'
        ]
        extra_kwargs = {"password": {"write_only": True}}

    def validate(self, data):
        user_obj = None
        email = data.get("email", None)
        username = data.get("username", None)
        password = data["password"]
        if not email and not username:
            raise ValidationError("A username or email is required")
        user = User.objects.filter(
            Q(email=email) | Q(username=username)).distinct()
        user = user.exclude(email__isnull=True).exclude(email__iexact='')
        if user.exists() and user.count() == 1:
            user_obj = user.first()
        else:
            raise ValidationError("This username/email is not valid.")

        if user_obj:
            if not user_obj.check_password(password):
                raise ValidationError(
                    "Incorrect credentials, please try again.")
        data["token"] = "Logged in!"
        return data


class CustomTokenSerializer(ModelSerializer):
    token = CharField()
