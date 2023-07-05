from rest_framework import serializers
from .models import Pedido, Producto, Usuario, ProductoPedido


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['nombre', 'celular', 'correo', 'direccion', 'ciudad']


class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = ['id', 'nombre']


class PedidoSerializer(serializers.ModelSerializer):
    cliente = serializers.CharField(write_only=True)
    productos = ProductoSerializer(many=True)

    class Meta:
        model = Pedido
        fields = ['id_pedido', 'fecha_pedido', 'estado', 'pagado',
                  'cliente', 'productos', 'regla_envio', 'observaciones']

    def create(self, validated_data):

        cliente_data = validated_data.pop('cliente')
        productos_data = validated_data.pop('productos')

        # Obtener el correo del cliente
        cliente_correo = cliente_data

        # Buscar el objeto Usuario asociado al cliente por correo
        cliente = Usuario.objects.get(correo=cliente_correo)

        # Crear el objeto Pedido
        pedido = Pedido.objects.create(cliente=cliente, **validated_data)
 
        # Asociar los productos existentes al pedido
        for producto_data in productos_data:
            producto_id = producto_data['nombre']
      
            if Producto.objects.filter(nombre='no').exists():
                print(producto_id+'funciono')
                producto_existente = Producto.objects.filter(nombre='no').first()
                ProductoPedido.objects.create(pedido=pedido, producto=producto_existente,cantidad=1)
            else:
                 
                print( Producto.objects.get(id= 3).nombre)
                # Manejar el caso cuando el producto no existe
                # Puedes ignorarlo o generar un error, según tus necesidades
                pass

        return pedido



    def update(self, instance, validated_data):
        # Implementa la lógica de actualización de los campos anidados si es necesario
        # Ejemplo: actualización de cliente y productos
        cliente_data = validated_data.pop('cliente')
        productos_data = validated_data.pop('productos')

        # Obtener el objeto Usuario asociado al cliente por su correo
        cliente_correo = cliente_data.get('correo')
        cliente = Usuario.objects.get(correo=cliente_correo)

        # Actualizar el cliente asociado al pedido
        cliente.nombre = cliente_data.get('nombre', cliente.nombre)
        cliente.celular = cliente_data.get('celular', cliente.celular)
        cliente.correo = cliente_data.get('correo', cliente.correo)
        cliente.direccion = cliente_data.get('direccion', cliente.direccion)
        cliente.ciudad = cliente_data.get('ciudad', cliente.ciudad)
        cliente.save()

        # Crear o actualizar los objetos ProductoPedido asociados a los productos
        for producto_data in productos_data:
            producto_id = producto_data.get('id')
            cantidad = producto_data.get('cantidad')

            if producto_id and cantidad:
                producto = Producto.objects.get(id=producto_id)

                # Verificar si existe un ProductoPedido para este producto en el pedido
                producto_pedido, created = ProductoPedido.objects.get_or_create(pedido=instance, producto=producto,cantidad=1)

                # Actualizar la cantidad del ProductoPedido
                producto_pedido.cantidad = cantidad
                producto_pedido.save()

        # Actualizar los demás campos del Pedido
        instance.estado = validated_data.get


    def update(self, instance, validated_data):
        # Implementa la lógica de actualización de los campos anidados si es necesario
        # Ejemplo: actualización de cliente y productos
        cliente_data = validated_data.pop('cliente')
        productos_data = validated_data.pop('productos')

        # Actualizar los datos del cliente
        cliente = instance.cliente
        cliente.nombre = cliente_data.get('nombre', cliente.nombre)
        cliente.celular = cliente_data.get('celular', cliente.celular)
        cliente.correo = cliente_data.get('correo', cliente.correo)
        cliente.direccion = cliente_data.get('direccion', cliente.direccion)
        cliente.ciudad = cliente_data.get('ciudad', cliente.ciudad)
        cliente.save()

        # Actualizar los datos de los productos
        productos = instance.productos.all()
        productos_ids = [producto.id for producto in productos]

        for producto_data in productos_data:
            producto_id = producto_data.get('id')
            cantidad = producto_data.get('cantidad')

            if producto_id and cantidad:
                if producto_id in productos_ids:
                    # Actualizar la cantidad del producto existente
                    producto_pedido = ProductoPedido.objects.get(pedido=instance, producto_id=producto_id)
                    producto_pedido.cantidad = cantidad
                    producto_pedido.save()
                else:
                    # Crear un nuevo ProductoPedido
                    producto = Producto.objects.get(id=producto_id)
                    ProductoPedido.objects.create(pedido=instance, producto=producto, cantidad=cantidad)

        # Actualizar los demás campos del Pedido
        instance.estado = validated_data.get('estado', instance.estado)
        instance.pagado = validated_data.get('pagado', instance.pagado)
        instance.regla_envio = validated_data.get('regla_envio', instance.regla_envio)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)
        instance.save()

        return instance



class PedidoCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pedido
        fields = ['estado', 'pagado', 'cliente',
                  'productos', 'regla_envio', 'observaciones']


class ProductoPedidoSerializer(serializers.ModelSerializer):
    producto = ProductoSerializer()

    class Meta:
        model = ProductoPedido
        fields = ['producto', 'cantidad']


