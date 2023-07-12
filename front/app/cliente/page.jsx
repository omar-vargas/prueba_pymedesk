"use client";
import React, { useState, useEffect } from "react";




const Cliente = () => {
   const [filtroCorreo, setFiltroCorreo] = useState("");
  const [clientes, setClientes] = useState([]);


 const fetchClientes = async () => {
    const response =await fetch("http://127.0.0.1:8000/pedidos/api/pedidos/usuarios");
    const data = await response.json();
    setClientes(data);
  };

    fetchClientes()
  const handleInputChange = (event) => {
    setFiltroCorreo(event.target.value);
  };

  const clientesFiltrados = clientes.filter(
    (cliente) =>
      cliente.correo &&
      cliente.correo.toLowerCase().includes(filtroCorreo.toLowerCase())
  );

  return (

    
    <div className="container">
             <h1>Listado Clientes</h1> 
<div class="mb-3">

  <div class="input-group">
    <span class="input-group-text" id="basic-addon3">- Filtrar por Correo - </span>
    <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3 basic-addon4" value={filtroCorreo} onChange={handleInputChange} />
  </div>
</div>


      <div className="card-container">
        {clientesFiltrados.map((cliente) => (
          <div className="card border-primary mb-3" style={{ maxWidth: "30rem" }} key={cliente.nombre}>
            <div className="card-header">Nombre: {cliente.nombre}</div>
            <div className="card-body">
              <p className="card-title">Correo: {cliente.correo}</p>
              <p className="card-text">Celular: {cliente.celular}</p>
              <p className="card-text">Ciudad: {cliente.ciudad}</p>
              <p className="card-text">Direccion: {cliente.direccion}</p>
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
          height: 100vh;
          text-align: center;
        }

        .card-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};
export default Cliente