import React, { useEffect, useState } from "react";
import axios from "axios";
import estilos from "@/styles/registrar.css";

function SeleccionProductos({ onProductosSeleccionados }) {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState("");
  const [cantidad, setCantidad] = useState(1); // Valor inicial de la cantidad
  const [productosElegidos, setProductosElegidos] = useState([]);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await axios.get("/api/auth/producto");
        setProductos(response.data);
      } catch (error) {
        console.error("Error al obtener la lista de productos:", error);
      }
    };

    obtenerProductos();
  }, []);

  const agregarProducto = () => {
    // Verifica que se hayan seleccionado ambos valores
    if (productoSeleccionado && cantidad) {
      const producto = productos.find((p) => p._id === productoSeleccionado);
      // Actualiza el estado con la información del nuevo producto
      if (producto) {
        setProductosElegidos((prevProductos) => [
          ...prevProductos,
          { _id: productoSeleccionado, cantidad: parseInt(cantidad) },
        ]);
      }

      // Limpia los campos después de agregar el producto
      setProductoSeleccionado("");
      setCantidad(1);
    }
  };

  const quitarProducto = (productoId) => {
    const nuevosProductos = productosElegidos.filter(
      (p) => p._id !== productoId
    );
    setProductosElegidos(nuevosProductos);
  };

  const actualizarCantidad = (productoId, nuevaCantidad) => {
    const nuevosProductos = productosElegidos.map((p) =>
      p._id === productoId ? { ...p, cantidad: parseInt(nuevaCantidad) } : p
    );
    setProductosElegidos(nuevosProductos);
  };

  useEffect(() => {
    // Puedes pasar los productos seleccionados al componente padre
    onProductosSeleccionados(productosElegidos);
  }, [productosElegidos, onProductosSeleccionados]);

  return (
    <div className="entradatext">
      <label className="titulo-input" htmlFor="producto">
        Selecciona un producto:
      </label>
      <select
        className="productos-agregar"
        id="producto"
        value={productoSeleccionado}
        onChange={(e) => setProductoSeleccionado(e.target.value)}
      >
        <option value="">Selecciona un producto</option>
        {productos.map((producto) => (
          <option key={producto._id} value={producto._id}>
            {producto.nombre}
          </option>
        ))}
      </select>
      <label className="titulo-input" htmlFor="cantidad">
        Cantidad:
      </label>
      <input
        className="productos-agregar"
        type="number"
        id="cantidad"
        value={cantidad}
        onChange={(e) => setCantidad(e.target.value)}
        min="1" // Establecer un valor mínimo para la cantidad
      />
      <button type="button" onClick={agregarProducto}>
        Agregar Producto
      </button>
      <ul>
        {productosElegidos.map((producto) => (
          <li key={producto._id}>
            {producto._id} - Cantidad: {producto.cantidad}{" "}
            <button type="button" onClick={() => quitarProducto(producto._id)}>
              Quitar
            </button>
            <label htmlFor={`cantidad-${producto._id}`}>
              Actualizar Cantidad:
            </label>
            <input
              type="number"
              id={`cantidad-${producto._id}`}
              value={producto.cantidad}
              onChange={(e) => actualizarCantidad(producto._id, e.target.value)}
              min="1" // Establecer un valor mínimo para la cantidad
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SeleccionProductos;
