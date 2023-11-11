"use client";
import { FormEvent, useState } from "react";
import "styles/Login.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function page() {
  const [error, setError] = useState("");
  const router = useRouter();
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    setError("")
    setCargando(true);
    try {
      const res = await signIn("credentials", {
        email: formData.get('email'),
        contraseña: formData.get('contraseña'),
        redirect: false

      })
      if (res?.error) {
        setCargando(false)
        return setError(res.error as string)
      }
      if (res?.ok){

        return router.push("/Menu")
      }


    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="login">
      <section className="seccion-izquierda">
        <h1 className="h1-1">Zona sana</h1>
      </section>
      <section className="seccion-derecha">
        <div className="informacion1">
          <div className="encabezado">
            <Image alt="Logo" src={"/usuario.png"} width={24} height={24} />
            <h2 className="h2-2">Ingresa a tu cuenta</h2>
            <span>Bienvenido, Ingresa tus credenciales</span>
          </div>
          <br />
          <br />
          <form onSubmit={handleSubmit} className="formulario" action="">
            <div className="campos">
              <label htmlFor="usuario">
                <h4 className="h4-4">Usuario:</h4>
                <input
                  id="usuario"
                  name="email"
                  type="text"
                  placeholder="Usuario"
                />
              </label>
              <br />
              <br />
              <label htmlFor="contraseña">
                <h4 className="h4-4">Contraseña:</h4>
                <input
                  id="contraseña"
                  name="contraseña"
                  type="password"
                  placeholder="Contraseña"
                />
              </label>
              <br /> <br />
              <label className="recordar" htmlFor="recordar">
                <div className="recordar">
                  <input id="recordar" type="checkbox" />
                  <h5 className="h5-5">Recordar</h5>
                </div>
                <a className="a-a" href="">
                  Olvide mi contraseña
                </a>
              </label>{" "}
              <br />
              {cargando && <div style={{width: '100%', display: 'flex', justifyContent: 'center', paddingBottom: '15px'}}>
                <div className="cargando"></div>
              </div>}
              {error && <div className="alerta-incorrecta">
                {error}
              </div>}
              <button className="button1"> Ingresar</button>
              <br />
              <br />
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
