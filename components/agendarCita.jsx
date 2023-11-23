import estilos from "@/styles/registrar.css";
import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import es from "react-phone-number-input/locale/es.json";
const Swal = require("sweetalert2");
import Axios, { AxiosError } from "axios";
import Image from "next/image";

const registrar = ({ onCambioClick }) => {

  const [pacientes, setPacientes] = useState([]);
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState();
  const [fecha_hora, setFecha_hora] = useState("");

  

  const agendarCita = async (e) => {
    e.preventDefault();
    if (pacienteSeleccionado == "" || fecha_hora == "") {
      Swal.fire(
        'No se agendo la cita',
        'Asegurese que no hallan campos vacios',
        'error'
      )
    } else {
      await Axios.post("/api/auth/cita", {
        paciente_id: pacienteSeleccionado,
        fecha: fecha_hora,
        pendiente: true
      }).then(() => {
        Swal.fire(
          'Guardado',
          'La cita se guardo correctamente',
          'success'
        )
      })
    }

  }

  const obtenerPacientes = async () => {
    try {
      const response = await Axios.get("/api/auth/paciente");
      setPacientes(response.data);
    } catch (error) {
      console.error("Error al obtener la lista de pacientes:", error);
    }
  }

  return (

    <div className="RegistrarMain">
      <div className="titulor">
        <h3>Agendar Cita</h3>
      </div>
      <div className="Main-items">
        <Image style={{ boxSizing: 'border-box', paddingTop: '15px' }} src={"/icono-calendario.png"} width={80} height={80} />
      </div>
      <div className="Entradas-datos">
        <div className="text">
          <div className="t-in">
            <label className="titulo-input">Paciente</label>
          </div>
          <div className="entradatext">
            <select
              className="datos-inv"
              id="paciente"
              value={pacienteSeleccionado}
              onClick={obtenerPacientes}
              onChange={(event) => setPacienteSeleccionado(event.target.value)}
            >
              <option value="">Selecciona un paciente</option>
              {pacientes.map((paciente) => (
                <option key={paciente._id} value={paciente._id}>
                  {paciente.nombre} {paciente.apellido} {paciente.edad} {" años"}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="text">
          <div className="t-in">
            <label className="titulo-input">Fecha y hora de cita</label>
          </div>
          <div className="entradatext">
            <input
              onChange={(event) => { setFecha_hora(event.target.value) }}
              className="datos-inv"
              id='fecha'
              type="datetime-local" />
          </div>
        </div>
        <div className="text"></div>
        <div className="titulor">
          <h3 style={{ fontSize: '15px',cursor:'default' }}>¿No encuentra a su paciente? Puede añadir un nuevo paciente en la sección derecha</h3>
        </div>
      </div>
      <div className="botonesr">
        <button className="cancelar" onClick={onCambioClick}>
          Cancelar
        </button>
        <button onClick={agendarCita} className="submit">
          Agregar
        </button>
      </div>
    </div>
  );
};

export default registrar;
