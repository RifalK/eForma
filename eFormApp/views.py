from django.shortcuts import render, redirect
from .models import *
from django.http import HttpResponse
from django.template import loader
from django.http import JsonResponse
import json
from datetime import datetime
from .utils import commandeAnonyme, data_cookie, panier_cookie
from django.contrib.auth.hashers import make_password
from django.contrib import auth, messages
from django.core.mail import EmailMessage
from django.core.mail import send_mail
from django.conf import settings
#from django.conf import settings
from django.contrib.auth.decorators import login_required



def handling_404(request, exception):
      return render(request, '404.html', {})



def login_form(request):
     
	return render(request, 'auth/login.html')


def loginView(request):
	if request.method == 'POST':
		username = request.POST['username']
		email = request.POST['email']
		password = request.POST['password']
		password = make_password(password)

		a = User(username=username, email=email, password=password)
		a.save()
		messages.success(request, 'Account was created successfully')
		return redirect('shop:shop')
	else:
	    messages.error(request, 'Login fail, try again later')
	    return redirect('shop:logform')


@login_required
def galery(request):
     
	return render(request, 'contact-us/galery.html')


@login_required
def contact_form(request):
     
	return render(request, 'contact-us/contact.html')


def shop(request, *args, **kwargs):
    """ vue principale """

    produits = Produit.objects.all()
    data = data_cookie(request)
    nombre_article = data['nombre_article']

    context = {
        'produits':produits,
        'nombre_article': nombre_article
    }

    return render(request, 'shop/index.html', context)


def panier(request, *args, **kwargs):
    """ panier """
    
    data = data_cookie(request)
    articles = data['articles']
    commande = data['commande']
    nombre_article = data['nombre_article']

    context = {
        'articles':articles,
        'commande':commande,
        'nombre_article':nombre_article
    }

    return render(request, 'shop/panier.html', context)


@login_required
def commande(request, *args, **kwargs):
    """ Commande """

    data = data_cookie(request)
    articles = data['articles']
    commande = data['commande']
    nombre_article = data['nombre_article']

    context = {
        'articles':articles,
        'commande':commande,
        'nombre_article': nombre_article
    }

    return render(request, 'shop/commande.html', context)    



@login_required
def update_article(request, *args, **kwargs):

    data = json.loads(request.body)

    produit_id = data['produit_id']

    action = data['action']

    client = request.user.client

    produit = Produit.objects.get(id=produit_id)

    commande, created = Commande.objects.get_or_create(client=client, complete=False)

    commande_article, created = CommandeArticle.objects.get_or_create(commande=commande, produit=produit)

    if action == 'add':

        commande_article.quantite += 1

    if action == 'remove':

        commande_article.quantite -= 1

    commande_article.save()

    if  commande_article.quantite <= 0:

        commande_article.delete()        

    return JsonResponse("Article ajouté", safe=False)



@login_required
def traitementCommande(request, *args, **kwargs):
    """ traitement,  validation de la com;ande  et verification de l'integrite des donnees(detection de fraude)"""

    STATUS_TRANSACTION = ['ACCEPTED', 'COMPLETED', 'SUCCESS']
    
    transaction_id = datetime.now().timestamp()

    data = json.loads(request.body)

    print(data)

    if request.user.is_authenticated:

        client = request.user.client

        commande, created = Commande.objects.get_or_create(client=client, complete=False)


    else:
        client, commande = commandeAnonyme(request, data)

    total = float(data['form']['total'])

    commande.transaction_id = data['payment_info']['transaction_id']

    commande.total_trans = total

    if commande.get_panier_total == total:

        commande.complete = True
        commande.status = data['payment_info']['status']

    else:
        commande.status = "REFUSED"
        commande.save()
        
        return JsonResponse("Attention!!! Traitement Refuse Fraude detecte!", safe=False)

    commande.save()    
    
    if not commande.status in STATUS_TRANSACTION:
        return JsonResponse("Désolé, le paiement a échoué, veuillez réessayer")    

  

    if commande.produit_physique:

        AddressChipping.objects.create(
            client=client,
            commande=commande,
            addresse = data['shipping']['address'],
            ville=data['shipping']['city'],
            zipcode=data['shipping']['zipcode']
        )



    return JsonResponse("Votre paiement a été effectué avec succès, vous recevrez votre commande dans un instant !", safe=False)