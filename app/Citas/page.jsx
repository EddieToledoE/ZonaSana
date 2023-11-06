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



function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <div className="tool">
      <button className="Agregar">Añadir Cita</button>
         
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
          border: '1px solid red', // Cambia 'border' y 'borderColor'
          color: 'red',
          marginLeft: '100px', // Cambia 'margingLeft' a 'marginLeft'
        }}
      </GridPagination>
    )
}

const rows = [
  
      {
        id: 3,
         Nombre: 'Nossdse',
        NCita: '38',
        Fecha: '05/12/2023',
        Hora: '12:00PM',
        ID:'111212111',
        Telefono:'9611239304'
      },
      {
        id: 4,
         Nombre: 'Nossdse',
        NCita: '38',
        Fecha: '05/12/2023',
        Hora: '12:00PM',
        ID:'111212111',
        Telefono:'9611239304'
      },
      {
        id: 5,
         Nombre: 'Nossdse',
        NCita: '38',
        Fecha: '05/12/2023',
        Hora: '12:00PM',
        ID:'111212111',
        Telefono:'9611239304'
      },
      {
        id: 6,
        Nombre: 'Nossdse',
        NCita: '38',
        Fecha: '05/12/2023',
        Hora: '12:00PM',
        ID:'111212111',
        Telefono:'9611239304'
      },
      {
        id: 7,
        Nombre: 'Nossdse',
        NCita: '38',
        Fecha: '05/12/2023',
        Hora: '12:00PM',
        ID:'111212111',
        Telefono:'9611239304'
      }, {
        id: 8,
        Nombre: 'Nossdse',
        NCita: '38',
        Fecha: '05/12/2023',
        Hora: '12:00PM',
        ID:'111212111',
        Telefono:'9611239304'
      },
      {
        id: 9,
        Nombre: 'Nossdse',
        NCita: '38',
        Fecha: '05/12/2023',
        Hora: '12:00PM',
        ID:'111212111',
        Telefono:'9611239304'
      }, {
        id: 10,
        Nombre: 'Nossdse',
        NCita: '38',
        Fecha: '05/12/2023',
        Hora: '12:00PM',
        ID:'111212111',
        Telefono:'9611239304'
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
           
            <div className="Tabla-Contenedor">
                    <div className="Tabla">
                    <DataGrid
                    columns={[
                    { field: 'Nombre', hideable: false, width: 200 },
                    { field: 'NCita', width: 200 },
                    { field: 'Fecha', width: 200 },
                    { field: 'Hora',width: 180 },
                    { field: 'ID',width: 180 },
                    { field: 'Telefono',  },
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