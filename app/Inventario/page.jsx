'use client'
import React from "react";
import estilos from '@/styles/inventario.css'
import Bar from "@/components/Bar-1";
import {closeBar,openBar } from '@/store/barSlice';
import { useSelector, useDispatch } from 'react-redux';
import Providers from '@/store/provider';
import Header from "@/components/Header";
import { DataGrid, GridColumnHeaderFilterIconButton, GridPagination, GridToolbar, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import {GridToolbarContainer,GridToolbarDensitySelector,} from '@mui/x-data-grid';
import { Grid } from "@mui/material";
import registrarEsti from '@/styles/registrar.css'
import Registrar from '@/components/registrarInv'
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
  //Funcion para el toolbar
  function boton() {
    alert("Viva Tiktok");
    
  }
//Estilos para la tabla 
// Función para personalizar la traducción del botón de filtro

function registrar() {  
return (
  <div className="A1">
    <h1>Hola sdad es una ventana para poder registrar</h1>
  <div> Holaaaaa</div>
  </div>

);
}

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <div className="tool">
      <button  className="Agregar">Añadir Producto</button>
         
         <div className="filtro-boton"> 
             <div className="svg-b">
             <svg className="fil" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M5 10H15M2.5 5H17.5M7.5 15H12.5" stroke="#5D6679" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
             </svg>
             </div>
             <div className="titulo-boton">
               <label className="f">Filtro</label>
             </div>
             <div className="boton">
             <GridToolbarFilterButton/>
             </div>
              </div>
         
               <div className="Descargar">
                  <label className="D">Descargar</label>
                  <div className="buttonD">
                  <GridToolbarExport></GridToolbarExport>
                  </div> 
               </div> 
      </div>
    </GridToolbarContainer>
  );
}
function Pagination() {
    return(
      <GridPagination>
        sx={{
          borderColor: 'blue', // Cambia 'boderColor' a 'borderColor'
          border: 22, // Cambia 'border' y 'borderColor'
          color: 'red',
          marginLeft: '100px', // Cambia 'margingLeft' a 'marginLeft'
        }}
      </GridPagination>
    )
}

const rows = [
    {
      id: 1,
      Nombre: 'Nodasdse',
      PrecioCompra: '$38',
      Cantidad: '43 Paquetes',
      PrecioVenta: '12.00',
      ID:'111111',
      Disponibilidad:'en stock'
    },
    {
        id: 2,
        Nombre: 'Ndsadose',
        PrecioCompra: '$38',
        Cantidad: '43 Paquetes',
        PrecioVenta: '12.00',
        ID:'111111',
        Disponibilidad:'En stock'
      },
      {
        id: 3,
        Nombre: 'Nosdsade',
        PrecioCompra: '$38',
        Cantidad: '43 Paquetes',
        PrecioVenta: '12.00',
        ID:'111111',
        Disponibilidad:'en stock'
      },
      {
        id: 4,
        Nombre: 'Nossdse',
        PrecioCompra: '$38',
        Cantidad: '43 Paquetes',
        PrecioVenta: '12.00',
        ID:'11111313342111',
        Disponibilidad:'En stock'
      },
      {
        id: 5,
        Nombre: 'Holaaae',
        PrecioCompra: '$38',
        Cantidad: '43 Paquetes',
        PrecioVenta: '12.00',
        ID:'11121211111',
        Disponibilidad:'En stock'
      },
      {
        id: 6,
        Nombre: 'Nossdse',
        PrecioCompra: '$38',
        Cantidad: '43 Paquetes',
        PrecioVenta: '12.00',
        ID:'111212111',
        Disponibilidad:'En stock'
      },
      {
        id: 7,
        Nombre: 'Nossdse',
        PrecioCompra: '$38',
        Cantidad: '43 Paquetes',
        PrecioVenta: '12.00',
        ID:'111212111',
        Disponibilidad:'En stock'
      }, {
        id: 8,
        Nombre: 'Nossdse',
        PrecioCompra: '$38',
        Cantidad: '43 Paquetes',
        PrecioVenta: '12.00',
        ID:'111212111',
        Disponibilidad:'En stock'
      },
      {
        id: 9,
        Nombre: 'Nossdse',
        PrecioCompra: '$38',
        Cantidad: '43 Paquetes',
        PrecioVenta: '12.00',
        ID:'111212111',
        Disponibilidad:'En stock'
      }, {
        id: 10,
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
                <div className="Registrar-Contenedor">
                   <Registrar></Registrar>
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
                       toolbar:CustomToolbar,
                       pagination:Pagination
                    }}
                    localeText={{
                      footerPagination: 'Página {{page}} de {{pageCount}}',
                      filterOperatorAfter: 'Filtro',
                      toolbarFiltersLabel:'filtro'
                       // Personaliza el mensaje de paginación
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



