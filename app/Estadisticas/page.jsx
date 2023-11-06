'use client'

import React from "react";
import Estilos from '@/styles/Estadistica.css';
import Bar from "@/components/Bar-1";
import Header from "@/components/Header";
import {closeBar,openBar } from '@/store/barSlice';
import { useSelector, useDispatch } from 'react-redux';
import Providers from '@/store/provider';
import Grafica from '@/components/Grafica';
import Grafica2 from '@/components/Grafica2';


export default function Estadistica() {
      
    //Logica para mandar y recibir los estados de la libreria "Redux"
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
      //Datos de simulacion
      const initialData = [12, 19, 3, 5, 2,10,3];

    return(
            <section className="Container">
                <div className="bar-1">
                    <Bar/>
                </div>
                <div className="Main-Second"  onClick={handleDivClick}>
                    <Header></Header>
                  <div className="Contenedor-Clientes">
                         <div className="Grafica-Contenedor">
                                <Grafica initialData={initialData} />
                          </div>
                  </div>
                  <div className="Contenedor-Envios">
                        <div className="Grafica-Contenedor">
                           <Grafica2 initialData={initialData}/>
                        </div>
                  </div>
                </div>
            </section>
    )
    
}



