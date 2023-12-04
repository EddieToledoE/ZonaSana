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
  const protector = isBarOpen ? "protectorOpen" : "protector";

  return (
    <section className="Container">
      <Bar />
      <div className="Main-Second">
        <Header />
        <section className="seccion-contenido">
          <div className="contenido">
            <div className="contenido-registrar">
              <h1 className="h1_ajustes">REGISTRAR NUEVO EMPLEADO</h1>
              <form className="formulario-registro" onSubmit={handleSubmit}>
                <div className="contenedor-formulario">
                  <section className="seccion-izquierda">
                    <h2 className="h2_ajustes">Datos empleado</h2>
                    <label className="label_Ajustes" htmlFor="nombre">
                      <h3 className="h3_ajustes">Nombre</h3>
                      <input
                        className="Ajustes_input"
                        type="text"
                        placeholder="Nombre"
                        name="nombre"
                        id="nombre"
                      />
                    </label>
                    <label className="label_Ajustes" htmlFor="apellido">
                      <h3 className="h3_ajustes">Apellido</h3>
                      <input
                        className="Ajustes_input"
                        type="text"
                        placeholder="Apellido"
                        name="apellido"
                        id="apellido"
                      />
                    </label>
                    <label className="label_Ajustes" htmlFor="puesto">
                      <h3 className="h3_ajustes">Puesto</h3>
                      <select
                        className="Ajustes_input"
                        name="puesto"
                        id="puesto"
                      >
                        <option value="Gerente">Gerente</option>
                        <option value="Vendedor">Vendedor</option>
                      </select>
                    </label>
                  </section>
                  <section className="seccion-derecha">
                    <h2 className="h2_ajustes">Datos usuario</h2>
                    <label className="label_Ajustes" htmlFor="email">
                      <h3 className="h3_ajustes">Email</h3>
                      <input
                        className="Ajustes_input"
                        type="email"
                        placeholder="Email"
                        name="email"
                        id="email"
                      />
                    </label>
                    <label className="label_Ajustes" htmlFor="contraseña">
                      <h3 className="h3_ajustes">Contraseña</h3>
                      <input
                        className="Ajustes_input"
                        type="password"
                        placeholder="Contraseña"
                        name="contraseña"
                        id="contraseña"
                      />
                    </label>
                    {error && (
                      <label className="label_Ajustes">
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
