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
import axios from "axios";
import registrarEsti from "@/styles/registrar.css";

export default function Inventario() {
  const idDinamico = usePathname();
  console.log(idDinamico); // /Inventario/Id

  // Usar el método split () con el separador '/'
  const arreglo = idDinamico.split("/");
  console.log(arreglo); // ["", "Inventario", "Id"]

  // Acceder al último elemento del arreglo
  const id = arreglo[arreglo.length - 1];
  console.log(id); // Id
  const [producto, setProducto] = useState(null);
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
  //Funcion para el toolbar
  //Estilos para la tabla
  // Función para personalizar la traducción del botón de filtro
  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const response = await axios.get(`/api/auth/producto/${id}`);
        setProducto(response.data);
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      }
    };

    if (idDinamico) {
      obtenerProducto();
    }
  }, [idDinamico]);

  if (!producto) {
    return <p>Cargando...</p>;
  }
  return (
    <section className="Home">
      <div className="bar1">
        <Bar />
      </div>
      <div className={main} onClick={handleDivClick}>
        <Header></Header>
        <div className={inv}>
          <div className="informacion">
            <h3 className="inv-titulo">Inventario General</h3>
          </div>
          <div className="inv-inf">
            <div className="inv-inf1">
              <div className="Categorias">
                <h3 className="titulo" style={{ color: "#12B76A" }}>
                  Categorias
                </h3>
                <h4 className="cantidad">121</h4>
              </div>
              <div className="linea"></div>
              <div className="Total-P">
                <h3 className="titulo" style={{ color: "#E19133" }}>
                  Total Productos
                </h3>
                <h4 className="cantidad">241</h4>
              </div>
            </div>

            <div className="inv-inf2">
              <div className="linea"></div>
              <div className="Categorias">
                <h3 className="titulo" style={{ color: "#448DF2" }}>
                  Mas vendido
                </h3>
                <h4 className="cantidad">21</h4>
              </div>
              <div className="linea"></div>
              <div className="Total-P">
                <h3 className="titulo" style={{ color: "#F36960" }}>
                  Poco Stock
                </h3>
                <h4 className="cantidad">341</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="Tabla-Contenedor">
          <div>
            <h1>{producto.nombre}</h1>
            <h1>{producto.descripcion}</h1>
            {/* Renderiza el resto de la información del producto */}
          </div>
        </div>
      </div>
    </section>
  );
}
