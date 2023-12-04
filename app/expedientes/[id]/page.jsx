"use client";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import estilos from "@/styles/inventario.css";
import "@/styles/HacerReceta.css";
import { Avatar, Button } from "@mui/material";
import Bar from "@/components/Bar-1";
import { closeBar, openBar } from "@/store/barSlice";
import { useSelector, useDispatch } from "react-redux";
import Providers from "@/store/provider";
import Header from "@/components/Header";
import HacerReceta from "@/components/hacerReceta";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
  valueGetter,
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

export default function Expediente() {
  const [pacientes, setPacientes] = useState([]);
  const [claseDiv, setClaseDiv] = useState("Registrar-close");
  const [claseF, setclaseF] = useState("Fondo-Close");
  const ruta = "/api/auth/expediente";
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [edad, setEdad] = useState("");

  const idDinamico = usePathname();
  const router = useRouter();
  // Usar el método split () con el separador '/'
  const arreglo = idDinamico.split("/");

  // Acceder al último elemento del arreglo
  const id = arreglo[arreglo.length - 1];

  if (!pacientes) {
    return (
      <div className="contenedor_carga">
        <div className="cargando"></div>
      </div>
    );
  }

  const getData = async () => {
    try {
      const response = await axios.get(`/api/auth/expediente/${id}`);
      const data = response.data;

      const primerPaciente = data[0];
      setNombre(primerPaciente?.cita_id?.paciente_id?.nombre);
      setApellido(primerPaciente?.cita_id?.paciente_id?.apellido);
      setEdad(primerPaciente?.cita_id?.paciente_id?.edad);
      setPacientes(data);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const handleCellDoubleClick = (params, event) => {};

  const isBarOpen = useSelector((state) => state.bar.isBarOpen);
  // importamos el objeto useDispatch para poder mandar los cambios de estados

  const dispatch = useDispatch();

  const handleDivClick = () => {
    const windowWidth = window.innerWidth;

    //Condicion para que cambie de estado unicamente cuan do isBarOpen sea true y la pantalla tenga un width maximo de 800 px
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
        <div>
          <h1
            style={{
              boxSizing: "border-box",
              padding: "20px",
              fontWeight: "100",
              color: " gray",
              textDecoration: "none",
            }}
          >
            Expediente del paciente {nombre} {apellido}
          </h1>
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
          <HacerReceta onCambioClick={cambiarClaseEnPadre} />
        </div>
        <div className="Tabla-Contenedor_Expediente">
          <div className="Tabla">
            <DataGrid
              onCellDoubleClick={handleCellDoubleClick}
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
                  valueGetter: (params) => nombre,
                  hideable: true,
                  width: 170,
                },
                {
                  field: "apellido",
                  headerName: "Apellido",
                  valueGetter: (params) => apellido,
                  hideable: true,
                  width: 170,
                },
                {
                  field: "edad",
                  headerName: "Edad",
                  valueGetter: (params) => edad,
                  hideable: true,
                  width: 100,
                },
                {
                  field: "cita_id",
                  headerName: "Fecha Consulta",
                  width: 200,
                  renderCell: (params) =>
                    format(
                      new Date(params.row.cita_id.fecha),
                      "dd/MM/yyyy hh:mm a"
                    ), // Accede al nombre del cliente
                },
                {
                  field: "observaciones",
                  headerName: "Observaciones",
                  width: 350,
                },
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

