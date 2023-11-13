import estilos from '@/styles/registrar.css'
import React from 'react'
import Image from 'next/image'

const registrar =({ onCambioClick })=> {
  return (
    <div className='RegistrarMain'>
        <div className='titulor'>
            <h3>Realizar un envio</h3>
        </div>
        <div className='Main-items'>
            <div className='Imagen-producto'>
                <Image
                width={40}
                height={40}
                />

            </div>
           
        </div>
        <div className='Entradas-datos'>
            <div className='text'>
                <div className='t-in'>
                <label className='titulo-input'>Selecciona el paquete</label>
                </div>
                <div className='entradatext'>
                     <input className='datos-inv' type='text' placeholder='Ej. pomada verde'>
                    </input>
                </div>
            </div>
            <div className='text'>
                <div className='t-in'>
                <label className='titulo-input'>Fecha</label>
                </div>
                <div className='entradatext'>
                     <input className='datos-inv' type='text' placeholder='Ingresa el ID'>
                    </input>
                </div>
            </div>
            <div className='text'>
                <div className='t-in'>
                <label className='titulo-input'>Categoria:</label>
                </div>
                <div className='entradatext'>
                     <input className='datos-inv' type='text' placeholder='Selecciona una Categoria'>
                    </input>
                </div>
            </div>
            <div className='text'>
                <div className='t-in'>
                <label className='titulo-input'>Precio Compra:</label>
                </div>
                <div className='entradatext'>
                     <input className='datos-inv' type='text' placeholder='Precio Compra'>
                    </input>
                </div>
            </div>
            <div className='text'>
                <div className='t-in'>
                <label className='titulo-input'>Cantidad:</label>
                </div>
                <div className='entradatext'>
                     <input className='datos-inv' type='text' placeholder='3'>
                    </input>
                </div>
            </div>
            <div className='text'>
                <div className='t-in'>
                <label className='titulo-input'>Precio Venta:</label>
                </div>
                <div className='entradatext'>
                     <input className='datos-inv' type='text' placeholder='Ingresa el precio de venta'>
                    </input>
                </div>
            </div>
            <div className='text'>
                <div className='t-in'>
                <label className='titulo-input'>Fecha Registro:</label>
                </div>
                <div className='entradatext'>
                     <input className='datos-inv' type='text' placeholder='00/00/0000'>
                    </input>
                </div>
            </div>
            
        </div>
        <div className='botonesr'>
            <button className='cancelar' onClick={onCambioClick}>
                    Cancelar
            </button>
            <button className='submit' >
                Agregar
              
            </button>
        </div>


    </div>
  )
}

export default registrar