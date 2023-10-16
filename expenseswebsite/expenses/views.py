from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.core.paginator import Paginator
from django.http import JsonResponse

from userpreferences.models import UserPreference
from .models import Category, Expense
from json import loads
from datetime import date, timedelta
import calendar


@login_required(login_url='/authentication/login')
def index(request):
    expenses = Expense.objects.filter(owner=request.user)
    paginator = Paginator(expenses, 12)
    page_number = request.GET.get('page')
    page_obj = Paginator.get_page(paginator, page_number)
    currency = UserPreference.objects.get(user=request.user).currency
    context = {
        'expenses': expenses,
        'page_obj': page_obj,
        'currency': currency
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


@login_required(login_url='/authentication/login')
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

        if not amount:
            messages.error(request, 'Amount is required')
            return render(request, 'expenses/add-expense.html', context)

        category = request.POST['category']
        description = request.POST['description']
        date = request.POST['expense_date']

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

        messages.success(request, 'Expense saved successfully')

        return redirect('expenses')


@login_required(login_url='/authentication/login')
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

        if not amount:
            messages.error(request, 'Amount is required')
            return render(request, 'expenses/edit-expense.html', context)

        category = request.POST['category']
        description = request.POST['description']
        date = request.POST['expense_date']

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

        messages.success(request, 'Expense updated successfully')

        return redirect('expenses')


def delete_expense(request, id):
    expense = Expense.objects.get(pk=id)
    expense.delete()

    messages.success(request, 'Expense removed successfully')

    return redirect('expenses')


def expense_week_summary(request):
    todays_date = date.today()
    current_week_start = todays_date - timedelta(days=todays_date.weekday())
    current_week_end = current_week_start + timedelta(days=6)

    expenses = Expense.objects.filter(
        owner=request.user,
        date__gte=current_week_start,
        date__lte=current_week_end
    )

    days_of_week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    final_rep = {day: 0 for day in days_of_week}

    for expense in expenses:
        day_of_week = expense.date.strftime('%a')
        final_rep[day_of_week] += expense.amount

    return JsonResponse({'expense_week_data': final_rep}, safe=False)


def expense_month_summary(request):
    todays_date = date.today()
    first_day_of_current_month = todays_date.replace(day=1)
    last_day_of_current_month = (todays_date.replace(day=1) + timedelta(days=32)).replace(day=1) - timedelta(days=1)

    expenses = Expense.objects.filter(
        owner=request.user,
        date__gte=first_day_of_current_month,
        date__lte=last_day_of_current_month
    )

    num_days = last_day_of_current_month.day
    final_rep = {str(i): 0 for i in range(1, num_days + 1)}

    for expense in expenses:
        day = str(expense.date.day)
        final_rep[day] += expense.amount

    return JsonResponse({'expense_month_data': final_rep}, safe=False)


def expense_year_summary(request):
    todays_date = date.today()
    first_day_of_current_year = todays_date.replace(month=1, day=1)
    last_day_of_current_year = todays_date.replace(month=12, day=31)

    expenses = Expense.objects.filter(
        owner=request.user,
        date__gte=first_day_of_current_year,
        date__lte=last_day_of_current_year
    )

    month_names = [calendar.month_name[i] for i in range(1, 13)]
    final_rep = {month: 0 for month in month_names}

    for expense in expenses:
        month_name = calendar.month_name[expense.date.month]
        final_rep[month_name] += expense.amount

    return JsonResponse({'expense_year_data': final_rep}, safe=False)


def expense_card_summary(request):
    def get_value(expenses):
        count = 0
        amount = 0

        for expense in expenses:
            amount += expense.amount
            count += 1

        return {'count': count, 'amount': amount}

    todays_date = date.today()

    current_week_start = todays_date - timedelta(days=todays_date.weekday())
    current_week_end = current_week_start + timedelta(days=6)

    first_day_of_current_month = todays_date.replace(day=1)
    last_day_of_current_month = (todays_date.replace(day=1) + timedelta(days=32)).replace(day=1) - timedelta(days=1)

    first_day_of_current_year = todays_date.replace(month=1, day=1)
    last_day_of_current_year = todays_date.replace(month=12, day=31)

    all_expenses = Expense.objects.filter(
        owner=request.user,
        date__gte=first_day_of_current_year,
        date__lte=last_day_of_current_year
    )

    today_expenses = all_expenses.filter(
        date=todays_date
    )

    week_expenses = all_expenses.filter(
        date__gte=current_week_start,
        date__lte=current_week_end
    )

    month_expenses = all_expenses.filter(
        date__gte=first_day_of_current_month,
        date__lte=last_day_of_current_month
    )

    final_rep = {
        'today': get_value(today_expenses),
        'week': get_value(week_expenses),
        'month': get_value(month_expenses),
        'year': get_value(all_expenses),
    }

    return JsonResponse({'expense_card_data': final_rep}, safe=False)


@login_required(login_url='/authentication/login')
def expense_stats(request):
    return render(request, 'expenses/expense-stats.html')
