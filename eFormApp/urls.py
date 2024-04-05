from django.urls import path 
from . import views

app_name = "shop"

urlpatterns = [ 
    path('', views.shop, name='shop'),

    path('logform/', views.login_form, name='logform'),
    
    path('login/', views.loginView, name='login'),

    path('galery/', views.galery, name='galery'),

    path('contact_form/', views.contact_form, name='contact_form'),

    #path('contact/', views.contactView, name='contact'),

    path('panier/', views.panier, name='panier'),
    
    path('commande/', views.commande, name='commande'),

    path('update_article/', views.update_article, name='update_article'),

    path('traitement-commande/', views.traitementCommande, name="traitement_commande")
]