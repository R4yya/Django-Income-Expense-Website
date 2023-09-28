from django.shortcuts import render
from django.views import View
from django.http import JsonResponse
from django.contrib.auth.models import User

import json


class RegistrationView(View):
    def __init__(self):
        pass

    def get(self, request):
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
