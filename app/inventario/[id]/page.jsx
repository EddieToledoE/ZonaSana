"use client";
import React from "react";
import { usePathname } from "next/navigation";
import estilos from "@/styles/inventario.css";
import Bar from "@/components/Bar-1";
import { closeBar, openBar } from "@/store/barSlice";
import { useSelector, useDispatch } from "react-redux";
import Providers from "@/store/provider";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import registrarEsti from "@/styles/registrar.css";
import DetallesStilos from "@/styles/Detalles.css";
import { Button } from "@mui/material";
import Image from "next/image";
const Swal = require("sweetalert2");
export default function Inventario() {
  const idDinamico = usePathname();
  const router = useRouter();
  // Usar el método split () con el separador '/'
  const arreglo = idDinamico.split("/");

  // Acceder al último elemento del arreglo
  const id = arreglo[arreglo.length - 1];

  const isBarOpen = useSelector((state) => state.bar.isBarOpen);
  // importamos el objeto useDispatch para poder mandar los cambios de estados
  const dispatch = useDispatch();
  const handleDivClick = () => {
    const windowWidth = window.innerWidth;
    //Condicion para que cambie de estado unicamente cuando isBarOpen sea true y la pantalla tenga un width maximo de 800 px
    if (isBarOpen && windowWidth <= 800) {
      console.log("Div clickeado");
      //Si cumple las condiciones se manda el cambio de estado
      dispatch(closeBar());
    }
  };
  const main = isBarOpen ? "hola-true" : "hola";
  const inv = isBarOpen ? "inv-open" : "inv";
  const Details = isBarOpen ? "Details-Open" : "Details";
  const [editar, setEditar] = useState("Detalles-Editar-Close");
  const [descripcion_p, setdescripcion_p] = useState("Editar-Descripcion-Open");
  const [boton, setboton] = useState("Opciones-Editar-Button");
  const [botoneliminar, setbotoneliminar] = useState(
    "Opciones-Eliminar-Button"
  );
  const [botones, setbotones] = useState("Detalles-Editando-Close");
  //Se hacen visibles los botones para guardar y cancelar
  const handleBorrar = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Se eliminará :" + nombre,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar",
    });
    // Si el usuario confirma, realizar la acción
    if (result.isConfirmed) {
      try {
        const response = await axios.delete(`/api/auth/producto/${id}`);
        if (response) {
          return router.push("/inventario");
        }
      } catch (error) {
        console.error("Error al borrar el producto:", error);
      }
    }
  };
  const handleEditar = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Se editará :" + nombre,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, editar",
      cancelButtonText: "Cancelar",
    });
    if (result.isConfirmed) {
      try {
        const response = await axios.put(`/api/auth/producto/${id}`, {
          nombre: nombre,
          marca: marca,
          categoria: categoria,
          precio_venta: precioventa,
          precio_costo: preciocosto,
          descripcion: descripcion,
          cantidad_stock: cantidad,
          cantidad_alerta: alerta,
        });
        if (response) {
          Swal.fire(
            "Actualizado",
            "El producto se ha actualizado correctamente.",
            "success"
          );
          window.location.reload();
        }
      } catch (error) {
        console.error("Error al editar el producto:", error);
      }
    }
  };
  const cambiarClase = () => {
    setEditar("Detalles-Editar-Open");
    setdescripcion_p("Editar-Descripcion-Close");
    setboton("Opciones-Editar-Button-Close");
    setbotoneliminar("Opciones-Eliminar-Button-Close");
    setbotones("Detalles-Editando-Open");
  };
  //Se hacen visible los botones para editar y eliminar
  const cambiarClase_Editado = () => {
    setEditar("Detalles-Editar-Close");
    setdescripcion_p("Editar-Descripcion-Open");
    setboton("Opciones-Editar-Button");
    setbotones("Detalles-Editando-Close");
    setbotoneliminar("Opciones-Eliminar-Button");
  };
  const [preciocostofijo, setPreciocostofijo] = useState(0);
  const [precioventafijo, setPrecioventafijo] = useState(0);
  const [nombre, setNombre] = useState("");
  const [marca, setMarca] = useState("");
  const [categoria, setCategoria] = useState("");
  const [preciocosto, setPreciocosto] = useState(0);
  const [precioventa, setPrecioventa] = useState(0);
  const [descripcion, setDescripcion] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [url, setUrl] = useState("");
  const [alerta, setAlerta] = useState(0);
  //Funcion para el toolbar
  //Estilos para la tabla
  // Función para personalizar la traducción del botón de filtro
  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const response = await axios.get(`/api/auth/producto/${id}`);
        setNombre(response.data.nombre);
        setMarca(response.data.marca);
        setCategoria(response.data.categoria);
        setPreciocosto(response.data.precio_costo);
        setPrecioventa(response.data.precio_venta);
        setDescripcion(response.data.descripcion);
        setCantidad(response.data.cantidad_stock);
        setPreciocostofijo(response.data.precio_costo);
        setPrecioventafijo(response.data.precio_venta);
        setUrl(response.data.url);
        setAlerta(response.data.cantidad_alerta);
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      }
    };

    if (idDinamico) {
      obtenerProducto();
    }
  }, [idDinamico]);

  if (!url) {
    return (
      <div className="contenedor_carga">
        <div className="cargando"></div>
      </div>
    );
  }

  return (
    <section className="Home">
      <div className="bar1">
        <Bar />
      </div>
      <div className={main} onClick={handleDivClick}>
        <Header></Header>
        <div className={Details}>
          <div className="Top-Detalles">
            <div className="Titulo-Detalles">
              <h1>{nombre}</h1>
            </div>
            <div className="Detalles-Opciones">
              <button onClick={cambiarClase} className={boton}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_658_1090)">
                    <path
                      d="M14.1665 2.50005C14.3854 2.28118 14.6452 2.10756 14.9312 1.98911C15.2171 1.87066 15.5236 1.80969 15.8332 1.80969C16.1427 1.80969 16.4492 1.87066 16.7352 1.98911C17.0211 2.10756 17.281 2.28118 17.4998 2.50005C17.7187 2.71892 17.8923 2.97875 18.0108 3.26472C18.1292 3.55069 18.1902 3.85719 18.1902 4.16671C18.1902 4.47624 18.1292 4.78274 18.0108 5.06871C17.8923 5.35468 17.7187 5.61451 17.4998 5.83338L6.24984 17.0834L1.6665 18.3334L2.9165 13.75L14.1665 2.50005Z"
                      stroke="#5D6679"
                      stroke-width="1.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_658_1090">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                Editar
              </button>
              <button onClick={handleBorrar} className={botoneliminar}>
                Eliminar
              </button>
              <button
                style={{ background: "#12B76A" }}
                onClick={handleEditar}
                className={botones}
              >
                Guardar
              </button>
              <button
                style={{ background: "#FF8585" }}
                onClick={cambiarClase_Editado}
                className={botones}
              >
                Cancelar
              </button>
            </div>
          </div>
          <div className="Detalles-Generales">
            <div className="Detalles-Generales-titulo">
              <h3>General</h3>
            </div>
          </div>
          <div className="Detalles-Linea"></div>
          <div className="Detalles-Informacion">
            <div className="Detalles-Parte1">
              <div className="Detalles-Principales-T">
                <h3>Detalles Principales</h3>
              </div>

              <div className="Detalles-Atributos">
                <div className="Detalles-Atributos-Renglones">
                  <h3>Nombre del Producto:</h3>
                  <p className={descripcion_p}>{nombre}</p>
                  <input
                    value={nombre}
                    onChange={(event) => setNombre(event.target.value)}
                    className={editar}
                    type="text"
                    placeholder={nombre}
                  ></input>
                </div>
                <div className="Detalles-Atributos-Renglones">
                  <h3>Marca:</h3>
                  <p className={descripcion_p}>{marca}</p>
                  <input
                    value={marca}
                    onChange={(event) => setMarca(event.target.value)}
                    className={editar}
                    type="text"
                    placeholder={marca}
                  ></input>
                </div>
                <div className="Detalles-Atributos-Renglones">
                  <h3>Categoría:</h3>
                  <p className={descripcion_p}>{categoria}</p>
                  <select
                    className={editar}
                    value={categoria}
                    id="datos-inv"
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
                    <option value="Aceites esenciales">
                      Aceites esenciales
                    </option>
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
                    <option value="Energía y vitalidad">
                      Energía y vitalidad
                    </option>
                  </select>
                </div>
                <div className="Detalles-Atributos-Renglones">
                  <h3>Precio Compra:</h3>
                  <p className={descripcion_p}>$:{preciocosto}</p>
                  <input
                    value={preciocosto}
                    onChange={(event) => setPreciocosto(event.target.value)}
                    className={editar}
                    type="number"
                    placeholder={preciocosto}
                    max={precioventafijo}
                    min={1}
                  ></input>
                </div>
                <div className="Detalles-Atributos-Renglones">
                  <h3>Precio Venta:</h3>
                  <p className={descripcion_p}>$:{precioventa}</p>
                  <input
                    value={precioventa}
                    onChange={(event) => setPrecioventa(event.target.value)}
                    className={editar}
                    type="number"
                    placeholder={precioventa}
                    min={preciocostofijo}
                  ></input>
                </div>
              </div>
            </div>
            <div className="Detalles-Parte2">
              <div className="Detalles-Imagen">
                <Image src={url} width={120} height={120} />
              </div>
              <div className="Detalles-Stock">
                <div className="Stock-Renglones">
                  <h3>Stock disponible</h3>
                  <p className={descripcion_p}>{cantidad}</p>
                  <input
                    value={cantidad}
                    onChange={(event) => setCantidad(event.target.value)}
                    className={editar}
                    type="number"
                    placeholder={cantidad}
                    min={1}
                  ></input>
                </div>
                <div className="Stock-Renglones">
                  <h3>Se considera poco stock:</h3>
                  <p className={descripcion_p}>{alerta}</p>
                  <input
                    value={alerta}
                    onChange={(event) => setAlerta(event.target.value)}
                    className={editar}
                    type="number"
                    placeholder={alerta}
                    min={1}
                  ></input>
                </div>
                <div className="Stock-Renglones">
                  <h3>Vendidos</h3>
                  <p>32</p>
                </div>
              </div>
            </div>
          </div>
          <div className="Detalles-Final">
            <h3>Detalles del producto:</h3>
            <p>{descripcion}</p>
            <input
              style={{ marginLeft: "10px" }}
              value={descripcion}
              onChange={(event) => setDescripcion(event.target.value)}
              className={editar}
              type="text"
              placeholder={descripcion}
            ></input>
          </div>
        </div>
      </div>
    </section>
  );
}
