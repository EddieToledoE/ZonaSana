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
            <label className="titulo-input">Telefono</label>
          </div>
          <div className="entradatext">
            <PhoneInput
              className="datos-telefono"
              placeholder="Número de teléfono"
              defaultCountry="MX"
              international
              value={telefono}
              labels={es}
              onChange={setTelefono}
            />
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
        <div className="text">
          <div className="t-in">
            <label className="titulo-input">Codigo de recomendación</label>
          </div>
          <div className="entradatext">
            <input
              className="datos-inv"
              type="number"
              placeholder="Codigo de recomendación"
              onChange={(event) => setCodigoajeno(event.target.value)}
            ></input>
          </div>
        </div>
        <div className="text">
          <div className="t-in">
            <label className="titulo-input">
              Codigo de recomendación propio
            </label>
          </div>
          <div className="entradatext">
            <input
              className="datos-inv"
              type="number"
              placeholder="Codigo de recomendación propio"
              onChange={(event) => setCodigopropio(event.target.value)}
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
