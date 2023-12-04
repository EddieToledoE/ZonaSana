import estilos from "@/styles/registrar.css";
import { useState, useEffect } from "react";
import PhoneInput from "react-phone-number-input";
import es from "react-phone-number-input/locale/es.json";
const Swal = require("sweetalert2");
import Axios, { AxiosError } from "axios";

const registrar = ({ onCambioClick }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState();
  const [direccion, setDireccion] = useState([]);
  const [calle, setCalle] = useState("");
  const [cp, setCp] = useState(0);
  const [estado, setEstado] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [observacion, setObservacion] = useState("");
  const [error, setError] = useState("");

  const handleGuardar = async (e) => {
    e.preventDefault();
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres agregar este nuevo cliente? " + nombre,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, agregar",
      cancelButtonText: "Cancelar",
    });
    if (result.isConfirmed) {
      console.log(nombre, apellido, telefono, direccion);
      try {
        const res = await Axios.post("/api/auth/cliente", {
          nombre: nombre,
          apellido: apellido,
          telefono: telefono,
          direccion: {
            cp: cp,
            calle: calle,
            municipio: municipio,
            estado: estado,
            observacion: observacion,
          },
        });
        if (res.data) {
          console.log(res.data);
          Swal.fire(
            "Agregado",
            "El Cliente se ha agregado correctamente.",
            "success"
          );
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
            text: "Ha ocurrio un error : " + error,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Ha ocurrio un error :" + error,
          });
        }
      }
    }
  };
  return (
    <div className="RegistrarMain">
      <div className="titulor">
        <h3>Registrar Cliente</h3>
      </div>
      <div className="Entradas-datos">
        <div className="text">
          <div className="t-in">
            <label className="titulo-input">Nombre</label>
          </div>
          <div className="entradatext">
            <input
              onChange={(event) => setNombre(event.target.value)}
              className="datos-inv"
              type="text"
              placeholder="Julian"
            ></input>
          </div>
        </div>
        <div className="text">
          <div className="t-in">
            <label className="titulo-input">Apellido</label>
          </div>
          <div className="entradatext">
            <input
              className="datos-inv"
              type="text"
              placeholder="Vicente"
              onChange={(event) => setApellido(event.target.value)}
            ></input>
          </div>
        </div>
        <div className="text">
          <div className="t-in">
            <label className="titulo-input">Teléfono</label>
          </div>
          <div className="entradatext">
            <input
              className="datos-inv"
              type="number"
              min={0}
              placeholder="ej +52"
              value={telefono}
              labels={es}
              onChange={(event) => setTelefono(event.target.value)}
            ></input>
          </div>
        </div>
        <div className="titulor">
          <h3>Dirección:</h3>
        </div>
        <div className="text">
          <div className="t-in">
            <label className="titulo-input">Código Postal:</label>
          </div>
          <div className="entradatext">
            <input
              className="datos-inv"
              type="number"
              min={1}
              placeholder="Código Postal"
              onChange={(event) => setCp(event.target.value)}
            ></input>
          </div>
        </div>
        <div className="text">
          <div className="t-in">
            <label className="titulo-input">Calle:</label>
          </div>
          <div className="entradatext">
            <input
              className="datos-inv"
              type="text"
              placeholder="Calle"
              onChange={(event) => setCalle(event.target.value)}
            ></input>
          </div>
        </div>
        <div className="text">
          <div className="t-in">
            <label className="titulo-input">Estado:</label>
          </div>
          <div className="entradatext">
            <input
              className="datos-inv"
              type="text"
              placeholder="Estado"
              onChange={(event) => setEstado(event.target.value)}
            ></input>
          </div>
        </div>
        <div className="text">
          <div className="t-in">
            <label className="titulo-input">Municipio:</label>
          </div>
          <div className="entradatext">
            <input
              className="datos-inv"
              type="text"
              placeholder="Municipio"
              onChange={(event) => setMunicipio(event.target.value)}
            ></input>
          </div>
        </div>
        <div className="text">
          <div className="t-in">
            <label className="titulo-input">Observación:</label>
          </div>
          <div className="entradatext">
            <input
              className="datos-inv"
              type="text"
              placeholder="Observación"
              onChange={(event) => setObservacion(event.target.value)}
            ></input>
          </div>
        </div>
      </div>
      <div className="text"></div>
      <div className="botonesr">
        <button className="cancelar" onClick={onCambioClick}>
          Cancelar
        </button>
        <button onClick={handleGuardar} className="submit">
          Agregar
        </button>
      </div>
    </div>
  );
};

export default registrar;
