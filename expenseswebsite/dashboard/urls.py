from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='dashboard'),
    path('dahsboard-expense-category-summary', views.expense_category_summary, name='dahsboard-expense-category-summary'),
    path('dahsboard-income-source-summary', views.income_source_summary, name='dahsboard-income-source-summary'),
    path('comparative-stat-month', views.comparative_stat_month, name='comparative-stat-month'),
    path('comparative-stat-year', views.comparative_stat_year, name='comparative-stat-year')
]
