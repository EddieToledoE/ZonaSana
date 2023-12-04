import estilos from "@/styles/registrar.css";
import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import es from "react-phone-number-input/locale/es.json";
const Swal = require("sweetalert2");
import Axios, { AxiosError } from "axios";

const registrar = ({ onCambioClick }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState();
  const [edad, setEdad] = useState(0);
  const [codigoajeno, setCodigoajeno] = useState(0);
  const [codigopropio, setCodigopropio] = useState(0);
  const [error, setError] = useState("");

  const handleGuardar = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres agregar este nuevo Paciente? " + nombre,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, agregar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      console.log(nombre, apellido, telefono, edad, codigoajeno, codigopropio);
      try {
        const res = await Axios.post("/api/auth/paciente", {
          nombre: nombre,
          apellido: apellido,
          telefono: telefono,
          edad: edad,
          codigo_ajeno: codigoajeno,
          codigo_propio: codigopropio,
        });
        if (res.data) {
          console.log(res.data);
          Swal.fire(
            "Agregado",
            "El Paciente se ha agregado correctamente.",
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
            text: "Ha ocurrio un error : ",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Ha ocurrio un error :",
          });
        }
      }
    }
  };
  return (
    <div className="RegistrarMain">
      <div className="titulor">
        <h3>Registrar Paciente</h3>
      </div>
      <div className="Main-items">
        <svg
          fill="#48a865"
          width={80}
          height={80}
          viewBox="0 0 100 100"
          data-name="Layer 1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#48a865"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M79.89,83.79H12.11a1.5,1.5,0,0,1-1.5-1.5V25.72a1.5,1.5,0,0,1,1.5-1.5H62.7a1.5,1.5,0,0,1,0,3H13.61V80.79H78.39V41.63a1.5,1.5,0,0,1,3,0V82.29A1.5,1.5,0,0,1,79.89,83.79Z"></path>
            <path d="M53.73,47a1.52,1.52,0,0,1-1.52-1.5,1.37,1.37,0,0,1,0-.19V27.21H39.43v18a1.43,1.43,0,0,1,0,.29A1.47,1.47,0,0,1,38,47a1.56,1.56,0,0,1-1.56-1.5V25.71a1.51,1.51,0,0,1,1.5-1.5h15.8a1.51,1.51,0,0,1,1.5,1.5V45.46A1.5,1.5,0,0,1,53.73,47Z"></path>
            <path d="M53.7,47a1.5,1.5,0,0,1-1.17-.56l-7.87-9.87A1.5,1.5,0,1,1,47,34.66l7.88,9.87A1.49,1.49,0,0,1,53.7,47Z"></path>
            <path d="M38,47a1.49,1.49,0,0,1-1.17-2.43l7.87-10A1.5,1.5,0,0,1,47,36.44l-7.87,10A1.5,1.5,0,0,1,38,47Z"></path>
            <path d="M34.85,77.57H18.56a1.5,1.5,0,0,1,0-3H34.85a1.5,1.5,0,0,1,0,3Z"></path>
            <path d="M78.9,43.16A17.71,17.71,0,1,1,96.6,25.45,17.73,17.73,0,0,1,78.9,43.16Zm0-32.42A14.71,14.71,0,1,0,93.6,25.45,14.73,14.73,0,0,0,78.9,10.74Z"></path>
            <path d="M78.9,37.09a1.5,1.5,0,0,1-1.5-1.5V16a1.5,1.5,0,0,1,3,0V35.59A1.5,1.5,0,0,1,78.9,37.09Z"></path>
            <path d="M88.71,27.28H69.08a1.5,1.5,0,0,1,0-3H88.71a1.5,1.5,0,0,1,0,3Z"></path>
          </g>
        </svg>
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
            <label className="titulo-input">Telefono</label>
          </div>
          <div className="entradatext">
            <input
              className="datos-inv"
              type="number"
              min={0}
              placeholder="ej +52"
              onChange={(event) => setTelefono(event.target.value)}
            ></input>
          </div>
        </div>
        <div className="text">
          <div className="t-in">
            <label className="titulo-input">Edad</label>
          </div>
          <div className="entradatext">
            <input
              className="datos-inv"
              type="number"
              min={0}
              placeholder="Edad"
              onChange={(event) => setEdad(event.target.value)}
            ></input>
          </div>
        </div>
      </div>
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
