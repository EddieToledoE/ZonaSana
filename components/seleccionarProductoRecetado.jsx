import React, { useEffect, useState } from "react";
import axios from "axios";
import estilos from "@/styles/registrar.css";
import { Autocomplete, Badge } from "@mui/material";
function SeleccionProductos({ onProductosSeleccionados }) {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [cantidad, setCantidad] = useState(""); // Valor inicial de la cantidad
  const [productosElegidos, setProductosElegidos] = useState([]);
  const [nombre, setNombre] = useState("");

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
        setProductoSeleccionado(null);
        setProductosElegidos((prevProductos) => [
          ...prevProductos,
          {
            _id: productoSeleccionado,
            instrucciones: cantidad,
            nombre: nombre
          },
        ]);
      }

      // Limpia los campos después de agregar el producto
      setProductoSeleccionado("");
      setCantidad("");
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

  const handleAutocompleteChange = (event, newValue) => {
    // Si el usuario limpia la selección, newValue puede ser null, por lo que debes manejarlo adecuadamente
    setProductoSeleccionado(newValue ? newValue._id : ""); // Actualiza el estado con el ID del producto seleccionado
    setNombre(newValue ? newValue.nombre : "");
  };
  const [carritoP, setcarritP] = useState("Productos_TOTALES-close");
  function cambiarClase() {
    setcarritP("Productos_TOTALES-Open");
  }
  function CerrarCarrito() {
    setcarritP("Productos_TOTALES-close");
  }

  return (
    <div className="Carrito-Seccion">
      <div className="Agregar_Carrito">
        <label className="carritoT" htmlFor="producto">
          Selecciona un producto:
        </label>
        <Autocomplete
          sx={{
            display: "inline-block",
            "& input": {
              width: "95%",
              height: 30,
              bgcolor: "",
              paddingLeft: "10px",
              borderColor: "red",
              border: "1px solid #D0D5DD",
              borderRadius: "4px",
              color: (theme) =>
                theme.palette.getContrastText(theme.palette.background.paper),
            },
          }}
          style={{ width: "auto", border: "none", borderColor: "#D0D5DD" }}
          id="custom-input-demo"
          options={productos}
          getOptionLabel={(option) => option.nombre}
          onChange={handleAutocompleteChange} // Maneja el cambio de valor en Autocomplete
          value={
            productos.find(
              (producto) => producto._id === productoSeleccionado
            ) || null
          }
          renderInput={(params) => (
            <div ref={params.InputProps.ref}>
              <input
                type="text"
                {...params.inputProps}
                placeholder={
                  productoSeleccionado ? "" : "Selecciona un producto"
                }
              />
            </div>
          )}
        />

        <label className="carritoT" htmlFor="cantidad">
          Instrucciones:
        </label>
        <input
          className="Cantidad_Productos"
          type="text"
          id="cantidad"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          min="1" // Establecer un valor mínimo para la cantidad
        />
        <button
          className="Añadir-Boton"
          type="button"
          onClick={agregarProducto}
        >
          Añadir Producto
        </button>
      </div>

      <div className="Productos_Seleccionados">
        <div className="CantidadP">
          <Badge
            badgeContent={productosElegidos.length}
            variant=""
            color="secondary"
          >
            <svg onClick={cambiarClase} width={100} height={100} class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 6h6m-6 4h6m-6 4h6M1 1v18l2-2 2 2 2-2 2 2 2-2 2 2V1l-2 2-2-2-2 2-2-2-2 2-2-2Z" />
                </svg>
          </Badge>
        </div>
      </div>
      <div className={carritoP}>
        <div className="CloseP">
          <label className="carritoT">Objetos seleccionados</label>
          <svg
            onClick={CerrarCarrito}
            width="30px"
            height="30px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5"
                stroke="#080808"
                stroke-width="1.5"
                stroke-linecap="round"
              ></path>{" "}
              <path
                d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
                stroke="#080808"
                stroke-width="1.5"
                stroke-linecap="round"
              ></path>{" "}
            </g>
          </svg>
        </div>
        <div className="Carrito-Objetos">
          {productosElegidos.map((producto) => (
            <div className="ListaP">
              <li className="Lic" key={producto._id}>
                {producto.nombre} 
              </li>
              <button
                className="EliminarC"
                type="button"
                onClick={() => quitarProducto(producto._id)}
              >
                <svg
                  width={30}
                  height={20}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M10 12V17"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                    <path
                      d="M14 12V17"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                    <path
                      d="M4 7H20"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                    <path
                      d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                    <path
                      d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SeleccionProductos;
