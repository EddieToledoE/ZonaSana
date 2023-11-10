"use client";
import Header from "@/components/Header";
import estios from "app/Home.css";
import Grafica from "@/components/Grafica";
import Bar from "@/components/Bar-1";
import { closeBar, openBar } from "@/store/barSlice";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
//Todo los imports para la tabla
import Table from "@mui/material/Table";
import { useSession } from "next-auth/react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { red } from "@mui/material/colors";
import stylos from "styles/Ventas.css";
export default function Home() {
  //Logica para mandar y recibir los estados de la libreria "Redux"
  const isBarOpen = useSelector((state) => state.bar.isBarOpen);
  // importamos el objeto useDispatch para poder mandar los cambios de estados
  const { data: session } = useSession();
  console.log(session);
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
  // carga el header una vez

  const hola = isBarOpen ? "hola-true" : "hola";
  const grafica = isBarOpen ? "grafica-true" : "grafica";
  const avisos = isBarOpen ? "avisos-true" : "avisos";
  const tabla = isBarOpen ? "tabla-true" : "tabla";
  const imageStyle = {
    borderRadius: "2px",
    position: "absolute",
  };
  return (
    <section className="seccion2">
      <div className="bar1">
        <Bar />
      </div>

      <div className={hola} onClick={handleDivClick}>
        <Header />
        <div className={tabla}>
          <div className="productos1">
            <div className="titulos2">
              <h3>Productos</h3>
            </div>
            <div className="contenedor-producto">
              <TableContainer sx={{ boxShadow: 0 }} component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: "#5D6679" }}>Nombre</TableCell>
                      <TableCell sx={{ color: "#5D6679" }}>
                        Cantidad Vendida
                      </TableCell>
                      <TableCell sx={{ color: "#5D6679" }}>
                        Cantidad en stock
                      </TableCell>
                      <TableCell sx={{ color: "#5D6679" }}>Precio</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          sx={{ color: "#5D6679" }}
                          component="th"
                          scope="row"
                        >
                          {row.nombre}
                        </TableCell>
                        <TableCell sx={{ color: "#5D6679" }}>
                          {row.CantidadVendida}
                        </TableCell>
                        <TableCell sx={{ color: "#5D6679" }}>
                          {row.CantidadenStock}
                        </TableCell>
                        <TableCell sx={{ color: "#5D6679" }}>
                          ${row.precio}
                        </TableCell>
                        <TableCell>
                          <button
                            className="btn-Ventas"
                            onClick={() => addToCart(row.nombre)}
                          >
                            Agregar
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
          <div className="carrito-Ventas">
            <div className="titulos2">
              <h3>Carrito</h3>
            </div>
            <div className="contenedor-producto2">
              <TableContainer sx={{ boxShadow: 0 }} component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: "#5D6679" }}>Nombre</TableCell>
                      <TableCell sx={{ color: "#5D6679" }}>Cantidad</TableCell>
                      <TableCell sx={{ color: "#5D6679" }}>Precio</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          sx={{ color: "#5D6679" }}
                          component="th"
                          scope="row"
                        >
                          {row.nombre}
                        </TableCell>
                        <TableCell sx={{ color: "#5D6679" }}>
                          {row.cantidad}
                        </TableCell>
                        <TableCell sx={{ color: "#5D6679" }}>
                          ${row.precio}
                        </TableCell>
                        <TableCell>
                          <button
                            className="btn-Eliminar"
                            onClick={() => addToCart(row.nombre)}
                          >
                            Eliminar
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
          <div className="total-Compra">
            <h4 id="txt-Codigo">Codigo:</h4>
            <input id="input-Codigo" type="text" />
            <h4 id="txt-Total">Total:</h4>
            <button className="confirmar-Compra">Confirmar</button>
            <button className="cancelar-Compra">Cancelar</button>
          </div>
        </div>
      </div>
    </section>
  );
}
function createData(nombre, CantidadVendida, CantidadenStock, precio) {
  return { nombre, CantidadVendida, CantidadenStock, precio };
}

const rows = [
  createData("Jarabe", 60, 20, 43),
  createData("Miel", 35, 65, 50),
  createData(" Cremas", 59, 40, 28),
];
