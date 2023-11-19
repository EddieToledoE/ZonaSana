import estilos from "@/styles/registrar.css";
import { useState, useEffect } from "react";
import axios from "axios";
import SeleccionProductos from "./seleccionarProducto";

const registrar = ({ onCambioClick }) => {
  const [clientes, setClientes] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState("");
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);

  const manejarProductosSeleccionados = (productos) => {
    setProductosSeleccionados(productos);
    console.log(productosSeleccionados);
  };
  useEffect(() => {
    // Hacer la solicitud para obtener la lista de clientes
    const obtenerClientes = async () => {
      try {
        const response = await axios.get("/api/auth/cliente");
        setClientes(response.data);
      } catch (error) {
        console.error("Error al obtener la lista de clientes:", error);
      }
    };

    obtenerClientes();
  }, []);

  return (
    <div className="RegistrarMain">
      <div className="titulor">
        <h3>Realizar un envio</h3>
      </div>
      <div className="Entradas-datos">
        <div className="text">
          <div className="t-in">
            <label className="titulo-input" htmlFor="cliente">
              Selecciona un cliente:
            </label>
          </div>
          <div className="entradatext">
            <select
              className="datos-inv"
              id="cliente"
              value={clienteSeleccionado}
              onChange={(e) => setClienteSeleccionado(e.target.value)}
            >
              <option value="">Selecciona un cliente</option>
              {clientes.map((cliente) => (
                <option key={cliente._id} value={cliente._id}>
                  {cliente.nombre + " " + cliente.apellido}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="text">
          <div className="t-in">
            <label className="titulo-input">Número de rastreo</label>
          </div>
          <div className="entradatext">
            <input
              className="datos-inv"
              type="number"
              min={0}
              placeholder="Número de rastreo"
            ></input>
          </div>
        </div>
        <div className="text">
          <div className="t-in">
            <label className="titulo-input">Valor</label>
          </div>
          <div className="entradatext">
            <input
              className="datos-inv"
              type="number"
              min={1}
              placeholder="Valor"
            ></input>
          </div>
        </div>
        <div className="text">
          <div className="t-in">
            <label className="titulo-input">Fecha</label>
          </div>
          <div className="entradatext">
            <input
              className="datos-inv"
              type="date"
              placeholder="Selecciona una Categoria"
            ></input>
          </div>
        </div>
        <div className="text">
          <div className="t-in">
            <label className="titulo-input">Estatus</label>
          </div>
          <div className="entradatext">
            <input
              className="datos-inv"
              type="text"
              placeholder="Estatus"
            ></input>
          </div>
        </div>
        <div className="text">
          <div className="t-in">
            <label className="titulo-input">Productos</label>
          </div>
          <div className="entradatext">
            <SeleccionProductos
              onProductosSeleccionados={manejarProductosSeleccionados}
            />
          </div>
        </div>
        <div>
          <h2>Productos Seleccionados:</h2>
          <ul>
            {productosSeleccionados.map((producto) => (
              <li key={producto._id}>
                Producto: {producto._id}, Cantidad: {producto.cantidad}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="botonesr">
        <button className="cancelar" onClick={onCambioClick}>
          Cancelar
        </button>
        <button className="submit">Agregar</button>
      </div>
    </div>
  );
};

export default registrar;
