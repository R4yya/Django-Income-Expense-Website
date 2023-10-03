from django.shortcuts import render, redirect
from django.views import View
from django.http import JsonResponse
from django.contrib import messages
from django.contrib import auth
from django.contrib.auth.models import User
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import EmailMessage
from django.utils.encoding import force_bytes, force_str, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.urls import reverse

import json
from .utils import account_activation_token
from validate_email import validate_email


class RegistrationView(View):
    def get(self, request):
        return render(request, 'authentication/register.html')

    def post(self, request):
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']

        context = {
            'fieldValues': request.POST
        }

        if not User.objects.filter(username=username).exists():
            if not User.objects.filter(email=email).exists():
                if len(password) < 6:
                    messages.error(request, 'Password is too short')
                    return render(request, 'authentication/register.html', context=context)

                user = User.objects.create_user(username=username, email=email)
                user.set_password(password)
                user.is_active = False
                user.save()

                uidb64 = urlsafe_base64_encode(force_bytes(user.pk))

                domain = get_current_site(request).domain
                link = reverse('activate', kwargs={'uidb64': uidb64, 'token': account_activation_token.make_token(user)})
                activation_url = f'http://{domain}{link}'

                verification_email_subject = 'Welcome to YourExpenseManager'
                verification_email_body = f'''
                Dear {user.username},

                Thank you for choosing YourExpenseManager! We're excited to have you on board.

                To get started, please click on the link below to activate your account:
                {activation_url}

                Once your account is activated, you'll have access to all the powerful tools and features that YourExpenseManager has to offer, allowing you to effortlessly track your expenses and income.

                If you have not registered in YourExpenseManager, just ignore this message.

                If you have any questions or need assistance, simply reply to this email.

                Thank you for trusting us with your financial journey. We look forward to helping you achieve your financial goals!

                Best regards,
                The YourExpenseManager Team
                '''
                verification_email = EmailMessage(
                    verification_email_subject,
                    verification_email_body,
                    'noreply@semycolon.com',
                    [email]
                )
                verification_email.send(fail_silently=False)

                messages.success(request, 'Account successfully created')

                return render(request, 'authentication/register.html')

        return render(request, 'authentication/register.html')


class LoginView(View):
    def get(self, request):
        return render(request, 'authentication/login.html')

    def post(self, request):
        username = request.POST['username']
        password = request.POST['password']

        if username and password:
            user = auth.authenticate(username=username, password=password)
            if user:
                if user.is_active:
                    auth.login(request, user)
                    messages.success(request, f'Welcome, {user.username}, You are now logged in')
                    return redirect('expenses')

                else:
                    messages.error(request, 'Account is not activated, please check your Email')
                    return render(request, 'authentication/login.html')
            else:
                messages.error(request, 'Invalid credentials, try again')
                return render(request, 'authentication/login.html')
        else:
            messages.error(request, 'Please fill all fields')
            return render(request, 'authentication/login.html')


class LogoutView(View):
    def post(self, request):
        auth.logout(request)
        messages.success(request, 'You have been logged out')
        return redirect('login')


class VerificationView(View):
    def get(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)

            if not account_activation_token.check_token(user, token):
                return redirect('login'+'?message='+'User already activated')

            if user.is_active:
                return redirect('login')

            user.is_active = True
            user.save()

            messages.success(request, 'Account activated successfully')

            return redirect('login')

        except Exception as e:
            raise e

        return redirect('login')


class UsernameValidationView(View):
    def post(self, request):
        data = json.loads(request.body)
        username = data['username']

        if not str(username).isalnum():
            return JsonResponse({'username_error': 'Username should only contain alphanumeric characters'}, status=400)
        if User.objects.filter(username=username).exists():
            return JsonResponse({'username_error': 'Username is alreaady exists'}, status=409)
        else:
            return JsonResponse({'username_valid': True})


class EmailValidationView(View):
    def post(self, request):
        data = json.loads(request.body)
        email = data['email']

        if not validate_email(email):
            return JsonResponse({'email_error': 'E-mail is invalid'}, status=400)
        if User.objects.filter(email=email).exists():
            return JsonResponse({'email_error': 'E-mail is alreaady exists'}, status=409)
        else:
            return JsonResponse({'email_valid': True})
