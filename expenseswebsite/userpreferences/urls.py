from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='preferences'),
    path('account', views.account_preferences, name='account'),
    path('change_firstname', views.change_firstname, name='change_firstname'),
    path('change_lastname', views.change_lastname, name='change_lastname'),
    path('delete_account', views.delete_account, name='delete_account')
]
