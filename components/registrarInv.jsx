"use client";
import estilos from "@/styles/registrar.css";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import Axios, { AxiosError } from "axios";
import Logo from "@/public/images/Zs.jpeg";
const Swal = require("sweetalert2");

const registrar = ({ onCambioClick }) => {
  const [errorgeneral, setError] = useState();
  const [archivo, setArchivo] = useState(null);
  const [nombreProducto, setNombreProducto] = useState("");
  const [marca, setMarca] = useState("");
  const [categoria, setCategoria] = useState("");
  const [precioCompra, setPrecioCompra] = useState(0);
  const [cantidad, setCantidad] = useState(0);
  const [alerta, setAlerta] = useState(3);
  const [precioVenta, setPrecioVenta] = useState(0);
  const [descripcion, setDescripcion] = useState("");
  const [fotoSeleccionada, setFotoSeleccionada] = useState(false);

  // Funciones onChange para cada in
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fotoSeleccionada) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, selecciona una foto.",
      });
      return;
    }

    console.log(
      "El precio compra es" + precioCompra + "El precio venta es" + precioVenta
    );
    const formData = new FormData();
    formData.append("cantidad_stock", cantidad);
    formData.append("precio_costo", precioCompra);
    formData.append("precio_venta", precioVenta);
    formData.append("categoria", categoria);
    formData.append("marca", marca);
    formData.append("nombre", nombreProducto);
    formData.append("descripcion", descripcion);
    formData.append("cantidad_alerta", alerta);
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
        archivo,
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
          window.location.reload();
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
            text: "Ha ocurrio un error ",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Ha ocurrio un error,",
          });
        }
      }
      // Aquí puedes realizar la lógica para agregar el producto

      // Mostrar SweetAlert de éxito
    }
  };
  const [imagenSeleccionada, setImagenSeleccionada] = useState(Logo);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setArchivo(file);
    setFotoSeleccionada(true);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagenSeleccionada(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="RegistrarMain">
      <div className="titulor">
        <h3>Nuevo Producto</h3>
      </div>
      <div className="Main-items">
        <div className="Imagen-producto">
          <Image
            src={imagenSeleccionada}
            alt="Imagen"
            width={80}
            height={80}
            style={{ objectFit: "cover", borderRadius: "50%" }}
          />
        </div>
        <input
          className="prducto-foto-inv"
          placeholder="Imagen necesaria"
          type="file"
          onChange={handleFileChange}
          name=""
          id="archivo"
          required
        />
        <label className="labelSubir" for="archivo">
          Subir Archivo
        </label>
      </div>
      <form>
        {errorgeneral && <div>{errorgeneral}</div>}
        <div className="Entradas-datos">
          <div className="text">
            <div className="t-in">
              <label className="titulo-input">Nombre Producto:</label>
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
              <label className="titulo-input">Categoría:</label>
            </div>
            <div className="entradatext">
              <select
                className="datos-inv"
                onChange={(event) => setCategoria(event.target.value)}
              >
                <option value="" disabled selected>
                  Selecciona una categoría
                </option>
                <option value="Suplementos nutricionales">
                  Suplementos nutricionales
                </option>
                <option value="Hierbas y plantas medicinales">
                  Hierbas y plantas medicinales
                </option>
                <option value="Aceites esenciales">Aceites esenciales</option>
                <option value="Bienestar gastrointestinal">
                  Bienestar gastrointestinal
                </option>
                <option value="Salud mental">Salud mental</option>
                <option value="Salud articular y muscular">
                  Salud articular y muscular
                </option>
                <option value="Belleza y cuidado personal">
                  Belleza y cuidado personal
                </option>
                <option value="Energía y vitalidad">Energía y vitalidad</option>
              </select>
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
              <label className="titulo-input">Cantidad poco stock :</label>
            </div>
            <div className="entradatext">
              <input
                className="datos-inv"
                type="number"
                min={3}
                placeholder="Se considera poco stock"
                onChange={(event) => setAlerta(event.target.value)}
              ></input>
            </div>
          </div>
          <div className="text">
            <div className="t-in">
              <label className="titulo-input">Descripción :</label>
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
      <div className="text"></div>
      <div className="botonesr">
        <button className="cancelar" onClick={onCambioClick}>
          Cancelar
        </button>
        <button onClick={handleSubmit} type="button" className="submit">
          Agregar
        </button>
      </div>
    </div>
  );
};

export default registrar;
