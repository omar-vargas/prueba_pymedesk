from django.contrib import admin
from .models import Pedido,Producto,Usuario,ProductoPedido

admin.site.register(Pedido)
admin.site.register(Producto)
admin.site.register(Usuario)
admin.site.register(ProductoPedido)


# Register your models here.
