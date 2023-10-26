'use client'
import React from "react";
import estilos from '@/styles/inventario.css'
import Bar from "@/pages/Bar-1";
import {closeBar,openBar } from '@/store/barSlice';
import { useSelector, useDispatch } from 'react-redux';
import Providers from '@/store/provider';
import Header from "@/pages/Header";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';



export default function Inventario(){
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
    const main = isBarOpen ? 'hola-true':'hola';
    const inv = isBarOpen ? 'inv-open':'inv';
//Logica para la Tabla 
const rows = [
    {
      id: 1,
      Nombre: 'Nodasdse',
      PrecioCompra: '$38',
      Cantidad: '43 Paquetes',
      PrecioVenta: '12.00',
      ID:'111111',
      Disponibiidad:'en stock'
    },
    {
        id: 1,
        Nombre: 'Ndsadose',
        PrecioCompra: '$38',
        Cantidad: '43 Paquetes',
        PrecioVenta: '12.00',
        ID:'111111',
        Disponibiidad:'en stock'
      },
      {
        id: 1,
        Nombre: 'Nosdsade',
        PrecioCompra: '$38',
        Cantidad: '43 Paquetes',
        PrecioVenta: '12.00',
        ID:'111111',
        Disponibiidad:'en stock'
      },
      {
        id: 1,
        Nombre: 'Nossdse',
        PrecioCompra: '$38',
        Cantidad: '43 Paquetes',
        PrecioVenta: '12.00',
        ID:'111212111',
        Disponibilidad:'En stock'
      },
      {
        id: 1,
        Nombre: 'Nossdse',
        PrecioCompra: '$38',
        Cantidad: '43 Paquetes',
        PrecioVenta: '12.00',
        ID:'111212111',
        Disponibilidad:'En stock'
      },
      {
        id: 1,
        Nombre: 'Nossdse',
        PrecioCompra: '$38',
        Cantidad: '43 Paquetes',
        PrecioVenta: '12.00',
        ID:'111212111',
        Disponibilidad:'En stock'
      },
      {
        id: 1,
        Nombre: 'Nossdse',
        PrecioCompra: '$38',
        Cantidad: '43 Paquetes',
        PrecioVenta: '12.00',
        ID:'111212111',
        Disponibilidad:'En stock'
      }, {
        id: 1,
        Nombre: 'Nossdse',
        PrecioCompra: '$38',
        Cantidad: '43 Paquetes',
        PrecioVenta: '12.00',
        ID:'111212111',
        Disponibilidad:'En stock'
      },
      {
        id: 1,
        Nombre: 'Nossdse',
        PrecioCompra: '$38',
        Cantidad: '43 Paquetes',
        PrecioVenta: '12.00',
        ID:'111212111',
        Disponibilidad:'En stock'
      }, {
        id: 1,
        Nombre: 'Nossdse',
        PrecioCompra: '$38',
        Cantidad: '43 Paquetes',
        PrecioVenta: '12.00',
        ID:'111212111',
        Disponibilidad:'En stock'
      },
  ];
   
  //Estilos para la tabla 

        return(
            <section className="Home">
                <div className='bar1' >
                <Bar/>
                </div>   
                <div className={main} onClick={handleDivClick}>
                    <Header></Header>
                <div className={inv}>
                    <div className="informacion">
                       <h3 className="inv-titulo">Inventario General</h3>
                    </div>
                    <div className="inv-inf">
                        <div className="inv-inf1">
                            <div className="Categorias">
                                  <h3 className="titulo" style={{color:'#12B76A'}} >Categorias</h3>
                                  <h4 className="cantidad">121</h4>  
                            </div>
                            <div className="linea"></div>
                            <div className="Total-P">
                                  <h3 className="titulo" style={{color:'#E19133'}}>Total Productos</h3>
                                  <h4 className="cantidad">241</h4>  
                            </div>
                        </div>
                        
                        <div className="inv-inf2">
                        <div className="linea"></div>
                        <div className="Categorias">
                                  <h3 className="titulo" style={{color:'#448DF2'}}>Mas vendido</h3>
                                  <h4 className="cantidad">21</h4>  
                            </div>
                            <div className="linea"></div>
                            <div className="Total-P">
                                  <h3 className="titulo" style={{color:'#F36960'}}  >Poco Stock</h3>
                                  <h4 className="cantidad">341</h4> 
                                   
                            </div>
                        </div>
                    </div>

                </div>
            <div className="Tabla-Contenedor">
                    <div className="Tabla">
                    <DataGrid
                    columns={[
                      
                    { field: 'Nombre', hideable: false, width: 200 },
                    { field: 'PrecioCompra', width: 200 },
                    { field: 'Cantidad', width: 200 },
                    { field: 'PrecioVenta',width: 180 },
                    { field: 'ID',width: 180 },
                    { field: 'Disponibilidad',  },
                    ]}
                    rows={rows}
                    slots={{
                    // toolbar: GridToolbar,
                    }}
                    sx={{
                        boxShadow: 0,
                        borderRadius: 2,
                        borderColor: '#FFF'
                      }}
                    /> 
                    </div>
                </div>
                </div>




            </section>
        )
}