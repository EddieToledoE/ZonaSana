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

  const session = useSession();
  useEffect(() => {
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
  const [image, setImage] = useState(
    localStorage.getItem("imagenCargada") || undefined
  );

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataURL = e.target.result;
        localStorage.setItem("imagenCargada", imageDataURL); // Almacenar la imagen en LocalStorage
        setImage(imageDataURL);
      };
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    const savedImage = localStorage.getItem("imagenCargada");
    if (savedImage) {
      setImage(savedImage);
    }
  }, []);
  //--------------------------------------------------
  const imageLoader = ({ src, width, quality }) => {
    return `https://img.freepik.com/vector-gratis/${src}?w=${width}}`;
  };
  function informe() {
    <div className="Alert"></div>;
  }
  return (
    <header className={Header}>
      <div className="Contenedor-Principal">
        <div className="Lupa-icon">
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
            className="lupa-svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.7275 20.4093L16.9401 15.6226C16.697 15.3795 16.3534 15.3025 16.0431 15.3844L15.0159 14.3573C16.1747 13.0448 16.8845 11.3267 16.8845 9.44218C16.8845 5.33871 13.5462 2 9.44261 2C5.33847 2 1.99976 5.33871 1.99976 9.44285C1.99976 13.5467 5.33847 16.885 9.44261 16.885C11.3268 16.885 13.0449 16.1755 14.3577 15.0164L15.3848 16.0436C15.3029 16.354 15.3796 16.6972 15.6231 16.9406L20.4097 21.727C20.5921 21.9093 20.83 22 21.0686 22C21.3072 22 21.5454 21.909 21.7274 21.727C22.0911 21.3633 22.0911 20.7733 21.7274 20.4093L21.7275 20.4093ZM2.93168 9.44254C2.93168 5.85288 5.85211 2.93187 9.44236 2.93187C13.0326 2.93187 15.9527 5.85288 15.9527 9.44287C15.9527 13.0325 13.0319 15.9532 9.44236 15.9532C5.85277 15.9532 2.93168 13.0325 2.93168 9.44254Z"
              fill="#858D9D"
            />
          </svg>
        </div>
        <div className="div-buscador">
          <div className="entrada">
            <Buscar></Buscar>
          </div>
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
          <div className="notificaciones">
            <h1>USER :{usuario} </h1>
          </div>
          <div className="perfil">
            <label className="input-perfil">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="input-f"
              ></input>
              <Image
                style={imageStyle}
                src={image}
                width={40}
                height={40}
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
