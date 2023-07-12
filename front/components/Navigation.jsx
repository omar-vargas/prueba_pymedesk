import React from "react";

function Navigation(){
    return(
<ul class="nav nav-pills">
  <li class="nav-item">
    <a class="nav-link active" href="/">PymeDesk</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="/pedidos">Ver Pedidos</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="/cliente">Ver Clientes</a>
  </li>
    <li class="nav-item">
    <a class="nav-link" href="/create-pedidos">Crear Pedidos</a>
  </li>  
   <li class="nav-item">
    <a class="nav-link" href="/create-cliente">Crear Cliente</a>
  </li>  

</ul>
  );
}
export default Navigation