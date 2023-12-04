import React, { useEffect, useState } from "react";
import axios from "axios";
import estilos from "@/styles/registrar.css";
import { Autocomplete, Badge } from "@mui/material";
function SeleccionProductos({ onProductosSeleccionados }) {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [cantidad, setCantidad] = useState(1); // Valor inicial de la cantidad
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
            cantidad: parseInt(cantidad),
            nombre: nombre,
          },
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
          Cantidad:
        </label>
        <input
          className="Cantidad_Productos"
          type="number"
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
            <svg
              onClick={cambiarClase}
              viewBox="-0.5 0 25 25"
              width={80}
              height={80}
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
                  d="M18.5996 21.57C19.7042 21.57 20.5996 20.6746 20.5996 19.57C20.5996 18.4654 19.7042 17.57 18.5996 17.57C17.495 17.57 16.5996 18.4654 16.5996 19.57C16.5996 20.6746 17.495 21.57 18.5996 21.57Z"
                  stroke="#000000"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
                <path
                  d="M8.59961 21.57C9.70418 21.57 10.5996 20.6746 10.5996 19.57C10.5996 18.4654 9.70418 17.57 8.59961 17.57C7.49504 17.57 6.59961 18.4654 6.59961 19.57C6.59961 20.6746 7.49504 21.57 8.59961 21.57Z"
                  stroke="#000000"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
                <path
                  d="M2 3.55997C2 3.55997 6.64 3.49997 6 7.55997L5.31006 11.62C5.20774 12.1068 5.21778 12.6105 5.33954 13.0929C5.46129 13.5752 5.69152 14.0234 6.01263 14.4034C6.33375 14.7833 6.73733 15.0849 7.19263 15.2854C7.64793 15.4858 8.14294 15.5797 8.64001 15.56H16.64C17.7479 15.5271 18.8119 15.1196 19.6583 14.404C20.5046 13.6884 21.0834 12.7069 21.3 11.62L21.9901 7.50998C22.0993 7.0177 22.0939 6.50689 21.9744 6.017C21.8548 5.52712 21.6242 5.07126 21.3005 4.68467C20.9767 4.29807 20.5684 3.99107 20.1071 3.78739C19.6458 3.58371 19.1438 3.48881 18.64 3.50998H9.94"
                  stroke="#000000"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </Badge>
        </div>
      </div>
      <div className={carritoP}>
        <div className="CloseP">
          <label className="carritoT">Ojetos seleccionados</label>
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
                {producto.nombre} - Cantidad:
                <input
                  placeholder={producto.cantidad}
                  className="Actualizar_Cantidad"
                  type="number"
                  id={`cantidad-${producto._id}`}
                  value={producto.cantidad}
                  onChange={(e) =>
                    actualizarCantidad(producto._id, e.target.value)
                  }
                  min="1" // Establecer un valor mínimo para la cantidad
                />
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

  