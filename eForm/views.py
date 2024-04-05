"""
from django.shortcuts import render, redirect
from django.core.mail import send_mail
from eFormApp.forms import ContactForm
from django.conf import settings


def contact(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            name = form.cleaned_data['name']
            email = form.cleaned_data['email']
            phone = form.cleaned_data['phone']
            message = form.cleaned_data['message']


           send_mail(
               'Contact Form Submission from {}'.format(name),
               email,
               phone,
               message,
               'form-response@example.com', # Send from (your website)
               ['coatchformateur79@gmail.com'], # Send to (your admin email)
               [],
               reply_to=[email] # Email from the form to get back to
           ).send()

             return redirect('success')
    else:
        form = ContactForm()
    return render(request, 'contact.html', {'form': form})

"""