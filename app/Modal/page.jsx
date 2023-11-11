"use client"
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import '@/styles/registrar2.css'
import Image from 'next/image'

const AutoCloseModal = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
        // setTimeout(() => {
        //   setOpen(false);
        // }, 3000); // 3000 milisegundos = 3 segundos
    };

    const handleClose = (e) => {
        e.preventDefault()
        setOpen(false);
    }

    return (
        <div>
            <Button onClick={handleOpen}>Open Modal</Button>
            <Modal open={open} onClose={handleClose}>
                <div className='container-main'>
                    <div style={{width : '100%'}}>
                        <div className='titulor'>
                            <h3>Nuevo Producto</h3>
                        </div>
                        <div className='Entradas-datos'>
                            <div className='text'>
                                <div className='t-in'>
                                    <label className='titulo-input'>Nombre Producto:</label>
                                </div>
                                <div className='entradatext'>
                                    <input className='datos-inv' type='text' placeholder='Ej. pomada verde'>
                                    </input>
                                </div>
                            </div>
                            <div className='text'>
                                <div className='t-in'>
                                    <label className='titulo-input'>Producto ID:</label>
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
                            <button className='cancelar' onClick={handleClose}>
                                Cancelar
                            </button>
                            <button className='submit' >
                                Agregar
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default AutoCloseModal;
