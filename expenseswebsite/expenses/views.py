from django.shortcuts import render
from django.contrib.auth.decorators import login_required


@login_required(login_url='/authentication/login')
def index(request):
    return render(request, 'expenses/index.html')


def add_expense(request):
    return render(request, 'expenses/add_expense.html')
