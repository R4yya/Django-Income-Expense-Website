from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages

from .models import Category, Expense


@login_required(login_url='/authentication/login')
def index(request):
    categories = Category.objects.all()
    expenses = Expense.objects.filter(owner=request.user)
    context = {
        'expenses': expenses
    }

    return render(request, 'expenses/index.html', context)


def add_expense(request):
    categories = Category.objects.all()
    context = {
        'categories': categories,
        'values': request.POST
    }

    if request.method == 'GET':
        return render(request, 'expenses/add-expense.html', context)

    if request.method == 'POST':
        amount = request.POST['amount']
        description = request.POST['description']
        date = request.POST['expense_date']
        category = request.POST['category']

        if not amount:
            messages.error(request, 'Amount is required')
            return render(request, 'expenses/add-expense.html', context)

        
        if not description:
            messages.error(request, 'Description is required')
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
