from django.urls import path, include
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from pedidos import views


router = routers.DefaultRouter()
router.register(r'pedidos',views.PedidoView,'pedidos')
router.register(r'productos',views.ProductoView,'producto')
router.register(r'usuarios',views.UsuarioView,'usuario')


urlpatterns = [
    path("api/pedidos/", include(router.urls)),
    path('docs/', include_docs_urls(title = "Pedidos Api")),
    path('resumen/', views.resumen, name='resumen')
      
]