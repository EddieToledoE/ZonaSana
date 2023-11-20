"use client";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import estilos from "@/styles/inventario.css";
import { Avatar, Button } from "@mui/material";
import Bar from "@/components/Bar-1";
import { closeBar, openBar } from "@/store/barSlice";
import { useSelector, useDispatch } from "react-redux";
import Providers from "@/store/provider";
import Header from "@/components/Header";
import RegistrarPaciente from "@/components/registrarPaciente";
import {
  DataGrid,
  GridColumnHeaderFilterIconButton,
  GridPagination,
  GridToolbar,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import {
  GridToolbarContainer,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { Grid } from "@mui/material";

export default function Inventario() {
  const [pacientes, setPacientes] = useState([]);
  const [claseDiv, setClaseDiv] = useState("Registrar-close");
  const [claseF, setclaseF] = useState("Fondo-Close");
  const ruta = "http://localhost:3000/api/auth/paciente";
  const getData = async () => {
    try {
      const response = await axios.get(ruta);
      const data = response.data;
      setPacientes(data);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

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
  function boton() {
    alert("Viva Tiktok");
  }
  //Estilos para la tabla
  // Función para personalizar la traducción del botón de filtro
  const cambiarClaseEnPadre = () => {
    setClaseDiv("Registrar-close");
    setclaseF("Fondo-Close");
    console.log("Se modifico la clase");
    console.log(claseDiv);
  };
  const cambiarClase = () => {
    setClaseDiv("Registrar-envio");
    setclaseF("Fondo-Open");
    console.log("Hola mundo");
    console.log(claseDiv);
  };

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <div className="tool">
          <button onClick={cambiarClase} className="Agregar">
            Añadir Paciente
          </button>

          <div className="filtro-boton">
            <div className="svg-b">
              <svg
                className="fil"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 10H15M2.5 5H17.5M7.5 15H12.5"
                  stroke="#5D6679"
                  stroke-width="1.67"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div className="titulo-boton">
              <label className="f">Filtro</label>
            </div>
            <div className="boton">
              <GridToolbarFilterButton />
            </div>
          </div>

          <div className="Descargar">
            <label className="D">Descargar</label>
            <div className="buttonD">
              <GridToolbarExport></GridToolbarExport>
            </div>
          </div>
        </div>
      </GridToolbarContainer>
    );
  }
  function Pagination() {
    return (
      <GridPagination>
        sx=
        {{
          borderColor: "blue", // Cambia 'boderColor' a 'borderColor'
          border: "1px solid red", // Cambia 'border' y 'borderColor'
          color: "red",
          marginLeft: "100px", // Cambia 'margingLeft' a 'marginLeft'
        }}
      </GridPagination>
    );
  }

  //Estilos para la tabla

  return (
    <section className="Home">
      <div className="bar1">
        <Bar />
      </div>
      <div className={main} onClick={handleDivClick}>
        <Header></Header>
        <div className={claseDiv}>
           <RegistrarPaciente onCambioClick={cambiarClaseEnPadre} />
        </div>
        <div className="Tabla-Contenedor">
          <div className="Tabla">
            <DataGrid
              columns={[
                {
                  field: "-",
                  headerName: "",
                  hideable: false,
                  width: 60,
                  renderCell: (params) => <Avatar />,
                  sortable: false,
                  filterable: false,
                },
                {
                  field: "nombre",
                  headerName: "Nombre",
                  hideable: true,
                  width: 150,
                },
                {
                  field: "apellido",
                  type: "singleSelect",
                  headerName: "Apellido",
                  width: 150,
                },

                { field: "telefono", headerName: "Telefono", width: 200 },
                {
                  field: "codigo_ajeno",
                  headerName: "Codigo Ajeno",
                  width: 200,
                },
                {
                  field: "codigo_propio",
                  headerName: "Codigo Propio",
                  width: 200,
                },
                { field: "edad", headerName: "Edad", width: 200 },
              ]}
              rows={pacientes}
              getRowId={(row) => row._id}
              slots={{
                toolbar: CustomToolbar,
                pagination: Pagination,
              }}
              autoPageSize
              sx={{
                boxShadow: 0,
                borderRadius: 2,
                borderColor: "#FFF",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
