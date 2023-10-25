"use client";
import React from "react";
import { useState } from "react";
import Header from "@/pages/Header";
import Styles from "@/styles/Inventario_agregar.css";

const FormularioAgregar = () => {
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [precioc, setPrecioC] = useState(0);
  const [cantidad, setCantidad] = useState(0);
  const [preciov, setPrecioV] = useState(0);
  const [fecha, setFecha] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setNombre("");
    setCategoria("");
    setPrecioC(0);
    setCantidad(0);
    setPrecioV(0);
    setFecha("");
  };

  return (
    <section>
      <Header />
      <div className="Form-Agregar">
        <h1 className="Txt-NuevoProducto">Nuevo Producto</h1>
        <div className="Foto-Form">
          <h2>Aqui va la foto</h2>
        </div>
        <form>
          <div className="Form-Inventario">
            <label className="label" id=" ">Nombre del Producto:</label>
            <input
              required
              type="text"
              className="input"
              id="Nombre del Producto"
              value={nombre}
              onChange={(event) => setNombre(event.target.value)}
              placeholder="Ej.Pomada Verde"
            />
          </div>
          <div className="Form-Inventario">
            <label className="label">Categoria:</label>
            <input
              required
              type="text"
              id="Categoria"
              className="input"
              value={categoria}
              onChange={(event) => setCategoria(event.target.value)}
              placeholder="Ej. Jugos"
            />
          </div>
          <div className="Form-Inventario">
            <label className="label">Precio Compra:</label>
            <input
              required
              type="number"
              className="input"
              id="Precio Compra"
              value={precioc}
              onChange={(event) => setPrecioC(event.target.value)}
              placeholder="Precio de Compra"
            />
          </div>
          <div className="Form-Inventario">
            <label className="label">Cantidad:</label>
            <input
              required
              type="number"
              id="Cantidad"
              className="input"
              value={cantidad}
              onChange={(event) => setCantidad(event.target.value)}
              placeholder="Coloque la cantidad"
            />
          </div>
          <div className="Form-Inventario">
            <label className="label">Precio Venta:</label>
            <input
              required
              type="number"
              id="Precio Venta"
              value={preciov}
              className="input"
              onChange={(event) => setPrecioV(event.target.value)}
              placeholder="Ingrese Precio de Venta"
            />
          </div>
          <div className="Form-Inventario">
            <label className="label">Fecha de Registro:</label>
            <input
              type="date"
              id="fecha"
              value={fecha}
              className="input"
              onChange={(event) => setFecha(event.target.value)}
            />
          </div>
          <div>
            <ul className="Btns-Form">
              <li>
                <button id="btnCancelar">Cancelar</button>
              </li>
              <li>
                <button id="btnAgregar">Agregar</button>
              </li>
            </ul>
          </div>
        </form>
      </div>
    </section>
  );
};

export default FormularioAgregar;