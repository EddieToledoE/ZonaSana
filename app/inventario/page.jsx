"use client";
import React from "react";
import estilos from "@/styles/inventario.css";
import Bar from "@/components/Bar-1";
import { closeBar, openBar } from "@/store/barSlice";
import { useSelector, useDispatch } from "react-redux";
import Providers from "@/store/provider";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import Axios from "axios";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { useGridApiEventHandler } from "@mui/x-data-grid";
import { useGridApiRef } from "@mui/x-data-grid";
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
import { Avatar, Button, Grid } from "@mui/material";
import registrarEsti from "@/styles/registrar.css";
import Registrar from "@/components/registrarInv";
export default function Inventario() {
  const router = useRouter();
  const handleCellDoubleClick = (params, event) => {
    // Verifica que no se haya presionado la tecla Ctrl para evitar conflicto con eventos predeterminados
    if (!event.ctrlKey) {
      // Evita el comportamiento predeterminado del evento (navegación por enlace)
      event.defaultMuiPrevented = true;

      // Obtén el ID del elemento de la fila
      const itemId = params.row._id;

      // Navegación utilizando navigation.navigate de next/navigation al hacer doble clic
      navigation.navigate(`/inventario/${itemId}`);
    }
  };
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
  const [claseDiv, setClaseDiv] = useState("Registrar-close");
  const [claseF, setclaseF] = useState("Fondo-Close");
  // Función para cambiar la clase en el componente padre
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
  //Funcion para el toolbar
  function boton() {
    alert("Viva Tiktok");
  }

  const [clientes, setClientes] = useState([]);

  const ruta = "/api/auth/producto";
  const getData = async () => {
    try {
      const response = await Axios.get(ruta);
      const data = response.data;
      setClientes(data);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const [cantidadTotal, setCantidadTotal] = useState(0);
  const [pocostock, setPocostock] = useState(0);
  const [nadastock, setNadastock] = useState(0);
  const [cantidadmenor11, setCantidadmenor11] = useState(0);
  useEffect(() => {
    const obtenerCantidades = async () => {
      try {
        const response = await Axios.get("/api/auth/producto/contador");

        setCantidadTotal(response.data.cantidadTotal);
        setNadastock(response.data.cantidadConCeroStock);
        setPocostock(response.data.cantidadBajosDeStock);
        setCantidadmenor11(response.data.cantidadConMenosDeOnceStock);
      } catch (error) {
        console.error("Error al obtener cantidades:", error);
        // Manejar el error según tus necesidades
      }
    };

    obtenerCantidades();
  }, []);

  function registrar() {
    return (
      <div className="A1">
        <h1>Hola sdad es una ventana para poder registrar</h1>
        <div> Holaaaaa</div>
      </div>
    );
  }

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <div className="tool">
          <button className="Agregar" onClick={cambiarClase}>
            Añadir Producto
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
          border: 22, // Cambia 'border' y 'borderColor'
          color: "red",
          marginLeft: "100px", // Cambia 'margingLeft' a 'marginLeft'
        }}
      </GridPagination>
    );
  }

  //Evento para cuando se clickea sobre una fila

  return (
    <section className="Home">
      <div className={claseF}></div>
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
                  Total Productos
                </h3>
                <h4 className="cantidad">{cantidadTotal}</h4>
              </div>
              <div className="linea"></div>
              <div className="Total-P">
                <h3 className="titulo" style={{ color: "#E19133" }}>
                  Productos con menos de 11 en existencia
                </h3>
                <h4 className="cantidad">{cantidadmenor11}</h4>
              </div>
            </div>

            <div className="inv-inf2">
              <div className="linea"></div>
              <div className="Total-P">
                <h3 className="titulo" style={{ color: "#E19133" }}>
                  Poco Stock
                </h3>
                <h4 className="cantidad">{pocostock}</h4>
              </div>
              <div className="linea"></div>
              <div className="Categorias">
                <h3 className="titulo" style={{ color: "#F36960" }}>
                  Agotados
                </h3>
                <h4 className="cantidad">{nadastock}</h4>
              </div>
            </div>
          </div>
        </div>
        <div className={claseDiv}>
          <Registrar onCambioClick={cambiarClaseEnPadre} />
        </div>
        <div className="Tabla-Contenedor">
          <div className="Tabla">
            <DataGrid
              onCellDoubleClick={handleCellDoubleClick}
              columns={[
                {
                  field: "url",
                  headerName: "",
                  hideable: false,
                  width: 60,
                  renderCell: (params) => <Avatar src={params.row.url} />,
                  sortable: false,
                  filterable: false,
                },
                {
                  field: "nombre",
                  headerName: "Nombre",
                  hideable: false,
                  width: 150,
                },
                {
                  field: "cantidad_stock",
                  type: "singleSelect",
                  headerName: "Cantidad",
                  width: 150,
                },
                {
                  field: "cantidad_alerta",
                  type: "singleSelect",
                  headerName: "Alerta",
                  width: 150,
                },

                { field: "precio_costo", headerName: "Costo", width: 200 },
                { field: "precio_venta", headerName: "Venta", width: 200 },
                { field: "descripcion", headerName: "Descripción", width: 200 },
                { field: "categoria", headerName: "Categoría", width: 200 },
              ]}
              rows={clientes}
              slots={{
                toolbar: CustomToolbar,
                pagination: Pagination,
              }}
              getRowId={(row) => row._id}
              autoPageSize
              localeText={{
                footerPagination: "Página {{page}} de {{pageCount}}",
                filterOperatorAfter: "Filtro",
                toolbarFiltersLabel: "filtro",
                // Personaliza el mensaje de paginación
              }}
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
