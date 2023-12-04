"use client";
import Header from "@/components/Header";
import estilos from "@/styles/registrar.css";
import estios from "app/Home.css";
import Bar from "@/components/Bar-1";
import { closeBar, openBar } from "@/store/barSlice";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import stylos from "styles/Ventas.css";
import Axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import React, { useRef } from "react";
import io from "socket.io-client";
import "@/styles/Chat.css";
const Swal = require("sweetalert2");
export default function Home() {
  const { data: session } = useSession();
  const [usuario, setUsuario] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    setImage(session?.user.url);
    setUsuario(session?.user.persona[0].nombre);
  }, [session]);

  useEffect(() => {
    socketRef.current = io.connect("http://localhost:3001");

    socketRef.current.on("chat message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      const newMessage = { text: message, image, user: usuario };
      socketRef.current.emit("chat message", newMessage);
      setMessage("");
    }
  };

  //Logica para mandar y recibir los estados de la libreria "Redux"
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
  // carga el header una vez

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
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="chat-container">
            <ul className="message-list">
              {messages.map((message, index) => (
                <li key={index} className="message-item">
                  <img src={message.image} alt={message.user} />
                  <p>
                    {message.user}: {message.text}
                  </p>
                </li>
              ))}
            </ul>
            <form onSubmit={sendMessage} className="chat-form">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Escribe un mensaje"
              />
              <button>Enviar</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
