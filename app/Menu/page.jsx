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
import { faListOl } from "@fortawesome/free-solid-svg-icons";
import Slider from '@/components/slider';
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
    <section className="seccion1">
      <div className="bar1">
        <Bar />
      </div>

      <div className={hola} onClick={handleDivClick}>
        <Header/>
        <div className={grafica}>
          <Slider/>
        </div>
        <div className={avisos}>
          <div className="citas">
            <div className="Citas">
              <a className="titulo-citas">Citas</a>
            </div>
            <div className="citas-pendientes">
              <div className="inf">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.8879 0C4.88448 0 0 4.88448 0 10.8879C0 13.5721 0.978208 16.0305 2.59438 17.9305C2.61507 17.9624 2.63881 17.9926 2.66653 18.0203C2.6728 18.0266 2.67982 18.0306 2.68609 18.0364C4.68372 20.3253 7.61869 21.7756 10.888 21.7756C14.1572 21.7756 17.0921 20.3253 19.0899 18.0364C19.0961 18.0308 19.1035 18.0264 19.1094 18.0203C19.1371 17.9926 19.1611 17.962 19.1816 17.9305C20.7977 16.0303 21.7759 13.5718 21.7759 10.8879C21.7759 4.88448 16.8913 0 10.8879 0ZM10.8879 20.687C8.10515 20.687 5.59171 19.5193 3.80638 17.6504L4.55221 16.9046C5.27275 16.1842 6.23045 15.7874 7.24875 15.7874H14.5271C15.5454 15.7874 16.5031 16.1842 17.2235 16.9044L17.9693 17.6502C16.1841 19.5191 13.6707 20.687 10.8879 20.687ZM18.6795 16.8209L17.9933 16.1347C17.0673 15.2087 15.8364 14.6985 14.5271 14.6985H7.24875C5.93939 14.6985 4.70867 15.2087 3.78267 16.1347L3.09648 16.8209C1.83821 15.1728 1.08879 13.1165 1.08879 10.8879C1.08879 5.48482 5.48448 1.08884 10.8879 1.08884C16.291 1.08884 20.687 5.48453 20.687 10.8879C20.687 13.1166 19.9376 15.1729 18.6795 16.8209ZM10.8879 4.8996C8.48662 4.8996 6.53263 6.85334 6.53263 9.25485C6.53263 11.6561 8.48638 13.6101 10.8879 13.6101C13.2891 13.6101 15.2431 11.6564 15.2431 9.25485C15.2431 6.85334 13.2892 4.8996 10.8879 4.8996ZM10.8879 12.5211C9.08677 12.5211 7.62157 11.0559 7.62157 9.2548C7.62157 7.45368 9.08681 5.98848 10.8879 5.98848C12.689 5.98848 14.1542 7.45373 14.1542 9.2548C14.1542 11.0559 12.689 12.5211 10.8879 12.5211Z"
                    fill="#24B8F1"
                  />
                </svg>
                <h1 className="citas-inf">21</h1>
                <a className="inf-a">Numero de citas</a>
              </div>
            </div>
            <div className="linea"></div>
            <div className="inventario-pendiente">
              <div className="inf">
                <svg
                  width="20"
                  height="25"
                  viewBox="0 0 20 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M1.68919 0C0.756214 0 0 0.756214 0 1.68919V23.3108C0 24.2438 0.756214 25 1.68919 25H17.9054C18.8384 25 19.5946 24.2438 19.5946 23.3108V1.68919C19.5946 0.756214 18.8384 0 17.9054 0H1.68919ZM4.48619 0.675615H1.68919C1.12927 0.675615 0.675615 1.12925 0.675615 1.68919V23.3108C0.675615 23.8707 1.12925 24.3244 1.68919 24.3244H17.9054C18.4653 24.3244 18.919 23.8707 18.919 23.3108V1.68919C18.919 1.12927 18.4653 0.675615 17.9054 0.675615H15.1084L14.6637 2.00965C14.5259 2.42347 14.1384 2.7027 13.7022 2.7027H5.89273C5.45653 2.7027 5.06913 2.42345 4.93122 2.00965L4.48619 0.675615ZM14.3963 0.675615H5.19866L5.57218 1.79591C5.61813 1.93401 5.74727 2.02685 5.89267 2.02685H13.7022C13.8476 2.02685 13.9767 1.934 14.0226 1.79591L14.3963 0.675615Z"
                    fill="#817AF3"
                    fill-opacity="0.8"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3.04053 7.43237C3.04053 6.87268 3.49416 6.41879 4.0541 6.41879H5.40533C5.96525 6.41879 6.41891 6.87267 6.41891 7.43237V8.7836C6.41891 9.34351 5.96527 9.79717 5.40533 9.79717H4.0541C3.49418 9.79717 3.04053 9.34353 3.04053 8.7836V7.43237ZM4.0541 7.09443C3.86746 7.09443 3.71617 7.24572 3.71617 7.43237V8.7836C3.71617 8.97024 3.86746 9.12153 4.0541 9.12153H5.40533C5.59198 9.12153 5.74327 8.97024 5.74327 8.7836V7.43237C5.74327 7.24572 5.59198 7.09443 5.40533 7.09443H4.0541Z"
                    fill="#817AF3"
                    fill-opacity="0.8"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3.04053 12.4999C3.04053 11.9402 3.49416 11.4864 4.0541 11.4864H5.40533C5.96525 11.4864 6.41891 11.9402 6.41891 12.4999V13.8512C6.41891 14.4111 5.96527 14.8647 5.40533 14.8647H4.0541C3.49418 14.8647 3.04053 14.4111 3.04053 13.8512V12.4999ZM4.0541 12.162C3.86746 12.162 3.71617 12.3133 3.71617 12.4999V13.8512C3.71617 14.0378 3.86746 14.1891 4.0541 14.1891H5.40533C5.59198 14.1891 5.74327 14.0378 5.74327 13.8512V12.4999C5.74327 12.3133 5.59198 12.162 5.40533 12.162H4.0541Z"
                    fill="#817AF3"
                    fill-opacity="0.8"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3.04053 17.5675C3.04053 17.0078 3.49416 16.5539 4.0541 16.5539H5.40533C5.96525 16.5539 6.41891 17.0078 6.41891 17.5675V18.9187C6.41891 19.4786 5.96527 19.9323 5.40533 19.9323H4.0541C3.49418 19.9323 3.04053 19.4787 3.04053 18.9187V17.5675ZM4.0541 17.2296C3.86746 17.2296 3.71617 17.3809 3.71617 17.5675V18.9187C3.71617 19.1054 3.86746 19.2567 4.0541 19.2567H5.40533C5.59198 19.2567 5.74327 19.1054 5.74327 18.9187V17.5675C5.74327 17.3809 5.59198 17.2296 5.40533 17.2296H4.0541Z"
                    fill="#817AF3"
                    fill-opacity="0.8"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.77026 8.10805C7.77026 7.92141 7.92155 7.77036 8.1082 7.77036H16.5541C16.7408 7.77036 16.8921 7.92141 16.8921 8.10805C16.8921 8.2947 16.7408 8.44599 16.5541 8.44599H8.1082C7.92155 8.44599 7.77026 8.2947 7.77026 8.10805Z"
                    fill="#817AF3"
                    fill-opacity="0.8"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.77026 13.1756C7.77026 12.989 7.92155 12.8379 8.1082 12.8379H16.5541C16.7408 12.8379 16.8921 12.989 16.8921 13.1756C16.8921 13.3623 16.7408 13.5136 16.5541 13.5136H8.1082C7.92155 13.5136 7.77026 13.3623 7.77026 13.1756Z"
                    fill="#817AF3"
                    fill-opacity="0.8"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.77026 18.2432C7.77026 18.0565 7.92155 17.9055 8.1082 17.9055H16.5541C16.7408 17.9055 16.8921 18.0565 16.8921 18.2432C16.8921 18.4298 16.7408 18.5811 16.5541 18.5811H8.1082C7.92155 18.5811 7.77026 18.4298 7.77026 18.2432Z"
                    fill="#817AF3"
                    fill-opacity="0.8"
                  />
                </svg>

                <h1 className="citas-inf">21</h1>
                <a className="inf-a"> Numero de citas</a>
              </div>
            </div>
          </div>
          <div className="inventario">
            <div className="Citas">
              <a className="titulo-citas">Inventario</a>
            </div>
            <div className="citas-pendientes">
              <div className="inf">
                <svg
                  width="26"
                  height="25"
                  viewBox="0 0 26 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Quantity">
                    <g id="Group 34">
                      <path
                        id="Vector"
                        d="M4.4026 0.900208C3.8361 0.900208 3.26817 1.18245 2.95024 1.65814L0.389879 5.23069L0.385262 5.23713L0.381717 5.24422C0.380535 5.24658 0.379321 5.249 0.378081 5.25147C0.351126 5.3052 0.311743 5.38369 0.311743 5.4676V22.9799C0.311743 23.8987 1.04146 24.6287 1.9605 24.6287H23.8509C24.771 24.6287 25.4997 23.8678 25.4997 22.9799L25.4994 5.48752C25.5117 5.45306 25.5137 5.41949 25.5102 5.38873H25.5645L25.4511 5.23048L22.8898 1.65659L22.8891 1.6557C22.5439 1.18502 22.0084 0.9 21.4384 0.9L15.2436 0.900208H4.4026ZM15.7989 5.51111V10.7522L12.9682 9.22143L12.9202 9.19546L12.8724 9.22181L10.0426 10.781V5.54104L11.1494 1.69576H14.7214L15.7989 5.51111ZM3.5907 2.10054L3.59071 2.10055L3.59125 2.09977C3.77891 1.83174 4.07389 1.69576 4.40287 1.69576H10.3165L9.36062 5.06965H1.47003L3.5907 2.10054ZM16.2363 11.4862L16.2447 11.4825L16.2523 11.4775C16.4564 11.3415 16.5948 11.1029 16.5948 10.8582L16.5944 5.86528H24.7336L24.7338 22.9798C24.7338 23.4585 24.334 23.8329 23.8807 23.8329H1.96051C1.48175 23.8329 1.10736 23.433 1.10736 22.9798V5.86528H9.24655V10.8582C9.24655 11.1353 9.38706 11.3431 9.58906 11.4775C9.69853 11.5505 9.83832 11.5836 9.97209 11.5836C10.0775 11.5836 10.2144 11.5501 10.3214 11.4801L12.9207 10.0783L15.5229 11.4817C15.7691 11.6217 16.013 11.5818 16.2363 11.4862ZM21.4386 1.69576C21.7617 1.69576 22.0606 1.85729 22.252 2.10227L24.3715 5.06967H16.5107L15.5548 1.69578L21.4386 1.69576Z"
                        fill="#DBA362"
                        stroke="#DBA362"
                        stroke-width="0.2"
                      />
                      <path
                        id="Vector_2"
                        d="M10.538 5.06959H10.438V5.16959V5.76519V5.86519H10.538H15.3033H15.4033V5.76519V5.16959V5.06959H15.3033H10.538Z"
                        fill="#DBA362"
                        stroke="#DBA362"
                        stroke-width="0.2"
                      />
                    </g>
                  </g>
                </svg>
                <h1 className="citas-inf">800</h1>
                <a className="inf-a">Total Productos</a>
              </div>
            </div>
            <div className="linea"></div>
            <div className="inventario-pendiente">
              <div className="inf">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="30" height="30" rx="4" fill="#ECEAFF" />
                  <path
                    d="M14.8118 2C12.3254 2 9.94082 2.98774 8.18294 4.74572C6.42475 6.50391 5.43701 8.88846 5.43701 11.3751C5.43701 16.375 13.9869 25.7498 14.3496 26.1751C14.4689 26.3038 14.6367 26.3762 14.8121 26.3752C14.9874 26.3762 15.1552 26.3038 15.2745 26.1751L16.062 25.2813V25.7501C16.062 26.0816 16.1938 26.3996 16.4282 26.634C16.6625 26.8684 16.9804 27 17.3121 27H24.812C25.1435 27 25.4613 26.8684 25.6957 26.634C25.9303 26.3996 26.0619 26.0816 26.0619 25.7501V18.2502C26.0619 17.9187 25.9303 17.6006 25.6957 17.3663C25.4613 17.1319 25.1434 17.0003 24.812 17.0003H22.1682C23.5056 14.6877 24.1869 12.8004 24.1869 11.3753C24.1869 9.72968 23.7538 8.11297 22.931 6.68787C22.1082 5.26262 20.9246 4.07924 19.4995 3.2564C18.0744 2.43355 16.4577 2.00043 14.812 2.00043L14.8118 2ZM24.8119 25.7495H17.3119V18.2496H19.1869V20.7497C19.1876 20.9663 19.3003 21.1672 19.4849 21.2804C19.6695 21.3938 19.8997 21.4034 20.0931 21.3059L21.0617 20.8246L22.0304 21.3059H22.0306C22.1176 21.3505 22.2139 21.3741 22.3118 21.3745C22.4288 21.3749 22.5437 21.3425 22.6431 21.2808C22.8262 21.1663 22.9373 20.9656 22.9369 20.7497V18.2496H24.8119L24.8119 25.7495ZM21.687 18.2496V19.7371L21.3743 19.5684C21.1975 19.4793 20.9887 19.4793 20.8118 19.5684L20.468 19.7371V18.2496H21.687ZM19.812 16.9997H17.3119C16.9803 16.9997 16.6624 17.1313 16.428 17.3657C16.1937 17.6001 16.0618 17.9181 16.0618 18.2496V23.3495C15.5556 23.9746 15.1181 24.4682 14.8119 24.8121C13.0307 22.7808 6.68682 15.2936 6.68682 11.3749C6.68682 8.472 8.23556 5.79014 10.7494 4.33837C13.2633 2.8866 16.3604 2.88692 18.874 4.33837C21.3875 5.78981 22.9366 8.47189 22.9366 11.3749C22.9366 12.6811 22.1617 14.6249 20.7115 16.9998L19.812 16.9997Z"
                    fill="#817AF3"
                    fill-opacity="0.6"
                  />
                  <path
                    d="M14.8118 6.99988C13.6514 6.99988 12.5388 7.46088 11.7183 8.28118C10.8978 9.10168 10.4368 10.2146 10.4368 11.3749C10.4368 12.535 10.8978 13.6479 11.7183 14.4684C12.5388 15.2889 13.6514 15.7497 14.8118 15.7497C15.9721 15.7497 17.0848 15.2889 17.9053 14.4684C18.7258 13.6479 19.1868 12.535 19.1868 11.3749C19.1868 10.2146 18.7258 9.10168 17.9053 8.28118C17.0848 7.46091 15.9721 6.99988 14.8118 6.99988ZM14.8118 14.4998C13.9829 14.4998 13.1881 14.1706 12.6022 13.5845C12.0161 12.9985 11.6869 12.2036 11.6869 11.3749C11.6869 10.546 12.0161 9.75122 12.6022 9.1651C13.1882 8.57915 13.9829 8.24979 14.8118 8.24979C15.6407 8.24979 16.4355 8.57917 17.0214 9.1651C17.6075 9.75122 17.9367 10.546 17.9367 11.3749C17.9367 12.2036 17.6075 12.9986 17.0214 13.5845C16.4354 14.1706 15.6407 14.4998 14.8118 14.4998Z"
                    fill="#817AF3"
                    fill-opacity="0.6"
                  />
                </svg>

                <h1 className="citas-inf">200</h1>
                <a className="inf-a">Productos no disponibles</a>
              </div>
            </div>
          </div>
        </div>

        <div className={tabla}>
          <div className="mas-vendidos">
            <div className="titulos">
              <h3>Productos mas vendidos</h3>
            </div>
            <div className="contenedor-tabla">
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
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
          <div className="pocas-unidades">
            <div className="titulos">
              <h3>Citas</h3>
            </div>
            <div className="contenedor-tabla1">
              <div className="fila">
                <div className="imagen-card">
                  <Image
                    style={imageStyle}
                    src="/images/Hola.png"
                    width={50}
                    height={50}
                  />
                </div>
                <div className="informacion-card">
                  <h3 className="card-nombre">Potis Rojas</h3>
                  <p className="card-cantidad">Unidades Actuales:12</p>
                </div>

                <div className="estado">
                  <p>bajo</p>
                </div>
              </div>
              <div className="fila">
                <div className="imagen-card">
                  <Image
                    style={imageStyle}
                    src="/images/Hola.png"
                    width={50}
                    height={50}
                  />
                </div>
                <div className="informacion-card">
                  <h3 className="card-nombre">Potis Rojas</h3>
                  <p className="card-cantidad">Unidades Actuales:12</p>
                </div>

                <div className="estado">
                  <p>bajo</p>
                </div>
              </div>
              <div className="fila">
                <div className="imagen-card">
                  <Image
                    style={imageStyle}
                    src="/images/Hola.png"
                    width={50}
                    height={50}
                  />
                </div>
                <div className="informacion-card">
                  <h3 className="card-nombre">Potis Rojas</h3>
                  <p className="card-cantidad">Unidades Actuales:12</p>
                </div>

                <div className="estado">
                  <p>bajo</p>
                </div>
              </div>
            </div>
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
  createData("Yaz color #000", 159, 6.0, 24),
  createData("Eddi asado", 159, 6.0, 24),
  createData("Deivid Cremas", 159, 6.0, 24),
 
];
