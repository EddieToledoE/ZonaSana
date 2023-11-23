import estilos from "@/styles/registrar.css";
import { useState, useEffect } from "react";
import Axios, { AxiosError } from "axios";
import SeleccionProductos from "./seleccionarProductoRecetado";
import { Autocomplete, Badge } from "@mui/material";
import { format } from 'date-fns';
import { brown } from "@mui/material/colors";
import Image from "next/image";
const Swal = require("sweetalert2");

const registrar = ({ onCambioClick }) => {

  const [citas, setCitas] = useState([]);
  const [citaSeleccionado, setCitaSeleccionado] = useState("")
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [observaciones, setObservaciones] = useState("");

  useEffect(()=> {
    obtenerCitas();
  },[])

  const crearRecetas = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres confirmar esta receta? ",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, crear",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      console.log(
        citaSeleccionado,
        observaciones,
        productosSeleccionados
      );
      try {
        const res = await Axios.post("/api/auth/receta", {
          cita_id: citaSeleccionado,
          observaciones: observaciones,
          producto_recetado: productosSeleccionados,
        });
        await Axios.put(`/api/auth/cita/${citaSeleccionado}`, {
          pendiente: false,
        })
        if (res.data) {
          console.log(res.data);
          Swal.fire(
            "Agregado",
            "La receta se ha registrado correctamente.",
            "success"
          );
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

  const manejarProductosSeleccionados = (productos) => {
    setProductosSeleccionados(productos);
    console.log(productosSeleccionados);
  };

  const cantidad = productosSeleccionados.length;

  const [carrito, setcarrito] = useState("carrito-close");

  const obtenerCitas = async () => {
    try {
      const response = await Axios.get("/api/auth/cita/pendientes");
      setCitas(response.data);
    } catch (error) {
      console.error("Error al obtener la lista de pacientes:", error);
    }
  }

  return (
    <div className="RegistrarMain">
      <div className="titulor">
        <h3>Crear Receta</h3>
      </div>
      <div className="Main-items">
        <Image style={{ boxSizing: 'border-box', paddingTop: '15px' }} src={"/icono-receta.png"} width={80} height={80} />
      </div>
      <div className="Entradas-datos">
        <div className="text">
          <div className="t-in">
            <label className="titulo-input" htmlFor="cliente">
              Selecciona la cita:
            </label>
          </div>
          <div className="entradatext">
            <select
              className="datos-inv"
              id="paciente"
              value={citaSeleccionado}
              onChange={(event) => setCitaSeleccionado(event.target.value)}
            >
              <option value="">Selecciona la cita</option>
              {citas.map((cita) => (
                <option key={cita._id} value={cita._id}>
                  {`${cita.paciente_id.nombre} ${cita.paciente_id.apellido} ${format(new Date(cita.fecha), 'dd/MM/yyyy hh:mm a')}`}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="Entradas-datos">
          <div className="text">
            <div className="t-in">
              <label className="titulo-input">Observaciones:</label>
            </div>
            <div className="entradatext">
              <textarea
                className="datos-inv"
                rows="5"
                onChange={(event) => setObservaciones(event.target.value)}
                placeholder="Observaciones"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="text"></div>
        <div className="Carrito-Main">
          <div className="Carrito_Seleccion">
            <SeleccionProductos
              onProductosSeleccionados={manejarProductosSeleccionados}
            />
          </div>
        </div>
      </div>
      <div className="text"></div>
      <div className="botonesr">
        <button className="cancelar" onClick={onCambioClick}>
          Cancelar
        </button>
        <button onClick={crearRecetas} className="submit">
          Agregar
        </button>
      </div>
    </div>
  );
};

export default registrar;
