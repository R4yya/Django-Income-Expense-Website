from django.shortcuts import render, redirect
from django.conf import settings
from django.contrib import messages
from django.contrib.auth.decorators import login_required

from .models import UserPreference
from os import path
from json import load


@login_required(login_url='/authentication/login')
def index(request):
    currency_data = []

    file_path = path.join(settings.BASE_DIR, 'currencies.json')

    with open(file_path, 'r') as json_file:
        data = load(json_file)
        for key, value in data.items():
            currency_data.append({'name': key, 'value': value})

    exists = UserPreference.objects.filter(user=request.user).exists()
    user_preferences = None

    if exists:
        user_preferences = UserPreference.objects.get(user=request.user)

    if request.method == 'GET':

        return render(request, 'preferences/index.html', {'currencies': currency_data, 'user_preferences': user_preferences})

    elif request.method == 'POST':
        currency = request.POST['currency']

        if exists:
            user_preferences.currency = currency
            user_preferences.save()
        else:
            UserPreference.objects.create(user=request.user, currency=currency)

        messages.success(request, 'Changes saved successfully')

        return render(request, 'preferences/index.html', {'currencies': currency_data, 'user_preferences': user_preferences})


@login_required(login_url='/authentication/login')
def account_preferences(request):
    context = {
        'username': request.user.username,
        'firstname': request.user.first_name,
        'lastname': request.user.last_name,
        'email': request.user.email,
        'date_joined': request.user.date_joined
    }

    return render(request, 'preferences/account.html', context)


@login_required(login_url='/authentication/login')
def change_firstname(request):
    if request.method == 'POST':
        new_firstname = request.POST.get('firstname')
        user = request.user
        user.first_name = new_firstname
        user.save()

        messages.success(request, 'Your first name has been updated successfully')

        return redirect('account')


@login_required(login_url='/authentication/login')
def change_lastname(request):
    if request.method == 'POST':
        new_lastname = request.POST.get('lastname')
        user = request.user
        user.last_name = new_lastname
        user.save()

        messages.success(request, 'Your last name has been updated successfully')

        return redirect('account')


@login_required(login_url='/authentication/login')
def delete_account(request):
    if request.method == 'POST':
        user = request.user
        user.delete()

        messages.success(request, 'Your account has been successfully deleted')

        return redirect('login')
