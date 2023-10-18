from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse

from expenses.models import Category, Expense
from income.models import Source, Income
from datetime import date, timedelta
import calendar


@login_required(login_url='/authentication/login')
def index(request):
    return render(request, 'index.html')


@login_required(login_url='/authentication/login')
def expense_category_summary(request):
    def get_category(expense):
        return expense.category

    def get_value(category):
        amount = 0

        filtered_by_category = expenses.filter(category=category)

        for item in filtered_by_category:
            amount += item.amount

        return amount

    todays_date = date.today()
    first_day_of_current_month = todays_date.replace(day=1)
    last_day_of_current_month = (todays_date.replace(day=1) + timedelta(days=32)).replace(day=1) - timedelta(days=1)

    expenses = Expense.objects.filter(
        owner=request.user,
        date__gte=first_day_of_current_month,
        date__lte=last_day_of_current_month
    )

    final_rep = {}

    category_list = list(set(map(get_category, expenses)))

    for expense in expenses:
        for category in category_list:
            final_rep[category] = get_value(category)

    return JsonResponse({'expense_category_data': final_rep}, safe=False)


@login_required(login_url='/authentication/login')
def income_source_summary(request):
    def get_source(income):
        return income.source

    def get_value(source):
        amount = 0

        filtered_by_source = income.filter(source=source)

        for item in filtered_by_source:
            amount += item.amount

        return amount

    todays_date = date.today()
    first_day_of_current_month = todays_date.replace(day=1)
    last_day_of_current_month = (todays_date.replace(day=1) + timedelta(days=32)).replace(day=1) - timedelta(days=1)

    income = Income.objects.filter(
        owner=request.user,
        date__gte=first_day_of_current_month,
        date__lte=last_day_of_current_month
    )

    final_rep = {}

    source_list = list(set(map(get_source, income)))

    for item in income:
        for source in source_list:
            final_rep[source] = get_value(source)

    return JsonResponse({'income_source_data': final_rep}, safe=False)


@login_required(login_url='/authentication/login')
def comparative_stat_month(request):
    todays_date = date.today()
    first_day_of_current_month = todays_date.replace(day=1)
    last_day_of_current_month = (todays_date.replace(day=1) + timedelta(days=32)).replace(day=1) - timedelta(days=1)
    num_days = last_day_of_current_month.day

    expenses = Expense.objects.filter(
        owner=request.user,
        date__gte=first_day_of_current_month,
        date__lte=last_day_of_current_month
    )

    income = Income.objects.filter(
        owner=request.user,
        date__gte=first_day_of_current_month,
        date__lte=last_day_of_current_month
    )

    income_dict = {str(i): 0 for i in range(1, num_days + 1)}

    for item in income:
        day = str(item.date.day)
        income_dict[day] += item.amount

    expenses_dict = {str(i): 0 for i in range(1, num_days + 1)}

    for expense in expenses:
        day = str(expense.date.day)
        expenses_dict[day] += expense.amount

    final_rep = {'expenses': expenses_dict, 'income': income_dict}

    return JsonResponse({'comparative_data_month': final_rep}, safe=False)


@login_required(login_url='/authentication/login')
def comparative_stat_year(request):
    todays_date = date.today()
    first_day_of_current_year = todays_date.replace(month=1, day=1)
    last_day_of_current_year = todays_date.replace(month=12, day=31)

    expenses = Expense.objects.filter(
        owner=request.user,
        date__gte=first_day_of_current_year,
        date__lte=last_day_of_current_year
    )

    income = Income.objects.filter(
        owner=request.user,
        date__gte=first_day_of_current_year,
        date__lte=last_day_of_current_year
    )

    month_names = [calendar.month_name[i] for i in range(1, 13)]
    income_dict = {month: 0 for month in month_names}
    expenses_dict = {month: 0 for month in month_names}

    for item in income:
        month_name = calendar.month_name[item.date.month]
        income_dict[month_name] += item.amount

    for expense in expenses:
        month_name = calendar.month_name[expense.date.month]
        expenses_dict[month_name] += expense.amount

    final_rep = {'expenses': expenses_dict, 'income': income_dict}

    return JsonResponse({'comparative_data_year': final_rep}, safe=False)
