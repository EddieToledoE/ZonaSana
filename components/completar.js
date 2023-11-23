import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function CustomInputAutocomplete() {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

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
    // Ejecutar la acción que desees al presionar Enter aquí
    if (event.key === "Enter") {
      console.log(productoSeleccionado._id);
      // navigation.navigate(`/Menu/Inventario/detalles`);
      navigation.navigate(`/inventario/${productoSeleccionado._id}`);
    }
  }

  const handleOnChange = (event, newValue) => {
    setProductoSeleccionado(newValue); // Actualizar el estado con el nuevo producto seleccionado
  };

  return (
    <Autocomplete
      onKeyDown={enter}
      sx={{
        display: "inline-block",
        "& input": {
          width: "100%",
          height: 40,
          bgcolor: "",
          border: "none",
          color: (theme) =>
            theme.palette.getContrastText(theme.palette.background.paper),
        },
      }}
      style={{ width: "100%", border: "none" }}
      id="custom-input-demo"
      options={productos}
      getOptionLabel={(option) => option.nombre} // Mostrar el nombre del producto
      value={productoSeleccionado} // Establecer el producto seleccionado
      onChange={handleOnChange} // Manejar el cambio de producto
      renderInput={(params) => (
        <div ref={params.InputProps.ref}>
          <input
            type="text"
            {...params.inputProps}
            placeholder={productoSeleccionado ? "" : "Selecciona un producto"}
          />
        </div>
      )}
    />
  );
}
