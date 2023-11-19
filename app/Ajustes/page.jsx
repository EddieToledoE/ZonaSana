"use client";
import Axios, { AxiosError } from "axios";
import { FormEvent, useState } from "react";
import Bar from "@/components/Bar-1";
import Header from "@/components/Header_ajustes";
import "@/styles/Ajustes.css";
import { useSelector, useDispatch } from "react-redux";
import { closeBar, openBar } from "@/store/barSlice";

export default function Registro() {
  const [error, setError] = useState();

  const [error, setError] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.currentTarget;
    const formdata = new FormData(e.currentTarget);
    const persona = [
      {
        nombre: formdata.get("nombre"),
        apellido: formdata.get("apellido"),
        puesto: formdata.get("puesto"),
      },
    ];

    try {
      const res = await Axios.post("/api/auth/registro", {
        email: formdata.get("email"),
        contraseña: formdata.get("contraseña"),
        persona: persona,
      });
      if (res.data) {
        console.log(res.data);
      } else {
        console.log("La respuesta no contiene datos JSON válidos.");
      }

      console.log(res);
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
      }
    }
  };
      //Implementacion de metodo para ocultar la barra
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
      const protector = isBarOpen ? 'protectorOpen' : 'protector';

  return (
    <section className="Container">
      <Bar />
      <div className="Main-Second">
        <Header />
        <section className="seccion-contenido">
          <div className="contenido">
            <div className="contenido-registrar">
              <h1>REGISTRAR NUEVO EMPLEADO</h1>
              <form className="formulario-registro" onSubmit={handleSubmit}>
                <div className="contenedor-formulario">
                  <section className="seccion-izquierda">
                    <h2>Datos empleado</h2>
                    <label htmlFor="nombre">
                      <h3>Nombre</h3>
                      <input
                        type="text"
                        placeholder="Nombre"
                        name="nombre"
                        id="nombre"
                      />
                    </label>
                    <label htmlFor="apellido">
                      <h3>Apellido</h3>
                      <input
                        type="text"
                        placeholder="Apellido"
                        name="apellido"
                        id="apellido"
                      />
                    </label>
                    <label htmlFor="puesto">
                      <h3>Puesto</h3>
                      <input
                        type="text"
                        placeholder="Puesto"
                        name="puesto"
                        id="puesto"
                      />
                    </label>
                  </section>
                  <section className="seccion-derecha">
                    <h2>Datos usuario</h2>
                    <label htmlFor="email">
                      <h3>Email</h3>
                      <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        id="email"
                      />
                    </label>
                    <label htmlFor="contraseña">
                      <h3>Contraseña</h3>
                      <input
                        type="password"
                        placeholder="Contraseña"
                        name="contraseña"
                        id="contraseña"
                      />
                    </label>
                    {error && (
                      <label>
                        <div className="alerta-incorrecta">{error}</div>
                      </label>
                    )}
                  </section>
                </div>
                <div style={{ boxSizing: "border-box", paddingTop: "6vh" }}>
                  <button className="boton-registrar">REGISTRAR</button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
      <div className={protector} onClick={handleDivClick}></div>
    </section>
  );
}
