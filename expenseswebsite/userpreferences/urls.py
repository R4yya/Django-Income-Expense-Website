from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='preferences'),
    path('account', views.account_preferences, name='account')
]
