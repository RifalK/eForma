from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
#from eForm.views import contact, success

from django.contrib.staticfiles.urls import staticfiles_urlpatterns

urlpatterns = [
    path('Connait_toi_toimeme/', admin.site.urls),
    path('', include('eFormApp.urls')),
    #path('contact/', contact, name='contact'),
    #path('success/', success, name='success'),
]

handler404 = 'eFormApp.views.handling_404'

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += staticfiles_urlpatterns()
