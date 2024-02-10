import unittest
from django.test import TestCase, Client
from django.urls import reverse
from .models import Expense, Category
from django.contrib.auth.models import User
from userpreferences.models import UserPreference


class ModelTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='test_user', password='test_password')
        self.category = Category.objects.create(name='Test Category')
        self.expense = Expense.objects.create(amount=100.0, description='Test Expense', owner=self.user, category=self.category)

    def test_create_object(self):
        expense_count = Expense.objects.count()
        self.assertEqual(expense_count, 1)

    def test_string_representation(self):
        self.assertEqual(str(self.expense), 'Test Category')

    def test_save_object(self):
        new_expense = Expense.objects.create(amount=50.0, description='New Expense', owner=self.user, category=self.category)
        expense_count = Expense.objects.count()
        self.assertEqual(expense_count, 2)

    def test_delete_object(self):
        self.expense.delete()
        expense_count = Expense.objects.count()
        self.assertEqual(expense_count, 0)

    def test_relationships(self):
        expense = Expense.objects.create(amount=100.0, description='Test Expense', owner=self.user, category=self.category)
        self.assertEqual(expense.category, self.category)
        self.assertEqual(expense.owner, self.user)

    def test_custom_query(self):
        expenses_count = Expense.objects.filter(owner=self.user).count()
        self.assertEqual(expenses_count, 1)


class TemplateTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(username='test_user', password='test_password')
        UserPreference.objects.create(user=self.user, currency='USD')
        self.client.login(username='test_user', password='test_password')
        self.category = Category.objects.create(name='Test Category')
        self.expense = Expense.objects.create(amount=100.0, description='Test Expense', owner=self.user, category=self.category)

    def test_index_template(self):
        response = self.client.get(reverse('expenses'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'expenses/index.html')

    def test_add_expense_template(self):
        response = self.client.get(reverse('add-expense'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'expenses/add-expense.html')

    def test_edit_expense_template(self):
        response = self.client.get(reverse('edit-expense', args=[self.expense.id]))
        self.assertEqual(response.status_code, 200)

    def test_delete_expense_template(self):
        response = self.client.get(reverse('delete-expense', args=[self.expense.id]))
        self.assertEqual(response.status_code, 302)

    def test_export_expenses_pdf_template(self):
        response = self.client.get(reverse('export-expenses-pdf'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get('Content-Type'), 'application/pdf')
        self.assertTrue(response.has_header('Content-Disposition'))
        self.assertIn('attachment; filename=', response.get('Content-Disposition'))

    def test_export_expenses_excel(self):
        response = self.client.get(reverse('export-expenses-excel'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get('Content-Type'), 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        self.assertTrue(response.has_header('Content-Disposition'))
        self.assertIn('attachment; filename=', response.get('Content-Disposition'))

    def test_export_expenses_csv(self):
        response = self.client.get(reverse('export-expenses-csv'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get('Content-Type'), 'text/csv')
        self.assertTrue(response.has_header('Content-Disposition'))
        self.assertIn('attachment; filename=', response.get('Content-Disposition'))


if __name__ == '__main__':
    unittest.main()
