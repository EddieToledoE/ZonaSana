<<<<<<< HEAD:app/Ventas/page.jsx
"use client";
import Header from "@/components/Header";
import estilos from "@/styles/registrar.css";
import estios from "app/Home.css";
import Grafica from "@/components/Grafica";
import Bar from "@/components/Bar-1";
import { closeBar, openBar } from "@/store/barSlice";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
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
import Paper from "@mui/material/Paper";
import { red } from "@mui/material/colors";
import stylos from "styles/Ventas.css";
import Axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import SeleccionProductos from "@/components/seleccionarProductosStock";

const Swal = require("sweetalert2");
export default function Home() {
  const sesion = useSession();
  const [usuario, setUsuario] = useState("");
  useEffect(() => {
    setUsuario(sesion.data?.user.persona[0].nombre);
  }, [sesion.data]);
  const handleVenta = async (e) => {
    e.preventDefault();
    const ganancias = productosSeleccionados.map((p) => p.ganancia);
    const sumaGanancias = ganancias.reduce(
      (acc, ganancia) => acc + ganancia,
      0
    );

    const precios = productosSeleccionados.map((p) => p.monto);
    const sumaPrecios = precios.reduce((acc, precio) => acc + precio, 0);

    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres confirmar esta venta? ",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, confirmar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      console.log(nombre, productosSeleccionados, usuario);

      try {
        const res = await Axios.post("/api/auth/venta", {
          nombre: nombre,
          usuario: usuario,
          producto_vendido: productosSeleccionados,
          ganancia: sumaGanancias,
          monto: sumaPrecios,
        });
        if (res.data) {
          console.log(res.data);
          Swal.fire(
            "Agregado",
            "La venta se ha registrado correctamente.",
            "success"
          );
          // window.location.reload();
        } else {
          console.log("La respuesta no contiene datos JSON válidos.");
        }

        console.log(res);
      } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Ha ocurrio un error",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Ha ocurrio un error," + error,
          });
        }
      }
    }
  };
  //Logica para mandar y recibir los estados de la libreria "Redux"
  const isBarOpen = useSelector((state) => state.bar.isBarOpen);
  // importamos el objeto useDispatch para poder mandar los cambios de estados
  const { data: session } = useSession();
  console.log(session);
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
  // carga el header una vez
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const manejarProductosSeleccionados = (productos) => {
    setProductosSeleccionados(productos);
    console.log(productosSeleccionados);
  };
  const cantidad = productosSeleccionados.length;
  const [carrito, setcarrito] = useState("carrito-close");

  const [ventas, setVentas] = useState([]);

  const ruta = "/api/auth/venta";
  const getData = async () => {
    try {
      const response = await Axios.get(ruta);
      const data = response.data;
      setVentas(data);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

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
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <div className="tool">
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
  useEffect(() => {
    getData();
  }, []);

  const hola = isBarOpen ? "hola-true" : "hola";
  const grafica = isBarOpen ? "grafica-true" : "grafica";
  const avisos = isBarOpen ? "avisos-true" : "avisos";
  const tabla = isBarOpen ? "tabla-true" : "tabla";
  const imageStyle = {
    borderRadius: "2px",
    position: "absolute",
  };
  const [nombre, setNombre] = useState("");
  return (
    <section className="seccion2">
      <div className="bar1">
        <Bar />
      </div>

      <div className={hola} onClick={handleDivClick}>
        <Header />
        <div
          className="Tabla-Contenedor"
          style={{
            height: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="titulos2">
            <h3>Registro de ventas</h3>
          </div>
          <div
            className="text"
            style={{
              border: "1px dashed #383e49",
              marginTop: "0px",
              width: "80%",
              alignContent: "center",
            }}
          >
            <div className="t-in">
              <label className="titulo-input" style={{ marginLeft: "33px" }}>
                Nombre del cliente:
              </label>
            </div>
            <div className="entradatext">
              <input
                style={{ width: "" }}
                className="datos-inv"
                type="text"
                placeholder="Julian Vicente"
                onChange={(event) => setNombre(event.target.value)}
              />
            </div>
          </div>
          <div className="Ventas-CONTAINER">
            <SeleccionProductos
              onProductosSeleccionados={manejarProductosSeleccionados}
            />
          </div>
          <div
            className="text"
            style={{
              border: "1px dashed #383e49",
              marginTop: "0px",
              width: "80%",
              alignContent: "center",
              justifyContent: "start",
            }}
          >
            <button className="Button-Ventas-Confirmar" onClick={handleVenta}>
              Confirmar
            </button>
          </div>
        </div>
        <div className="Tabla-Contenedor" style={{ height: "50%" }}>
          <div className="Tabla">
            <DataGrid
              columns={[
                {
                  field: "usuario",
                  headerName: "Vendido por",
                  hideable: false,
                  width: 150,
                  sortable: false,
                  filterable: false,
                },
                {
                  field: "nombre",
                  headerName: "Cliente",
                  hideable: false,
                  width: 150,
                },
                {
                  field: "monto",
                  type: "singleSelect",
                  headerName: "Total",
                  width: 150,
                },
                {
                  field: "ganancia",
                  type: "singleSelect",
                  headerName: "Ganancia",
                  width: 150,
                },

                { field: "fecha", headerName: "Fecha de venta", width: 200 },
              ]}
              rows={ventas}
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
=======
"use client";
import Header from "@/components/Header";
import estilos from "@/styles/registrar.css";
import estios from "app/Home.css";
import Grafica from "@/components/Grafica";
import Bar from "@/components/Bar-1";
import { closeBar, openBar } from "@/store/barSlice";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
//Todo los imports para la tabla
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { red } from "@mui/material/colors";
import stylos from "styles/Ventas.css";
import Axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import SeleccionProductos from "@/components/seleccionarProductosStock";

const Swal = require("sweetalert2");
export default function Home() {
  const sesion = useSession();
  const [usuario, setUsuario] = useState("");
  useEffect(() => {
    setUsuario(sesion.data?.user.persona[0].nombre);
  }, [sesion.data]);
  const handleVenta = async (e) => {
    e.preventDefault();
    const ganancias = productosSeleccionados.map((p) => p.ganancia);
    const sumaGanancias = ganancias.reduce(
      (acc, ganancia) => acc + ganancia,
      0
    );

    const precios = productosSeleccionados.map((p) => p.monto);
    const sumaPrecios = precios.reduce((acc, precio) => acc + precio, 0);

    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres confirmar esta venta? ",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, confirmar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      console.log(nombre, productosSeleccionados, usuario);

      try {
        const res = await Axios.post("/api/auth/venta", {
          nombre: nombre,
          usuario: usuario,
          producto_vendido: productosSeleccionados,
          ganancia: sumaGanancias,
          monto: sumaPrecios,
        });
        if (res.data) {
          console.log(res.data);
          Swal.fire(
            "Agregado",
            "La venta se ha registrado correctamente.",
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
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Ha ocurrio un error",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Ha ocurrio un error," + error,
          });
        }
      }
    }
  };
  //Logica para mandar y recibir los estados de la libreria "Redux"
  const isBarOpen = useSelector((state) => state.bar.isBarOpen);
  // importamos el objeto useDispatch para poder mandar los cambios de estados
  const { data: session } = useSession();
  console.log(session);
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
  // carga el header una vez
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const manejarProductosSeleccionados = (productos) => {
    setProductosSeleccionados(productos);
    console.log(productosSeleccionados);
  };
  const cantidad = productosSeleccionados.length;
  const [carrito, setcarrito] = useState("carrito-close");

  const hola = isBarOpen ? "hola-true" : "hola";
  const grafica = isBarOpen ? "grafica-true" : "grafica";
  const avisos = isBarOpen ? "avisos-true" : "avisos";
  const tabla = isBarOpen ? "tabla-true" : "tabla";
  const imageStyle = {
    borderRadius: "2px",
    position: "absolute",
  };
  const [nombre, setNombre] = useState("");
  return (
    <section className="seccion2">
      <div className="bar1">
        <Bar />
      </div>

      <div className={hola} onClick={handleDivClick}>
        <Header />
        <div
          className="Tabla-Contenedor"
          style={{
            height: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="titulos2">
            <h3>Registro de ventas</h3>
          </div>
          <div
            className="text"
            style={{
              border: "1px dashed #383e49",
              marginTop: "0px",
              width: "80%",
              alignContent: "center",
            }}
          >
            <div className="t-in">
              <label className="titulo-input" style={{ marginLeft: "33px" }}>
                Nombre del cliente:
              </label>
            </div>
            <div className="entradatext">
              <input
                style={{ width: "" }}
                className="datos-inv"
                type="text"
                placeholder="Julian Vicente"
                onChange={(event) => setNombre(event.target.value)}
              />
            </div>
          </div>
          <div className="Ventas-CONTAINER">
            <SeleccionProductos
              onProductosSeleccionados={manejarProductosSeleccionados}
            />
          </div>
          <div
            className="text"
            style={{
              border: "1px dashed #383e49",
              marginTop: "0px",
              width: "80%",
              alignContent: "center",
              justifyContent: "start",
            }}
          >
            <button className="Button-Ventas-Confirmar" onClick={handleVenta}>
              Confirmar
            </button>
          </div>
        </div>

        <div className="Tabla-Contenedor" style={{ height: "50%" }}></div>
      </div>
    </section>
  );
}
>>>>>>> e9de8409d91b98688e22ca1b06fbd52754368754:app/ventas/page.jsx
