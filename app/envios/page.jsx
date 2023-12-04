"use client";
import React from "react";
import Bar from "@/components/Bar-1.jsx";
import diseño from "@/styles/Envios.css";
import styles from "@/app/Home.css";
import Header from "@/components/Header.jsx";
import { closeBar, openBar } from "@/store/barSlice";
import { useSelector, useDispatch } from "react-redux";
import estiloinfo from "@/styles/inventario.css";
import WhereToVoteIcon from "@mui/icons-material/WhereToVote";
import { red } from "@mui/material/colors";
import Pedidos from "components/hacerPedido";
import Cliente from "components/registrarCliente";
import Axios from "axios";

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
import { Avatar, Grid } from "@mui/material";
import { useState, useEffect } from "react";
function Envios() {
  const Swal = require("sweetalert2");
  const isBarOpen = useSelector((state) => state.bar.isBarOpen);
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

  const hola = isBarOpen ? "hola-true" : "hola";
  const inv = isBarOpen ? "inv-open" : "inv";
  const protector = isBarOpen ? "protectorOpen" : "protector";
  const avisos = isBarOpen ? "avisos-true" : "avisos";
  const [claseDiv, setClaseDiv] = useState("Registrar-close");
  const [claseDiv2, setClaseDiv2] = useState("Registrar-close2");
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
  const cambiarClaseEnPadre2 = () => {
    setClaseDiv2("Registrar-close2");
    setclaseF("Fondo-Close");
    console.log("Se modifico la clase");
    console.log(claseDiv);
  };
  const cambiarClase2 = () => {
    setClaseDiv2("Registrar-envio2");
    setclaseF("Fondo-Open");
    console.log("Hola mundo");
    console.log(claseDiv);
  };

  const [envios, setEnvios] = useState([]);

  const ruta = "/api/auth/envio";
  const getData = async () => {
    try {
      const response = await Axios.get(ruta);
      const data = response.data;
      setEnvios(data);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const [cantidadTotal, setCantidadTotal] = useState(0);
  const [cantidadEntregados, setCantidadEntregados] = useState(0);
  const [cantidadNoEntregados, setCantidadNoEntregados] = useState(0);

  useEffect(() => {
    const obtenerCantidades = async () => {
      try {
        const response = await Axios.get("/api/auth/envio/contador");

        setCantidadTotal(response.data.cantidadTotal);
        setCantidadEntregados(response.data.cantidadEntregados);
        setCantidadNoEntregados(response.data.cantidadNoEntregados);
      } catch (error) {
        console.error("Error al obtener cantidades:", error);
        // Manejar el error según tus necesidades
      }
    };

    obtenerCantidades();
  }, []);
  const handleCellDoubleClick = (params, event) => {
    // Verifica que no se haya presionado la tecla Ctrl para evitar conflicto con eventos predeterminados
    if (!event.ctrlKey) {
      // Evita el comportamiento predeterminado del evento (navegación por enlace)
      event.defaultMuiPrevented = true;

      // Obtén el ID del elemento de la fila
      const itemId = params.row._id;

      // Navegación utilizando navigation.navigate de next/navigation al hacer doble clic
      navigation.navigate(`/envios/${itemId}`);
    }
  };

  return (
    <section className="seccion1">
      <div className={claseF}></div>
      <div className="bar1">
        <Bar />
      </div>

      <div className={hola} onClick={handleDivClick}>
        <Header />

        <div className={avisos}>
          <div className="citas">
            <div className="Citas">
              <a className="titulo-citas">Envíos</a>
            </div>
            <div className="citas-pendientes">
              <div className="inf">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="30" height="30" rx="4" fill="#ECEAFF" />
                  <path
                    d="M14.8118 2C12.3254 2 9.94082 2.98774 8.18294 4.74572C6.42475 6.50391 5.43701 8.88846 5.43701 11.3751C5.43701 16.375 13.9869 25.7498 14.3496 26.1751C14.4689 26.3038 14.6367 26.3762 14.8121 26.3752C14.9874 26.3762 15.1552 26.3038 15.2745 26.1751L16.062 25.2813V25.7501C16.062 26.0816 16.1938 26.3996 16.4282 26.634C16.6625 26.8684 16.9804 27 17.3121 27H24.812C25.1435 27 25.4613 26.8684 25.6957 26.634C25.9303 26.3996 26.0619 26.0816 26.0619 25.7501V18.2502C26.0619 17.9187 25.9303 17.6006 25.6957 17.3663C25.4613 17.1319 25.1434 17.0003 24.812 17.0003H22.1682C23.5056 14.6877 24.1869 12.8004 24.1869 11.3753C24.1869 9.72968 23.7538 8.11297 22.931 6.68787C22.1082 5.26262 20.9246 4.07924 19.4995 3.2564C18.0744 2.43355 16.4577 2.00043 14.812 2.00043L14.8118 2ZM24.8119 25.7495H17.3119V18.2496H19.1869V20.7497C19.1876 20.9663 19.3003 21.1672 19.4849 21.2804C19.6695 21.3938 19.8997 21.4034 20.0931 21.3059L21.0617 20.8246L22.0304 21.3059H22.0306C22.1176 21.3505 22.2139 21.3741 22.3118 21.3745C22.4288 21.3749 22.5437 21.3425 22.6431 21.2808C22.8262 21.1663 22.9373 20.9656 22.9369 20.7497V18.2496H24.8119L24.8119 25.7495ZM21.687 18.2496V19.7371L21.3743 19.5684C21.1975 19.4793 20.9887 19.4793 20.8118 19.5684L20.468 19.7371V18.2496H21.687ZM19.812 16.9997H17.3119C16.9803 16.9997 16.6624 17.1313 16.428 17.3657C16.1937 17.6001 16.0618 17.9181 16.0618 18.2496V23.3495C15.5556 23.9746 15.1181 24.4682 14.8119 24.8121C13.0307 22.7808 6.68682 15.2936 6.68682 11.3749C6.68682 8.472 8.23556 5.79014 10.7494 4.33837C13.2633 2.8866 16.3604 2.88692 18.874 4.33837C21.3875 5.78981 22.9366 8.47189 22.9366 11.3749C22.9366 12.6811 22.1617 14.6249 20.7115 16.9998L19.812 16.9997Z"
                    fill="#24B8F1"
                    fill-opacity="0.6"
                  />
                  <path
                    d="M14.8118 6.99988C13.6514 6.99988 12.5388 7.46088 11.7183 8.28118C10.8978 9.10168 10.4368 10.2146 10.4368 11.3749C10.4368 12.535 10.8978 13.6479 11.7183 14.4684C12.5388 15.2889 13.6514 15.7497 14.8118 15.7497C15.9721 15.7497 17.0848 15.2889 17.9053 14.4684C18.7258 13.6479 19.1868 12.535 19.1868 11.3749C19.1868 10.2146 18.7258 9.10168 17.9053 8.28118C17.0848 7.46091 15.9721 6.99988 14.8118 6.99988ZM14.8118 14.4998C13.9829 14.4998 13.1881 14.1706 12.6022 13.5845C12.0161 12.9985 11.6869 12.2036 11.6869 11.3749C11.6869 10.546 12.0161 9.75122 12.6022 9.1651C13.1882 8.57915 13.9829 8.24979 14.8118 8.24979C15.6407 8.24979 16.4355 8.57917 17.0214 9.1651C17.6075 9.75122 17.9367 10.546 17.9367 11.3749C17.9367 12.2036 17.6075 12.9986 17.0214 13.5845C16.4354 14.1706 15.6407 14.4998 14.8118 14.4998Z"
                    fill="#24B8F1"
                    fill-opacity="0.6"
                  />
                </svg>
                <h1 className="citas-inf">{cantidadEntregados}</h1>
                <a className="inf-a">Completados</a>
              </div>
            </div>
            <div className="linea"></div>
            <div className="inventario-pendiente">
              <div className="inf">
                <svg
                  width="26"
                  height="25"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#c87f19"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M4.51555 7C3.55827 8.4301 3 10.1499 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3V6M12 12L8 8"
                      stroke="#DBA362"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                  </g>
                </svg>

                <h1 className="citas-inf">{cantidadNoEntregados}</h1>
                <a className="inf-a">Pendientes</a>
              </div>
            </div>
          </div>
          <div className="inventario">
            <div className="Citas">
              <a className="titulo-citas">Opciones</a>
            </div>
            <div className="citas-pendientes">
              <div className="inf">
                <button className="Envios-Button" onClick={cambiarClase}>
                  Hacer un envío
                </button>
              </div>
            </div>
            <div className="linea"></div>
            <div className="inventario-pendiente">
              <div className="inf">
                <div className="inf">
                  <button className="Envios-Button" onClick={cambiarClase2}>
                    Registrar Cliente
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={claseDiv}>
          <Pedidos onCambioClick={cambiarClaseEnPadre} />
        </div>
        <div className={claseDiv2}>
          <Cliente onCambioClick={cambiarClaseEnPadre2} />
        </div>
        <div className="Tabla-Contenedor">
          <DataGrid
            onCellDoubleClick={handleCellDoubleClick}
            columns={[
              {
                field: "rastreo",
                headerName: "Número de rastreo",
                hideable: false,
                width: 200,
              },
              { field: "fecha", headerName: "Fecha", width: 200 },
              { field: "valor", headerName: "Valor", width: 200 },
              { field: "estatus", headerName: "Estatus", width: 200 },
              {
                field: "cliente",
                headerName: "Cliente",
                width: 200,
                renderCell: (params) =>
                  `${params.row.cliente.nombre} ${params.row.cliente.apellido}`, // Accede al nombre del cliente
              },
              {
                field: "clientetelefono",
                headerName: "Teléfono",
                width: 200,
                renderCell: (params) => params.row.cliente.telefono, // Accede al nombre del cliente
              },
              {
                field: "producto_enviado",
                headerName: "Productos Enviados",
                width: 200,
                renderCell: (params) => (
                  <>
                    {params.row.producto_enviado.map((producto, index) => (
                      <Avatar
                        key={index}
                        alt={`Producto ${index + 1}`}
                        src={producto._id.url}
                        style={{ marginRight: "8px" }} // Ajusta según sea necesario
                      />
                    ))}
                  </>
                ),
              },
            ]}
            rows={envios}
            slots={{}}
            localeText={{
              footerPagination: "Página {{page}} de {{pageCount}}",
              filterOperatorAfter: "Filtro",
              toolbarFiltersLabel: "filtro",
              // Personaliza el mensaje de paginación
            }}
            autoPageSize
            getRowId={(row) => row._id}
            sx={{
              boxShadow: 0,
              borderRadius: 2,
              borderColor: "#FFF",
            }}
          />
        </div>
      </div>
      <div className={protector} onClick={handleDivClick}></div>
    </section>
  );
}

export default Envios;

