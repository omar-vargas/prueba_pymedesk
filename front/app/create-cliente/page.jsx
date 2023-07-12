"use client";


import { useState } from 'react';

const CrearCliente = () => {
  const [nombre, setNombre] = useState('');
  const [celular, setCelular] = useState('');
  const [correo, setCorreo] = useState('');
  const [direccion, setDireccion] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que todos los campos estén completos
    if (!nombre || !celular || !correo || !direccion || !ciudad) {
      setError('Por favor complete todos los campos');
      return;
    }

    // Validar el formato de correo electrónico utilizando una expresión regular
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      setError('Ingrese un correo electrónico válido');
      return;
    }

    const nuevoCliente = {
      nombre,
      celular,
      correo,
      direccion,
      ciudad,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/pedidos/api/pedidos/usuarios/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoCliente),
      });

if (response.ok) {
  setSuccessMessage('Cliente creado exitosamente');
  setErrorMessage('');
  // Realizar cualquier acción adicional después de crear el cliente
} else {
  setSuccessMessage('');
  setErrorMessage('Error al crear el cliente');
}
    } catch (error) {
      console.log('Error en la solicitud POST:', error);
    }
  };

  return (
    <div className="container">
    {successMessage && <div className="alert alert-success">{successMessage}</div>}
    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <h1 className="mt-4">Crear Cliente</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre:</label>
          <input
            type="text"
            id="nombre"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="celular" className="form-label">Celular:</label>
          <input
            type="text"
            id="celular"
            className="form-control"
            value={celular}
            onChange={(e) => setCelular(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="correo" className="form-label">Correo:</label>
          <input
            type="text"
            id="correo"
            className="form-control"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="direccion" className="form-label">Dirección:</label>
          <input
            type="text"
            id="direccion"
            className="form-control"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ciudad" className="form-label">Ciudad:</label>
          <input
            type="text"
            id="ciudad"
            className="form-control"
            value={ciudad}
            onChange={(e) => setCiudad(e.target.value)}
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">Crear Cliente</button>
      </form>
    </div>
  );
};

export default CrearCliente;
