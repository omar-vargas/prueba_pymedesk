from rest_framework import viewsets
from django.db.models import Count,Sum
from .models import Pedido, Producto, Usuario, ProductoPedido
from .serializer import UsuarioSerializer,ProductoSerializer,PedidoSerializer, PedidoCreateSerializer,ProductoPedidoSerializer
from django.http import JsonResponse

class PedidoView(viewsets.ModelViewSet):

    serializer_class = PedidoSerializer
    queryset = Pedido.objects.all()

class ProductoView(viewsets.ModelViewSet):

    serializer_class = ProductoSerializer
    queryset = Producto.objects.all()

class UsuarioView(viewsets.ModelViewSet):

    serializer_class = UsuarioSerializer
    queryset = Usuario.objects.all()


def resumen(request):
    # Número de pedidos
    total_pedidos = Pedido.objects.count()

    # Número de clientes
    total_clientes = Usuario.objects.count()


    ciudad_mas_pedidos = Usuario.objects.annotate(num_pedidos=Count('ciudad')).first().ciudad


    # Producto más vendido
    producto_mas_vendido = ProductoPedido.objects.annotate(total_cantidad=Sum('cantidad')).order_by('-total_cantidad').first()
    producto_vendido = producto_mas_vendido.producto.nombre if producto_mas_vendido else None

    resumen = {
        'numero_pedidos': total_pedidos,
        'numero_clientes': total_clientes,
        'ciudad_con_mas_pedidos': ciudad_mas_pedidos,
        'producto_mas_vendido': producto_vendido,
    }

    return JsonResponse(resumen)