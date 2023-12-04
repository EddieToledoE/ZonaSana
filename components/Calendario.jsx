"use client"
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';
import Swal from 'sweetalert2';
import Axios from 'axios';
import { format, parseISO } from 'date-fns';
import React, { useEffect, useState } from 'react'

const Calendario = () => {

  const [eventos, setEventos] = useState("");

  useEffect(() => {
    cargarEventos();
  }, [])

  const cargarEventos = async () => {
    Axios.get("api/auth/cita")
      .then(response  => {
        const data = response.data;
        console.log(response.data)
        const eventosFormateados = data.map(evento => {
          if (evento.pendiente) {
            console.log(evento.paciente_id.nombre)
            return ({
              title: "Cita con " + evento.paciente_id.nombre + " " + evento.paciente_id.nombre,
              start: evento.fecha,
              color: "#d99a13",
              cita_id: evento._id,
              paciente_id: evento.paciente_id,
              pendiente: evento.pendiente,
              nombre : evento.paciente_id.nombre,
              apellido : evento.paciente_id.apellido  
            })
          } else {
            return ({
              title: "Cita con " + evento.paciente_id.nombre + " " + evento.paciente_id.nombre,
              start: evento.fecha,
              color: "#12B76A",
              cita_id: evento._id,
              paciente_id: evento.paciente_id,
              pendiente: evento.pendiente,
              nombre : evento.paciente_id.nombre,
              apellido : evento.paciente_id.apellido             
            })
          }
        })
        console.log("Eventos formateados" + eventosFormateados)
        setEventos(eventosFormateados);
      })
      .catch(error => {
        console.error("Error al obtener los eventos de tipo cita:", error);
      });
  };


  const handleEventClick = async (arg) => {
    const cita_id = arg.event.extendedProps.cita_id;
    const evento_pendiente = arg.event.extendedProps.pendiente;
    const nombre = arg.event.extendedProps.nombre;
    const apellido = arg.event.extendedProps.apellido;
    if (evento_pendiente) {
      const confirmacionEliminar = await Swal.fire({
        icon: 'warning',
        title: "Cita Pendiente ",
        html: `¿Desea eliminar la cita de ${nombre} ${apellido} ?`,
        showCancelButton: true,
        confirmButtonColor: '#d33',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Volver',
      });
      if (confirmacionEliminar.isConfirmed) {
        try {
          await Axios.delete(`/api/auth/cita/${cita_id}`);
          cargarEventos();
          Swal.fire(
            'Eliminado',
            'El evento se eliminó correctamente',
            'success'
          );
        } catch (error) {
          console.error("Error al eliminar la cita:", error);
          Swal.fire(
            'Error',
            'Hubo un problema al eliminar la cita',
            'error'
          );
        }
      }
    } else {
      Swal.fire({
        icon: 'success',
        title: "Cita Atendida",
        html: `Cita atendida del paciente ${nombre} ${apellido}`,
        confirmButtonColor: "#1eaa74",
      });
    }
  };


  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
      eventClick={handleEventClick}
      dayMaxEvents={2}
      unselectAuto='true'
      selectMirror='true'
      locale={esLocale}
      footerToolbar={{
        start: "today prev,next",
        center: "",
        end: "dayGridMonth,timeGridWeek,listWeek"
      }}
      headerToolbar={{
        start: "",
        center: "title",
        end: ""
      }}
      buttonText={{
        today: 'Hoy',
        month: 'Meses',
        week: 'Semanas',
        day: 'Dias',
        list: 'Listas'
      }}
      selectOverlap='true'
      events={eventos}
      height={'65vh'}
    />
  )
}

export default Calendario