"use client";
import Axios, {AxiosError} from "axios";
import { FormEvent, useState } from "react";
export default function Registro() {

   const [error,setError] = useState()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.currentTarget;
    const formdata = new FormData(e.currentTarget);
      const persona = [{
         nombre: formdata.get("nombre"),
         apellido: formdata.get("apellido"),
         puesto : formdata.get("puesto")
  }]


    try {
      const res = await Axios.post("/api/auth/registro", {
         email: formdata.get("email"),
         contraseña: formdata.get("contraseña"),
         persona:persona
       });
       if (res.data) {
         console.log(res.data);
       } else {
         console.log("La respuesta no contiene datos JSON válidos.");
       }
     
       console.log(res)
    } catch (error) {
      console.log(error)
     if(error instanceof AxiosError){
      setError(error.response?.data.message)
     }
   
    }

  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
         {error && <div>
            {error}
            </div>}
        <h1>REGISTRO DE EMPLEADO</h1>
        <input type="email" placeholder="Email" name="email" />
        <input type="password" placeholder="Contraseña" name="contraseña" />
        <input type="text" placeholder="Puesto" name="puesto" />
        <input type="text" placeholder="Nombre" name="nombre" />
        <input type="text" placeholder="Apellido" name="apellido" />
        <button>REGISTRAR</button>
      </form>
    </div>
  );
}
