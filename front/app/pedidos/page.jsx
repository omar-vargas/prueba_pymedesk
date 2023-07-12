
"use client";
import React, { useState, useEffect } from "react";










const Pedidos = () => {
  const [filtroPedido, setFiltroPedido] = useState("");
  const [pedidos, setPedido] = useState([]);
  const [nuevoEstado, setNuevoEstado] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e, pedidoId, pedidoActual) => {
    e.preventDefault();

    // Crear el objeto de datos para la solicitud PUT
    const datosPedido = {
      ...pedidoActual,
      estado: nuevoEstado,
    };

    try {
      const response = await fetch(`http://127.0.0.1:8000/pedidos/api/pedidos/pedidos/${pedidoId}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosPedido),
      });

      if (response.ok) {
        setSuccessMessage("Estado del pedido actualizado correctamente");
        setErrorMessage("");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000); // Desaparece después de 3 segundos (ajusta el tiempo según tus necesidades)
      } else {
        setSuccessMessage("");
        setErrorMessage("Error al actualizar el estado del pedido");
      }
    } catch (error) {
      console.log("Error en la solicitud PUT:", error);
    }

    // Reiniciar el estado del nuevo estado
    setNuevoEstado("");
  };

  const fetchPedido = async () => {
    const response = await fetch("http://127.0.0.1:8000/pedidos/api/pedidos/pedidos");
    const data = await response.json();
    setPedido(data);
  };

  useEffect(() => {
    fetchPedido();
  }, []);

  const handleInputChange = (event) => {
    setFiltroPedido(event.target.value);
  };

  const pedidosFiltrados = pedidos.filter((pedido) =>
    pedido.id_pedido.toString().includes(filtroPedido)
  );

  const handleEstadoChange = (pedidoId, estado) => {
    const updatedPedidos = pedidos.map((pedido) => {
      if (pedido.id_pedido === pedidoId) {
        return { ...pedido, estado };
      }
      return pedido;
    });
    setPedido(updatedPedidos);
  };

  return (
    <div>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <h1>Lista de Pedidos</h1>
      <div className="card">
        <div className="container">
          <div className="mb-3">
            <div className="input-group">
              <span className="input-group-text" id="basic-addon3">
                - Filtrar por ID de Pedido -
              </span>
              <input
                type="text"
                className="form-control"
                id="filtroPedido"
                value={filtroPedido}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {pedidosFiltrados.map((pedido) => (
          <div className="card-body" key={pedido.id_pedido}>
            <h4 className="card-title">Identificador pedido: {pedido.id_pedido}</h4>
            <div className="btn-group"></div>
            <h6 className="card-subtitle mb-2 text-muted">Observaciones: {pedido.observaciones}</h6>
            <p className="card-text">Fecha: {pedido.fecha_pedido}</p>
            <p className="card-text">Reglas de envío: {pedido.regla_envio}</p>
            <p className="card-text">Productos:</p>
            {pedido.productos.map((producto, index) => (
              <p className="card-text" key={index}>
                {producto.nombre}
              </p>
            ))}

            <p>Estado de pago: {pedido.pagado ? "Pagado" : "No pagado"}</p>

            <div>
              <h3>Pedido #{pedido.id_pedido}</h3>
              <p>Estado actual: {pedido.estado}</p>

              <form onSubmit={(e) => handleSubmit(e, pedido.id_pedido, pedido)}>
                <div className="input-group mb-3">
                  <select
                    className="form-select"
                    value={nuevoEstado}
                    onChange={(e) => setNuevoEstado(e.target.value)}
                  >
                    <option value="">Seleccionar estado</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="en_ruta">En ruta</option>
                    <option value="entregado">Entregado</option>
                    <option value="cancelado">Cancelado</option>
                  </select>
                  <button type="submit" className="btn btn-primary">
                    Actualizar estado
                  </button>
                </div>
              </form>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 10vh;
          text-align: center;
        }

        .card-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
};




export default Pedidos