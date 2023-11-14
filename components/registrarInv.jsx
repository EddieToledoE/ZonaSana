"use client";
import estilos from "@/styles/registrar.css";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import Axios, { AxiosError } from "axios";
import Logo from "@/public/images/Zs.jpeg";
const Swal = require("sweetalert2");

const registrar =({ onCambioClick })=> {
  const [errorgeneral, setError] = useState();
  const [archivo, setArchivo] = useState(null);
  const [nombreProducto, setNombreProducto] = useState("");
  const [marca, setMarca] = useState("");
  const [categoria, setCategoria] = useState("");
  const [precioCompra, setPrecioCompra] = useState(0);
  const [cantidad, setCantidad] = useState(0);
  const [precioVenta, setPrecioVenta] = useState(0);
  const [descripcion, setDescripcion] = useState("");

  // Funciones onChange para cada in
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("cantidad_stock", cantidad);
    formData.append("precio_costo", precioCompra);
    formData.append("precio_venta", precioVenta);
    formData.append("categoria", categoria);
    formData.append("marca", marca);
    formData.append("nombre", nombreProducto);
    formData.append("descripcion", descripcion);
    formData.append("archivo", archivo); // Agregar el archivo
    // Mostrar SweetAlert para confirmar la acción
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres agregar este producto? " + nombreProducto,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, agregar",
      cancelButtonText: "Cancelar",
    });

    // Si el usuario confirma, realizar la acción
    if (result.isConfirmed) {
      console.log({
        nombreProducto,
        marca,
        categoria,
        precioCompra,
        cantidad,
        precioVenta,
        descripcion,
      });

      try {
        const res = await Axios.post("/api/auth/producto", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (res.data) {
          console.log(res.data);
          Swal.fire(
            "Agregado",
            "El producto se ha agregado correctamente.",
            "success"
          );
        } else {
          console.log("La respuesta no contiene datos JSON válidos.");
        }

        console.log(res);
      } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
          setError(error.response?.data.message);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Ha ocurrio un error de conexion," + errorgeneral,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Ha ocurrio un error," + error,
          });
        }
      }
      // Aquí puedes realizar la lógica para agregar el producto

      // Mostrar SweetAlert de éxito
    }
  };
  return (
    <div className="RegistrarMain">
      <div className="titulor">
        <h3>Nuevo Producto</h3>
      </div>
      <div className="Main-items">
        <div className="Imagen-producto">
          <Image src={Logo} alt="Imagen" width={80} height={80} />
        </div>
        <input
          placeholder=""
          type="file"
          onChange={(e) => {
            setArchivo(e.target.files[0]);
          }}
          name=""
          id=""
        />
      </div>
      <form>
        {errorgeneral && <div>{errorgeneral}</div>}
        <div className="Entradas-datos">
          <div className="text">
            <div className="t-in">
              <label className="titulo-input">Nombre Producto :</label>
            </div>
            <div className="entradatext">
              <input
                className="datos-inv"
                type="text"
                placeholder="Ej. pomada verde"
                onChange={(event) => setNombreProducto(event.target.value)}
              ></input>
            </div>
          </div>
          <div className="text">
            <div className="t-in">
              <label className="titulo-input">Marca :</label>
            </div>
            <div className="entradatext">
              <input
                className="datos-inv"
                type="text"
                placeholder="Marca"
                onChange={(event) => setMarca(event.target.value)}
              ></input>
            </div>
          </div>
          <div className="text">
            <div className="t-in">
              <label className="titulo-input">Categoria :</label>
            </div>
            <div className="entradatext">
              <input
                className="datos-inv"
                type="text"
                placeholder="Selecciona una Categoria"
                onChange={(event) => setCategoria(event.target.value)}
              ></input>
            </div>
          </div>
          <div className="text">
            <div className="t-in">
              <label className="titulo-input">Precio Compra :</label>
            </div>
            <div className="entradatext">
              <input
                className="datos-inv"
                type="number"
                placeholder="Precio Compra"
                onChange={(event) => setPrecioCompra(event.target.value)}
              ></input>
            </div>
          </div>
          <div className="text">
            <div className="t-in">
              <label className="titulo-input">Cantidad :</label>
            </div>
            <div className="entradatext">
              <input
                className="datos-inv"
                type="number"
                placeholder="3"
                onChange={(event) => setCantidad(event.target.value)}
              ></input>
            </div>
          </div>
          <div className="text">
            <div className="t-in">
              <label className="titulo-input">Precio Venta :</label>
            </div>
            <div className="entradatext">
              <input
                className="datos-inv"
                type="number"
                placeholder="Ingresa el precio de venta"
                onChange={(event) => setPrecioVenta(event.target.value)}
              ></input>
            </div>
          </div>
          <div className="text">
            <div className="t-in">
              <label className="titulo-input">Descripcion :</label>
            </div>
            <div className="entradatext">
              <input
                className="datos-inv"
                type="text"
                placeholder="..."
                onChange={(event) => setDescripcion(event.target.value)}
              ></input>
            </div>
          </div>
        </div>
      </form>
      <div className="botonesr">
        <button className="cancelar" onClick={onCambioClick}>Cancelar</button>
        <button onClick={handleSubmit} type="button" className="submit">
          Agregar
        </button>
      </div>
    </div>
  );
}

export default registrar;
