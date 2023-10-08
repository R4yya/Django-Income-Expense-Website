from django.urls import path
from django.views.decorators.csrf import csrf_exempt

from . import views

urlpatterns = [
    path('', views.index, name='income'),
    path('add-income', views.add_income, name='add-income'),
    path('edit-income/<int:id>', views.edit_income, name='edit-income'),
    path('delete-income/<int:id>', views.delete_income, name='delete-income'),
    path('search-income', csrf_exempt(views.search_income), name='search-income'),
    path('income-stats', views.income_stats, name='income-stats'),
    path('income-card-summary', views.income_card_summary, name='income-card-summary'),
    path('income-week-summary', views.income_week_summary, name='income-week-summary'),
    path('income-month-summary', views.income_month_summary, name='income-month-summary'),
    path('income-year-summary', views.income_year_summary, name='income-year-summary')
]
