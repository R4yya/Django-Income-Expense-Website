from django.urls import path
from django.views.decorators.csrf import csrf_exempt

from . import views

urlpatterns = [
    path('', views.index, name='expenses'),
    path('add-expense', views.add_expense, name='add-expense'),
    path('edit-expense/<int:id>', views.edit_expense, name='edit-expense'),
    path('delete-expense/<int:id>', views.delete_expense, name='delete-expense'),
    path('search-expense', csrf_exempt(views.search_expenses), name='search-expense'),
    path('expense-stats', views.expense_stats, name='expense-stats'),
    path('expense-card-summary', views.expense_card_summary, name='expense-card-summary'),
    path('expense-week-summary', views.expense_week_summary, name='expense-week-summary'),
    path('expense-month-summary', views.expense_month_summary, name='expense-month-summary'),
    path('expense-year-summary', views.expense_year_summary, name='expense-year-summary'),
    path('export-expenses-pdf', views.export_expenses_pdf, name='export-expenses-pdf'),
    path('export-expenses-excel', views.export_expenses_excel, name='export-expenses-excel'),
    path('export-expenses-csv', views.export_expenses_csv, name='export-expenses-csv'),
    path('export-expenses', views.export_expenses, name='export-expenses')
]
