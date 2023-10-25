import React from "react";
import Styles from "@/styles/Inventario.css";
import Header from "@/pages/Header";
import Bar from "@/pages/Bar-1";

function Inventario() {
  return (
    <section>
      <Header />
      <div className="Inventario-General">
        <h1 className="Txt-General">Inventario General</h1>
        <ul className="Lista-Invgeneral">
          <li>
            <a id="liCategoria">Categorias</a>
          </li>
          <li>
            <a id="liTotal">Total Productos</a>
          </li>
          <li>
            <a id="liVendido">Mas vendidos</a>
          </li>
          <li>
            <a id="liStock">Poco en stock</a>
          </li>
        </ul>
      </div>
      <div className="Inventario-Productos">
        <h1 className="Txt-Productos">Productos</h1>
        <ul className="Btns-Productos">
          <li>
            <button id="btnAnadir"> <a  href="/Inventario/Agregar">
            Anadir Producto
              </a></button>
          </li>
          <li>
            <button id="btnFiltro">Filtro</button>
          </li>
          <li>
            <button id="btnDescarga">Descarga</button>
          </li>
        </ul>
      </div>
    </section>
  );
}
export default Inventario;