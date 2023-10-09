from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='dashboard'),
    path('expense-category-summary', views.expense_category_summary, name='expense-category-summary'),
    path('income-source-summary', views.income_source_summary, name='income-source-summary'),
    path('comparative-stat', views.comparative_stat, name='comparative-stat')
]
