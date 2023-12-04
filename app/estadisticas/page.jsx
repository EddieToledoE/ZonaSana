"use client";

import React from "react";
import Estilos from "@/styles/Estadistica.css";
import Bar from "@/components/Bar-1";
import Header from "@/components/Header";
import { closeBar, openBar } from "@/store/barSlice";
import { useSelector, useDispatch } from "react-redux";
import Providers from "@/store/provider";
import Grafica from "@/components/Grafica";
import Grafica2 from "@/components/Grafica2";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Estadistica() {
  //Logica para mandar y recibir los estados de la libreria "Redux"
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
  //Datos de simulacion
  const initialData = [12, 19, 3, 5, 2, 10, 3];
  const [datosAPI, setDatosAPI] = useState([]);
  const [datosAPIEnvio, setDatosAPIEnvio] = useState([]);

  useEffect(() => {
    const obtenerDatosDeAPIEnvio = async () => {
      try {
        const response = await axios.get("api/auth/envio");
        setDatosAPIEnvio(response.data);
      } catch (error) {
        console.error("Error al obtener datos de la API", error);
      }
    };

    obtenerDatosDeAPIEnvio();
  }, []);

  useEffect(() => {
    const obtenerDatosDeAPI = async () => {
      try {
        const response = await axios.get("api/auth/venta");
        setDatosAPI(response.data);
      } catch (error) {
        console.error("Error al obtener datos de la API", error);
      }
    };

    obtenerDatosDeAPI();
  }, []);
  return (
    <section className="Container">
      <div className="bar-1">
        <Bar />
      </div>
      <div className="Main-Second" onClick={handleDivClick}>
        <Header></Header>
        <div className="Contenedor-Clientes">
          <div className="Grafica-Contenedor">
            <Grafica data={datosAPI} />
          </div>
        </div>
        <div className="Contenedor-Envios">
          <div className="Grafica-Contenedor">
            <Grafica2 data={datosAPIEnvio} />
          </div>
        </div>
      </div>
    </section>
  );
}
