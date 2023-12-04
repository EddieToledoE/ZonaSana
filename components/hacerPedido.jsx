import estilos from "@/styles/registrar.css";
import { useState, useEffect } from "react";
import Axios, { AxiosError } from "axios";
import SeleccionProductos from "./seleccionarProducto";
import { Autocomplete, Badge } from "@mui/material";
const Swal = require("sweetalert2");
const registrar = ({ onCambioClick }) => {
  const [clientes, setClientes] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState("");
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [clienteid, setClienteid] = useState("");
  const [rastreo, setRasteo] = useState(0);
  const [valor, setValor] = useState(0);
  const [fecha, setFecha] = useState("");
  const [estatus, setEstatus] = useState("");

  const handleEnvios = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres confirmar este envio? ",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, agregar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      console.log(
        clienteid,
        rastreo,
        valor,
        fecha,
        estatus,
        productosSeleccionados
      );
      try {
        const res = await Axios.post("/api/auth/envio", {
          cliente: clienteid,
          rastreo: rastreo,
          valor: valor,
          fecha: fecha,
          estatus: estatus,
          producto_enviado: productosSeleccionados,
        });
        if (res.data) {
          console.log(res.data);
          Swal.fire(
            "Agregado",
            "El Envio se ha registrado correctamente.",
            "success"
          );
          // window.location.reload();
        } else {
          console.log("La respuesta no contiene datos JSON válidos.");
        }

        console.log(res);
      } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Ha ocurrio un error",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Ha ocurrio un error," + error,
          });
        }
      }
    }
  };

  const manejarProductosSeleccionados = (productos) => {
    setProductosSeleccionados(productos);
    console.log(productosSeleccionados);
  };
  const cantidad = productosSeleccionados.length;
  useEffect(() => {
    // Hacer la solicitud para obtener la lista de clientes
    const obtenerClientes = async () => {
      try {
        const response = await Axios.get("/api/auth/cliente");
        setClientes(response.data);
      } catch (error) {
        console.error("Error al obtener la lista de clientes:", error);
      }
    };

    obtenerClientes();
  }, []);
  const [carrito, setcarrito] = useState("carrito-close");

  return (
    <div className="RegistrarMain">
      <div className="titulor">
        <h3>Realizar Envio</h3>
      </div>
      <div className="Main-items">
        <svg
          fill="#48a865"
          width={80}
          height={80}
          viewBox="0 0 100 100"
          data-name="Layer 1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#48a865"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M79.89,83.79H12.11a1.5,1.5,0,0,1-1.5-1.5V25.72a1.5,1.5,0,0,1,1.5-1.5H62.7a1.5,1.5,0,0,1,0,3H13.61V80.79H78.39V41.63a1.5,1.5,0,0,1,3,0V82.29A1.5,1.5,0,0,1,79.89,83.79Z"></path>
            <path d="M53.73,47a1.52,1.52,0,0,1-1.52-1.5,1.37,1.37,0,0,1,0-.19V27.21H39.43v18a1.43,1.43,0,0,1,0,.29A1.47,1.47,0,0,1,38,47a1.56,1.56,0,0,1-1.56-1.5V25.71a1.51,1.51,0,0,1,1.5-1.5h15.8a1.51,1.51,0,0,1,1.5,1.5V45.46A1.5,1.5,0,0,1,53.73,47Z"></path>
            <path d="M53.7,47a1.5,1.5,0,0,1-1.17-.56l-7.87-9.87A1.5,1.5,0,1,1,47,34.66l7.88,9.87A1.49,1.49,0,0,1,53.7,47Z"></path>
            <path d="M38,47a1.49,1.49,0,0,1-1.17-2.43l7.87-10A1.5,1.5,0,0,1,47,36.44l-7.87,10A1.5,1.5,0,0,1,38,47Z"></path>
            <path d="M34.85,77.57H18.56a1.5,1.5,0,0,1,0-3H34.85a1.5,1.5,0,0,1,0,3Z"></path>
            <path d="M78.9,43.16A17.71,17.71,0,1,1,96.6,25.45,17.73,17.73,0,0,1,78.9,43.16Zm0-32.42A14.71,14.71,0,1,0,93.6,25.45,14.73,14.73,0,0,0,78.9,10.74Z"></path>
            <path d="M78.9,37.09a1.5,1.5,0,0,1-1.5-1.5V16a1.5,1.5,0,0,1,3,0V35.59A1.5,1.5,0,0,1,78.9,37.09Z"></path>
            <path d="M88.71,27.28H69.08a1.5,1.5,0,0,1,0-3H88.71a1.5,1.5,0,0,1,0,3Z"></path>
          </g>
        </svg>
      </div>
      <div className="Entradas-datos">
        <div className="text">
          <div className="t-in">
            <label className="titulo-input" htmlFor="cliente">
              Selecciona un cliente:
            </label>
          </div>
          <div className="entradatext">
            <Autocomplete
              sx={{
                display: "inline-block",
                "& input": {
                  width: "100%",
                  height: 40,
                  bgcolor: "",
                  borderColor: "red",
                  border: "1px solid #D0D5DD",
                  borderRadius: "4px",
                  color: (theme) =>
                    theme.palette.getContrastText(
                      theme.palette.background.paper
                    ),
                },
              }}
              style={{ width: "100%", border: "none", borderColor: "#D0D5DD" }}
              id="custom-input-demo"
              options={clientes}
              getOptionLabel={(option) => option.nombre + " " + option.apellido}
              onChange={(event, value) => setClienteid(value?._id || "")}
              renderInput={(params) => (
                <div ref={params.InputProps.ref}>
                  <input
                    type="text"
                    {...params.inputProps}
                    placeholder="Busca un cliente"
                  />
                </div>
              )}
            />
          </div>
        </div>
        <div className="text">
          <div className="t-in">
            <label className="titulo-input">Número de rastreo</label>
          </div>
          <div className="entradatext">
            <input
              className="datos-inv"
              type="number"
              min={1}
              defaultValue={1}
              onChange={(event) => setRasteo(event.target.value)}
              placeholder="Número de rastreo"
            ></input>
          </div>
        </div>

        <div className="text">
          <div className="t-in">
            <label className="titulo-input">Valor</label>
          </div>
          <div className="entradatext">
            <input
              className="datos-inv"
              type="number"
              min={1}
              onChange={(event) => setValor(event.target.value)}
              placeholder="Valor"
            ></input>
          </div>
        </div>
        <div className="text">
          <div className="t-in">
            <label className="titulo-input">Fecha</label>
          </div>
          <div className="entradatext">
            <input
              className="datos-inv"
              type="date"
              onChange={(event) => setFecha(event.target.value)}
              placeholder="Selecciona una Categoria"
            ></input>
          </div>
        </div>
        <div className="text">
          <div className="t-in">
            <label className="titulo-input">Estatus</label>
          </div>
          <div className="entradatext">
            <select
              className="datos-inv"
              defaultValue=""
              onChange={(event) => setEstatus(event.target.value)}
            >
              <option value="" disabled hidden>
                Selecciona un estatus
              </option>
              <option value="En Preparación">En Preparación</option>
              <option value="Enviado">Enviado</option>
              <option value="En Camino">En Camino</option>
              <option value="Entregado">Entregado</option>
            </select>
          </div>
        </div>
        <div className="Carrito-Main">
          <div className="Carrito_Seleccion">
            <SeleccionProductos
              onProductosSeleccionados={manejarProductosSeleccionados}
            />
          </div>
        </div>
      </div>
      <div className="botonesr">
        <button className="cancelar" onClick={onCambioClick}>
          Cancelar
        </button>
        <button onClick={handleEnvios} className="submit">
          Agregar
        </button>
      </div>
    </div>
  );
};

export default registrar;
