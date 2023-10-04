from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.core.paginator import Paginator
from django.http import JsonResponse

from userpreferences.models import UserPreference
from .models import Source, Income
from json import loads


@login_required(login_url='/authentication/login')
def index(request):
    income = Income.objects.filter(owner=request.user)
    paginator = Paginator(income, 5)
    page_number = request.GET.get('page')
    page_obj = Paginator.get_page(paginator, page_number)
    currency = UserPreference.objects.get(user=request.user).currency
    context = {
        'income': income,
        'page_obj': page_obj,
        'currency': currency
    }

    return render(request, 'income/index.html', context)


def search_income(request):
    if request.method == 'POST':
        search_string = loads(request.body).get('searchText')

        income = Income.objects.filter(
            amount__istartswith=search_string, owner=request.user) | Income.objects.filter(
            date__istartswith=search_string, owner=request.user) | Income.objects.filter(
            description__icontains=search_string, owner=request.user) | Income.objects.filter(
            source__icontains=search_string, owner=request.user)

        data = income.values()

        return JsonResponse(list(data), safe=False)


@login_required(login_url='/authentication/login')
def add_income(request):
    sources = Source.objects.all()
    context = {
        'sources': sources,
        'values': request.POST
    }

    if request.method == 'GET':
        return render(request, 'income/add-income.html', context)

    elif request.method == 'POST':
        amount = request.POST['amount']

        if not amount:
            messages.error(request, 'Amount is required')
            return render(request, 'income/add-income.html', context)

        source = request.POST['source']
        description = request.POST['description']
        date = request.POST['income_date']

        if not description:
            messages.error(request, 'Description is required')
            return render(request, 'income/add-income.html', context)

        if not date:
            messages.error(request, 'Date is required')
            return render(request, 'income/add-income.html', context)

        Income.objects.create(
            owner=request.user,
            amount=amount,
            date=date,
            source=source,
            description=description
        )

        messages.success(request, 'Income saved successfully')

        return redirect('income')


@login_required(login_url='/authentication/login')
def edit_income(request, id):
    sources = Source.objects.all()
    income = Income.objects.get(pk=id)
    context = {
        'income': income,
        'values': income,
        'sources': sources
    }

    if request.method == 'GET':
        return render(request, 'income/edit-income.html', context)

    elif request.method == 'POST':
        amount = request.POST['amount']

        if not amount:
            messages.error(request, 'Amount is required')
            return render(request, 'income/edit-income.html', context)

        source = request.POST['source']
        description = request.POST['description']
        date = request.POST['income_date']

        if not description:
            messages.error(request, 'Description is required')
            return render(request, 'income/edit-income.html', context)

        if not date:
            messages.error(request, 'Date is required')
            return render(request, 'income/edit-income.html', context)

        income.owner = request.user
        income.amount = amount
        income.date = date
        income.source = source
        income.description = description

        income.save()

        messages.success(request, 'Income updated successfully')

        return redirect('income')


def delete_income(request, id):
    income = Income.objects.get(pk=id)
    income.delete()

    messages.success(request, 'Income removed successfully')

    return redirect('income')
