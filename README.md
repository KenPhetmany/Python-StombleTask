# StombleTask

## How to run

### Backend (stombleproject)

1. `cd stombleproject`
1. `pip install pipenv`
1. `pip envshell`
1. `pipenv install django`
1. `pipenv install djangorestframework django-cors-headers`
1. `python manage.py migrate`
1. `python manage.py createsuperuser`
1. `python manage.py runserver`
1. Confirm server is running on: `localhost:8000`

### Frontend (stombleappfrontend)
Prereqs:
- install yarn

1. `cd stombleappfrontend`
1. `yarn install --frozen-lock`
1. `yarn start`
