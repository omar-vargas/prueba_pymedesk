from django.db import models


class Usuario(models.Model):
    nombre = models.CharField(max_length=100)
    celular = models.CharField(max_length=20)
    correo = models.EmailField()
    direccion = models.CharField(max_length=200)
    ciudad = models.CharField(max_length=100)


class Producto(models.Model):
    nombre = models.CharField(max_length=100)


class Pedido(models.Model):
    ESTADO_CHOICES = [
        ('pendiente', 'Pendiente'),
        ('en_ruta', 'En ruta'),
        ('entregado', 'Entregado'),
        ('cancelado', 'Cancelado'),
    ]

    ENVIO_CHOICES = [
        ('domicilio', 'Domicilio'),
        ('recoge_en_punto', 'Recoge en punto'),
    ]

    id_pedido = models.AutoField(primary_key=True)
    fecha_pedido = models.DateField(auto_now_add=True)
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES)
    pagado = models.BooleanField()
    cliente = models.ForeignKey(
        Usuario, on_delete=models.CASCADE, related_name='pedidos')
    productos = models.ManyToManyField(Producto, through='ProductoPedido')
    regla_envio = models.CharField(max_length=20, choices=ENVIO_CHOICES)
    observaciones = models.TextField()


class ProductoPedido(models.Model):
    pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.IntegerField()
