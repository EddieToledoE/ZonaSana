
import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function CustomInputAutocomplete() {
  const [productos, setProductos] = useState([]);

useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await axios.get("/api/auth/producto");
        setProductos(response.data);
      } catch (error) {
        console.error("Error al obtener la lista de productos:", error);
      }
    };

    obtenerProductos();
  }, []);


  const router = useRouter();
  function enter(event) {
   
    if (event.key === 'Enter') {
      // Ejecutar la acción que desees al presionar Enter aquí
      console.log('Se presionó la tecla Enter');
     // navigation.navigate(`/Menu`);
      const inv = productos.name
      navigation.navigate(`/Inventario`);
    // Realizar una llamada a función, ejecutar un código, etc.
    }
  }
 
 
  return (
      <Autocomplete
       onKeyDown={enter}
        sx={{
          display: 'inline-block',
          '& input': {
            width: '100%',
            height: 40,
            bgcolor: '',
            border:'none',
            color: (theme) =>
              theme.palette.getContrastText(theme.palette.background.paper),
          },
        }}
        style={{width:'100%',border:'none'}}
        id="custom-input-demo"
        options={productos}
        getOptionLabel={(option)=>option.nombre}
        renderInput={(params) =>  (
          <div ref={params.InputProps.ref}>
            <input type="text" {...params.inputProps}
             placeholder=' Busca un producto' />
          </div>
        )}
      />
  
  );
}

