"use client";
import { useState } from "react";
import "styles/Login.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import axios, { AxiosError } from "axios";
const Swal = require("sweetalert2");

export default function page() {
  const [ingresar, setIngresar] = useState(true);
  const [recuperarC, setRecuperarC] = useState(false);
  const [olvidado, setOlvidado] = useState("");
  const handleOlvidado = async (e) => {
    e.preventDefault();
    console.log(olvidado);
    if (olvidado === "") {
      setError("Ingresa un correo electrónico válido");
    }
    try {
      const respuesta = await axios.put(`/api/auth/pass/${olvidado}`);
      if (respuesta.data) {
        Swal.fire(
          "Enviado",
          "Se ha enviado una nueva contraseña al correo:" + olvidado,
          "success"
        );
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ha ocurrido un error ,",
        });
      }
    }
  };
  const recuperarContraseña = (e) => {
    e.preventDefault();
    setIngresar(false);
    setRecuperarC(true);
  };

  const regresarLogin = (e) => {
    e.preventDefault();
    setIngresar(true);
    setRecuperarC(false);
  };

  const [error, setError] = useState("");
  const router = useRouter();
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setError("");
    setCargando(true);
    try {
      const res = await signIn("credentials", {
        email: formData.get("email"),
        contraseña: formData.get("contraseña"),
        redirect: false,
      });
      if (res?.error) {
        setCargando(false);
        return setError(res.error);
      }
      if (res?.ok) {
        return router.push("/menu");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="login">
      <section className="seccion-izquierda">
        <div className="contenido-izquierda">
          <h1 className="h1-1">Zona sana</h1>
          <Image
            className="imagen"
            alt="Logo"
            src={"/logo.png"}
            width={400}
            height={400}
          />
          <h1>Terapias Integrativas</h1>
        </div>
      </section>
      <section className="seccion-derecha">
        {/* Contenido de Iniciar Sesión */}
        {ingresar && (
          <div className="contenido-derecha">
            <div className="encabezado">
              <div className="contenido-encabezado">
                <Image
                  alt="user"
                  src={"/usuario.png"}
                  width={50}
                  height={50}
                  className="user"
                />{" "}
                <br />
                <br />
                <h2 className="h2-2">Inicio de sesión</h2> <br />
                <span>BIENVENIDO, Ingresa tus credenciales</span>
              </div>
            </div>
            <br />
            <br />
            <form onSubmit={handleSubmit} className="formulario" action="">
              <div className="campos">
                <label htmlFor="usuario">
                  <div className="contenedor-input">
                    <input
                      id="usuario"
                      name="email"
                      type="text"
                      placeholder="Correo"
                    />
                    <Image
                      alt="user"
                      src={"/correo.png"}
                      width={24}
                      height={24}
                      className="user"
                    />
                  </div>
                </label>
                <br />
                <br />
                <label htmlFor="contraseña">
                  <div className="contenedor-input">
                    <input
                      id="contraseña"
                      name="contraseña"
                      type="password"
                      placeholder="Contraseña"
                    />
                    <Image
                      alt="user"
                      src={"/bloquear.png"}
                      width={24}
                      height={24}
                      className="user"
                    />
                  </div>
                </label>
                <br /> <br />
                <label className="recordar" htmlFor="recordar">
                  <button
                    type="button"
                    className="a-a"
                    onClick={recuperarContraseña}
                  >
                    Olvidé mi contraseña
                  </button>
                </label>
                <br />
                <br />
                <button className="button1"> Ingresar</button>
                <br />
                <br />
                {cargando && (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      paddingBottom: "15px",
                    }}
                  >
                    <div className="cargando"></div>
                  </div>
                )}
                {error && <div className="alerta-incorrecta">{error}</div>}
                <div className="imagen-debajo">
                  <Image
                    className="imagen"
                    alt="Logo"
                    src={"/logo.png"}
                    width={100}
                    height={100}
                  />
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Contenido del Recuperar contraseña */}
        {recuperarC && (
          <div className="contenido-derecha">
            <div className="encabezado">
              <div className="contenido-encabezado">
                <Image
                  alt="user"
                  src={"/usuario.png"}
                  width={50}
                  height={50}
                  className="user"
                />{" "}
                <br />
                <br />
                <h2 className="h2-2">Recuperar contraseña</h2> <br />
                <br />
                <span>
                  A continuación ingresa tu corrreo para recuperar tu cuenta
                </span>
              </div>
            </div>
            <br />
            <br />
            <form className="formulario" onSubmit={handleOlvidado}>
              <div className="campos">
                <label htmlFor="usuario">
                  <div className="contenedor-input">
                    <input
                      id="usuario"
                      name="emailolvidado"
                      type="text"
                      onChange={(e) => setOlvidado(e.target.value)}
                      placeholder="Correo"
                    />
                    <Image
                      alt="user"
                      src={"/correo.png"}
                      width={24}
                      height={24}
                      className="user"
                    />
                  </div>
                </label>{" "}
                <br /> <br />
                <div className="botones-rc">
                  <button
                    className="button2"
                    type="button"
                    onClick={regresarLogin}
                  >
                    Regresar
                  </button>
                  <button className="button3">Enviar</button>
                </div>
                <br />
                <br />
                {/* {cargando && <div style={{ width: '100%', display: 'flex', justifyContent: 'center', paddingBottom: '15px' }}>
                <div className="cargando"></div>
              </div>}
              {error && <div className="alerta-incorrecta">
                {error}
              </div>} */}
                {error && <div className="alerta-incorrecta">{error}</div>}
                <div className="imagen-debajo">
                  <Image
                    className="imagen"
                    alt="Logo"
                    src={"/logo.png"}
                    width={100}
                    height={100}
                  />
                </div>
              </div>
            </form>
          </div>
        )}
      </section>
    </div>
  );
}
