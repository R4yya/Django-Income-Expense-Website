from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.core.paginator import Paginator
from django.http import JsonResponse

from .models import Category, Expense
from json import loads


@login_required(login_url='/authentication/login')
def index(request):
    categories = Category.objects.all()
    expenses = Expense.objects.filter(owner=request.user)
    paginator = Paginator(expenses, 5)
    page_number = request.GET.get('page')
    page_obj = Paginator.get_page(paginator, page_number)
    context = {
        'expenses': expenses,
        'page_obj': page_obj
    }

    return render(request, 'expenses/index.html', context)


def search_expenses(request):
    if request.method == 'POST':
        search_string = loads(request.body).get('searchText')

        expenses = Expense.objects.filter(
            amount__istartswith=search_string, owner=request.user) | Expense.objects.filter(
            date__istartswith=search_string, owner=request.user) | Expense.objects.filter(
            description__icontains=search_string, owner=request.user) | Expense.objects.filter(
            category__icontains=search_string, owner=request.user)

        data = expenses.values()

        return JsonResponse(list(data), safe=False)


def add_expense(request):
    categories = Category.objects.all()
    context = {
        'categories': categories,
        'values': request.POST
    }

    if request.method == 'GET':
        return render(request, 'expenses/add-expense.html', context)

    elif request.method == 'POST':
        amount = request.POST['amount']
        category = request.POST['category']
        description = request.POST['description']
        date = request.POST['expense_date']

        if not amount:
            messages.error(request, 'Amount is required')
            return render(request, 'expenses/add-expense.html', context)

        if not description:
            messages.error(request, 'Description is required')
            return render(request, 'expenses/add-expense.html', context)

        if not date:
            messages.error(request, 'Date is required')
            return render(request, 'expenses/add-expense.html', context)

        Expense.objects.create(
            owner=request.user,
            amount=amount,
            date=date,
            category=category,
            description=description
        )

        messages.success(request, 'Expense saved saccessfully')

        return redirect('expenses')


def edit_expense(request, id):
    categories = Category.objects.all()
    expense = Expense.objects.get(pk=id)
    context = {
        'expense': expense,
        'values': expense,
        'categories': categories
    }

    if request.method == 'GET':
        return render(request, 'expenses/edit-expense.html', context)

    elif request.method == 'POST':
        amount = request.POST['amount']
        category = request.POST['category']
        description = request.POST['description']
        date = request.POST['expense_date']

        if not amount:
            messages.error(request, 'Amount is required')
            return render(request, 'expenses/edit-expense.html', context)

        if not description:
            messages.error(request, 'Description is required')
            return render(request, 'expenses/edit-expense.html', context)

        if not date:
            messages.error(request, 'Date is required')
            return render(request, 'expenses/edit-expense.html', context)

        expense.owner = request.user
        expense.amount = amount
        expense.date = date
        expense.category = category
        expense.description = description

        expense.save()

        messages.success(request, 'Expense updated saccessfully')

        return redirect('expenses')


def delete_expense(request, id):
    expense = Expense.objects.get(pk=id)
    expense.delete()

    messages.success(request, 'Expense removed')

    return redirect('expenses')
