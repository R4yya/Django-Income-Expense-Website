from django.shortcuts import render
from django.views import View
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib import messages

import json
from validate_email import validate_email


class RegistrationView(View):
    def __init__(self):
        pass

    def get(self, request):
        return render(request, 'authentication/register.html')

    def post(self, request):
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']

        context = {
            'fieldValues': request.POST
        }

        if not User.objects.filter(username=username).exists():
            if not User.objects.filter(email=email).exists():
                if len(password) < 6:
                    messages.error(request, 'Password is too short')
                    return render(request, 'authentication/register.html', context=context)

                user = User.objects.create_user(username=username, email=email)
                user.set_password(password)
                user.save()

                messages.success(request, 'Account successfully created')

                return render(request, 'authentication/register.html')

        return render(request, 'authentication/register.html')


class UsernameValidationView(View):
    def __init__(self):
        pass

    def post(self, request):
        data = json.loads(request.body)
        username = data['username']

        if not str(username).isalnum():
            return JsonResponse({'username_error': 'Username should only contain alphanumeric characters'}, status=400)
        if User.objects.filter(username=username).exists():
            return JsonResponse({'username_error': 'Username is alreaady exists'}, status=409)
        else:
            return JsonResponse({'username_valid': True})


class EmailValidationView(View):
    def __init__(self):
        pass

    def post(self, request):
        data = json.loads(request.body)
        email = data['email']

        if not validate_email(email):
            return JsonResponse({'email_error': 'E-mail is invalid'}, status=400)
        if User.objects.filter(email=email).exists():
            return JsonResponse({'email_error': 'E-mail is alreaady exists'}, status=409)
        else:
            return JsonResponse({'email_valid': True})
