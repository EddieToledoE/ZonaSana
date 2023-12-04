"use client";
import React from "react";
import head from "../styles/Header.css";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { closeBar, openBar } from "../store/barSlice"; // Importa las acciones
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import Badge from "@mui/material/Badge";
import Buscar from "@/components/completar";

function Header() {
  const [usuario, setUsuario] = useState("");
  const [image, setImage] = useState("");
  const [puesto, setPuesto] = useState("");
  const session = useSession();
  useEffect(() => {
    setImage(session.data?.user.url);
    setPuesto(session.data?.user.persona[0].puesto);
    setUsuario(session.data?.user.persona[0].nombre);
  }, [session.data]);

  const isBarOpen = useSelector((state) => state.bar.isBarOpen);

  const Header = isBarOpen ? "Header-true" : "Header";

  const dispatch = useDispatch();

  const handleToggleBar = () => {
    console.log("Action dispatched: closeBar");
    dispatch(openBar());
  };
  const imageStyle = {
    borderRadius: "50%",
    position: "absolute",
    cursor: "pointer",
  };
  //Logica para tomar la imagen que se carga

  //--------------------------------------------------

  function informe() {
    <div className="Alert"></div>;
  }
  return (
    <header className={Header}>
      <div className="Contenedor-Principal">
        <div className="encabezado-ajustes">
          <svg
            className="svg-icon"
            onClick={handleToggleBar}
            width="44"
            height="44"
            viewBox="-4 0 34 24"
          >
            <path
              fill="#12B76A"
              d="M3.314,4.8h13.372c0.41,0,0.743-0.333,0.743-0.743c0-0.41-0.333-0.743-0.743-0.743H3.314
								c-0.41,0-0.743,0.333-0.743,0.743C2.571,4.467,2.904,4.8,3.314,4.8z M16.686,15.2H3.314c-0.41,0-0.743,0.333-0.743,0.743
								s0.333,0.743,0.743,0.743h13.372c0.41,0,0.743-0.333,0.743-0.743S17.096,15.2,16.686,15.2z M16.686,9.257H3.314
								c-0.41,0-0.743,0.333-0.743,0.743s0.333,0.743,0.743,0.743h13.372c0.41,0,0.743-0.333,0.743-0.743S17.096,9.257,16.686,9.257z"
            ></path>
          </svg>
          <svg
            width="30"
            height="30"
            color="#5D6679"
            opacity={".8"}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.99998 12.5C11.3807 12.5 12.5 11.3807 12.5 9.99998C12.5 8.61927 11.3807 7.49998 9.99998 7.49998C8.61927 7.49998 7.49998 8.61927 7.49998 9.99998C7.49998 11.3807 8.61927 12.5 9.99998 12.5Z"
              stroke="#5D6679"
              stroke-width="1.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M16.1666 12.5C16.0557 12.7513 16.0226 13.0301 16.0716 13.3005C16.1207 13.5708 16.2495 13.8202 16.4416 14.0166L16.4916 14.0666C16.6466 14.2214 16.7695 14.4052 16.8534 14.6076C16.9373 14.8099 16.9805 15.0268 16.9805 15.2458C16.9805 15.4648 16.9373 15.6817 16.8534 15.884C16.7695 16.0864 16.6466 16.2702 16.4916 16.425C16.3369 16.5799 16.153 16.7029 15.9507 16.7867C15.7484 16.8706 15.5315 16.9138 15.3125 16.9138C15.0935 16.9138 14.8766 16.8706 14.6742 16.7867C14.4719 16.7029 14.2881 16.5799 14.1333 16.425L14.0833 16.375C13.8869 16.1829 13.6375 16.054 13.3671 16.005C13.0968 15.956 12.818 15.989 12.5666 16.1C12.3202 16.2056 12.11 16.381 11.9619 16.6046C11.8138 16.8282 11.7344 17.0902 11.7333 17.3583V17.5C11.7333 17.942 11.5577 18.3659 11.2452 18.6785C10.9326 18.991 10.5087 19.1666 10.0666 19.1666C9.62462 19.1666 9.2007 18.991 8.88813 18.6785C8.57557 18.3659 8.39998 17.942 8.39998 17.5V17.425C8.39353 17.1491 8.30424 16.8816 8.14374 16.6572C7.98323 16.4328 7.75893 16.2619 7.49998 16.1666C7.24863 16.0557 6.96982 16.0226 6.69949 16.0716C6.42916 16.1207 6.17971 16.2495 5.98331 16.4416L5.93331 16.4916C5.77852 16.6466 5.59471 16.7695 5.39238 16.8534C5.19005 16.9373 4.97317 16.9805 4.75415 16.9805C4.53512 16.9805 4.31824 16.9373 4.11591 16.8534C3.91358 16.7695 3.72977 16.6466 3.57498 16.4916C3.42002 16.3369 3.29709 16.153 3.21321 15.9507C3.12934 15.7484 3.08617 15.5315 3.08617 15.3125C3.08617 15.0935 3.12934 14.8766 3.21321 14.6742C3.29709 14.4719 3.42002 14.2881 3.57498 14.1333L3.62498 14.0833C3.81709 13.8869 3.94597 13.6375 3.99498 13.3671C4.044 13.0968 4.01091 12.818 3.89998 12.5666C3.79434 12.3202 3.61894 12.11 3.39537 11.9619C3.17179 11.8138 2.9098 11.7344 2.64165 11.7333H2.49998C2.05795 11.7333 1.63403 11.5577 1.32147 11.2452C1.00891 10.9326 0.833313 10.5087 0.833313 10.0666C0.833313 9.62462 1.00891 9.2007 1.32147 8.88813C1.63403 8.57557 2.05795 8.39998 2.49998 8.39998H2.57498C2.85081 8.39353 3.11832 8.30424 3.34273 8.14374C3.56714 7.98323 3.73808 7.75893 3.83331 7.49998C3.94424 7.24863 3.97733 6.96982 3.92832 6.69949C3.8793 6.42916 3.75043 6.17971 3.55831 5.98331L3.50831 5.93331C3.35335 5.77852 3.23042 5.59471 3.14655 5.39238C3.06267 5.19005 3.0195 4.97317 3.0195 4.75415C3.0195 4.53512 3.06267 4.31824 3.14655 4.11591C3.23042 3.91358 3.35335 3.72977 3.50831 3.57498C3.6631 3.42002 3.84692 3.29709 4.04925 3.21321C4.25158 3.12934 4.46845 3.08617 4.68748 3.08617C4.90651 3.08617 5.12338 3.12934 5.32571 3.21321C5.52804 3.29709 5.71186 3.42002 5.86665 3.57498L5.91665 3.62498C6.11305 3.81709 6.36249 3.94597 6.63282 3.99498C6.90315 4.044 7.18197 4.01091 7.43331 3.89998H7.49998C7.74645 3.79434 7.95666 3.61894 8.10472 3.39537C8.25279 3.17179 8.33224 2.9098 8.33331 2.64165V2.49998C8.33331 2.05795 8.50891 1.63403 8.82147 1.32147C9.13403 1.00891 9.55795 0.833313 9.99998 0.833313C10.442 0.833313 10.8659 1.00891 11.1785 1.32147C11.4911 1.63403 11.6666 2.05795 11.6666 2.49998V2.57498C11.6677 2.84313 11.7472 3.10513 11.8952 3.3287C12.0433 3.55228 12.2535 3.72768 12.5 3.83331C12.7513 3.94424 13.0301 3.97733 13.3005 3.92832C13.5708 3.8793 13.8202 3.75043 14.0166 3.55831L14.0666 3.50831C14.2214 3.35335 14.4052 3.23042 14.6076 3.14655C14.8099 3.06267 15.0268 3.0195 15.2458 3.0195C15.4648 3.0195 15.6817 3.06267 15.884 3.14655C16.0864 3.23042 16.2702 3.35335 16.425 3.50831C16.5799 3.6631 16.7029 3.84692 16.7867 4.04925C16.8706 4.25158 16.9138 4.46845 16.9138 4.68748C16.9138 4.90651 16.8706 5.12338 16.7867 5.32571C16.7029 5.52804 16.5799 5.71186 16.425 5.86665L16.375 5.91665C16.1829 6.11305 16.054 6.36249 16.005 6.63282C15.956 6.90315 15.989 7.18197 16.1 7.43331V7.49998C16.2056 7.74645 16.381 7.95666 16.6046 8.10472C16.8282 8.25279 17.0902 8.33224 17.3583 8.33331H17.5C17.942 8.33331 18.3659 8.50891 18.6785 8.82147C18.991 9.13403 19.1666 9.55795 19.1666 9.99998C19.1666 10.442 18.991 10.8659 18.6785 11.1785C18.3659 11.4911 17.942 11.6666 17.5 11.6666H17.425C17.1568 11.6677 16.8948 11.7472 16.6713 11.8952C16.4477 12.0433 16.2723 12.2535 16.1666 12.5Z"
              stroke="#5D6679"
              stroke-width="1."
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <h1>Ajustes</h1>
        </div>
        <div className="items">
          <div className="notificaciones">
            <Badge badgeContent={10} variant="" color="secondary">
              <svg
                onClick={informe}
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.4417 17.5C11.2952 17.7526 11.0849 17.9622 10.8319 18.1079C10.5788 18.2537 10.292 18.3304 10 18.3304C9.70802 18.3304 9.42116 18.2537 9.16814 18.1079C8.91513 17.9622 8.70484 17.7526 8.55833 17.5M15 6.66667C15 5.34059 14.4732 4.06882 13.5355 3.13114C12.5979 2.19346 11.3261 1.66667 10 1.66667C8.67392 1.66667 7.40215 2.19346 6.46447 3.13114C5.52678 4.06882 5 5.34059 5 6.66667C5 12.5 2.5 14.1667 2.5 14.1667H17.5C17.5 14.1667 15 12.5 15 6.66667Z"
                  stroke="#5D6679"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </Badge>
          </div>

          <div className="perfil">
            <label className="input-perfil">
              <Image
                style={imageStyle}
                src={image}
                width={60}
                height={60}
                objectFit="cover"
                objectPosition="center top"
              />
            </label>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
