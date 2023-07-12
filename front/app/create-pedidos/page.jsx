"use client";
import { useState } from 'react';

const createPedidos = () => {
  
    const [formData, setFormData] = useState({
    fecha_pedido: '',
    estado: '',
    pagado: false,
    cliente: '',
    productos: [],
    regla_envio: '',
    observaciones: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Construir el objeto de solicitud
    const requestData = {
      fecha_pedido: formData.fecha_pedido,
      estado: formData.estado,
      pagado: formData.pagado,
      cliente: formData.cliente,
      productos: formData.productos,
      regla_envio: formData.regla_envio,
      observaciones: formData.observaciones
    };

    // Enviar la solicitud POST al servidor
    fetch('http://127.0.0.1:8000/pedidos/api/pedidos/pedidos/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })
      .then(response => response.json())
      .then(data => {
        // Manejar la respuesta del servidor
        console.log(data);
      })
      .catch(error => {
        // Manejar errores
        console.error('Error:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleProductChange = (e, index) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      const newProducts = [...prevFormData.productos];
      newProducts[index][name] = value;
      return {
        ...prevFormData,
        productos: newProducts
      };
    });
  };

  const handleAddProduct = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      productos: [
        ...prevFormData.productos,
        {
          id: 0,
          nombre: ''
        }
      ]
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-5">
      <h1>Formulario de Pedido</h1>

      <div className="mb-3">
        <label className="form-label">Fecha Pedido:</label>
        <input
          type="date"
          className="form-control"
          name="fecha_pedido"
          value={formData.fecha_pedido}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Estado:</label>
        <input
          type="text"
          className="form-control"
          name="estado"
          value={formData.estado}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-check-label">Pagado:</label>
        <input
          type="checkbox"
          className="form-check-input"
          name="pagado"
          checked={formData.pagado}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Cliente:</label>
        <input
          type="email"
          className="form-control"
          name="cliente"
          value={formData.cliente}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Productos:</label>
        {formData.productos.map((producto, index) => (
          <div className="row mb-3" key={index}>
            <div className="col">
              <input
                type="text"
                className="form-control"
                name="id"
                placeholder="ID"
                value={producto.id}
                onChange={(e) => handleProductChange(e, index)}
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                name="nombre"
                placeholder="Nombre"
                value={producto.nombre}
                onChange={(e) => handleProductChange(e, index)}
              />
            </div>
          </div>
        ))}
        <button type="button" className="btn btn-primary" onClick={handleAddProduct}>
          Agregar Producto
        </button>
      </div>

      <div className="mb-3">
        <label className="form-label">Regla de Envío:</label>
        <input
          type="text"
          className="form-control"
          name="regla_envio"
          value={formData.regla_envio}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Observaciones:</label>
        <textarea
          className="form-control"
          name="observaciones"
          value={formData.observaciones}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-primary">Enviar</button>
    </form>
  );
}

export default createPedidos