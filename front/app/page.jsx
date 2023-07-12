
"use client";
import axios from 'axios'
import { useEffect, useState } from 'react';






const IndexPage = () => {
  const [resumen, setResumen] = useState(null);

  useEffect(() => {
    const fetchResumen = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/pedidos/resumen/");
        const data = await response.json();
        setResumen(data);
        console.log(data)
      } catch (error) {
        console.log('Error al obtener el resumen:', error);
      }
    };

    fetchResumen();
  }, []);

  return (

    <div className="container">
      <h1>Resumen del comercio</h1>
      {resumen && (
        <div>

          <p>Número de pedidos: {resumen.numero_pedidos}</p>
          <p>Número de clientes: {resumen.numero_clientes}</p>
          <p>Ciudad con más pedidos: {resumen.ciudad_con_mas_pedidos}</p>
          <p>Producto más vendido: {resumen.producto_mas_vendido}</p>
        </div>
      )}
    </div>
  );
};


export default IndexPage