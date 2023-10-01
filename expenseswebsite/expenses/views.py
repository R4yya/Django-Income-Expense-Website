from django.shortcuts import render
from django.contrib.auth.decorators import login_required

from .models import Category, Expense


@login_required(login_url='/authentication/login')
def index(request):
    categories = Category.objects.all()
    return render(request, 'expenses/index.html')


def add_expense(request):
    categories = Category.objects.all()
    context = {
        'categories': categories
    }
    return render(request, 'expenses/add-expense.html', context)
