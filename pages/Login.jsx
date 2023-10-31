import React from 'react'
import 'styles/Login.css'
import Image from 'next/image'
import Link from 'next/link'

export default function page() {
  return (
    <div className='login'>
      <section className='seccion-izquierda'>
        <h1 className='h1-1'>Zona sana</h1>
      </section>
      <section className='seccion-derecha'>
        <div className='informacion1'>
          <div className='encabezado'>
            <Image src={"/usuario.png"} width={24} height={24} />
            <h2 className='h2-2'>Ingresa a tu cuenta</h2>
            <span>Bienvenido, Ingresa tus credenciales</span>
          </div>
          <br /><br />
          <form className='formulario' action="">
            <div className='campos'>
              <label htmlFor="usuario">
                <h4 className='h4-4'>Usuario:</h4>
                <input id='usuario' type="text" placeholder='Usuario' />
              </label><br /><br />
              <label htmlFor="contraseña">
                <h4 className='h4-4'>Contraseña:</h4>
                <input id='contraseña' type="password" placeholder='Contraseña' />
              </label><br /> <br />
              <label className='recordar' htmlFor="recordar">
                <div className='recordar'>
                  <input id="recordar" type="checkbox" /><h5>Recordar</h5>
                </div>
                <a className="a-a" href="">Olvide mi contraseña</a>
              </label> <br />
              <Link href="/Menu">
                <button className='button1' > Ingresar</button><br /><br />
              </Link>
              <div className='crear'>
                <h5 className='no-cuenta'>¿No tienes cuenta? </h5> <a href=""> Crear</a>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}
