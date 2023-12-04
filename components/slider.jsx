"use client";
import React from "react";
import Stylos from "@/styles/slider.css";
import { useRef, useState, useEffect } from "react";
import Axios from "axios";
import Logo from "@/public/logo.png";
const slider = () => {
  const [nombreDefault, setNombreDefault] = useState("Nombre");
  const wrapperRef = useRef(null);
  const carouselRef = useRef(null);
  let isDragging = false,
    isAutoPlay = true,
    startX,
    startScrollLeft,
    timeoutId;
  const [datoSlider, setDatoSlider] = useState([]);
  useEffect(() => {
    const obtenerCantidades = async () => {
      try {
        const response = await Axios.get("/api/auth/venta/masvendidos");
        setDatoSlider(response.data);
      } catch (error) {
        console.error("Error al obtener cantidades:", error);
        // Manejar el error según tus necesidades
      }
    };
    obtenerCantidades();
  }, []);
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const carousel = carouselRef.current;

    const firstCardWidth = carousel.querySelector(".card")?.offsetWidth;
    const arrowBtns = wrapper.querySelectorAll("i");

    if (firstCardWidth) {
      const cardWidth = firstCardWidth;
      const carouselChildrens = [...carousel.children];
      const totalCards = carouselChildrens.length;

      carousel.classList.add("no-transition");
      carousel.scrollLeft = carousel.offsetWidth;
      carousel.classList.remove("no-transition");

      arrowBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          carousel.scrollLeft += btn.id === "left" ? -cardWidth : cardWidth;
        });
      });

      const dragStart = (e) => {
        isDragging = true;
        carousel.classList.add("dragging");
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
      };

      const dragging = (e) => {
        if (!isDragging) return;
        carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
      };

      const dragStop = () => {
        isDragging = false;
        carousel.classList.remove("dragging");
      };
      const infiniteScroll = () => {
        const cardWidth = carousel.querySelector(".card")?.offsetWidth || 0;
        const totalCards = carouselChildrens.length;

        if (carousel.scrollLeft < cardWidth) {
          carousel.scrollLeft = totalCards * cardWidth - carousel.offsetWidth;
        } else if (carousel.scrollLeft > (totalCards - 1) * cardWidth) {
          carousel.scrollLeft = 0;
        }

        clearTimeout(timeoutId);
        if (!wrapper.matches(":hover")) autoPlay();
      };

      const autoPlay = () => {
        if (window.innerWidth < 800 || !isAutoPlay) return;
        timeoutId = setTimeout(() => (carousel.scrollLeft += cardWidth), 2500);
      };

      autoPlay();

      carousel.addEventListener("mousedown", dragStart);
      carousel.addEventListener("mousemove", dragging);
      document.addEventListener("mouseup", dragStop);
      carousel.addEventListener("scroll", infiniteScroll);
      wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
      wrapper.addEventListener("mouseleave", autoPlay);

      return () => {
        carousel.removeEventListener("mousedown", dragStart);
        carousel.removeEventListener("mousemove", dragging);
        document.removeEventListener("mouseup", dragStop);
        carousel.removeEventListener("scroll", infiniteScroll);
        wrapper.removeEventListener("mouseenter", () =>
          clearTimeout(timeoutId)
        );
        wrapper.removeEventListener("mouseleave", autoPlay);

        arrowBtns.forEach((btn) => {
          btn.removeEventListener("click", () => {
            carousel.scrollLeft += btn.id === "left" ? -cardWidth : cardWidth;
          });
        });
      };
    }
  }, []);

  return (
    <>
      <div ref={wrapperRef} class="wrapper">
        <i id="left" class="fa-solid fa-angle-left">
          <svg
            width={30}
            height={30}
            class="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 8 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"
            />
          </svg>
        </i>
        <ul class="carousel" ref={carouselRef}>
          <li class="card">
            <div class="img">
              <img
                src={datoSlider[0] ? datoSlider[0].url : Logo}
                alt="img"
                width={80}
                height={80}
                style={{ objectFit: "cover", borderRadius: "50%" }}
                draggable="false"
              />
            </div>
            <h2>{datoSlider[0] ? datoSlider[0].nombre : nombreDefault}</h2>
            <span>
              Vendidos : {datoSlider[0] ? datoSlider[0].totalVendido : "N/A"}
            </span>
          </li>
          <li class="card">
            <div class="img">
              <img
                src={datoSlider[1] ? datoSlider[1].url : Logo}
                alt="img"
                width={80}
                height={80}
                style={{ objectFit: "cover", borderRadius: "50%" }}
                draggable="false"
              />
            </div>
            <h2>{datoSlider[1] ? datoSlider[1].nombre : nombreDefault}</h2>
            <span>
              Vendidos : {datoSlider[1] ? datoSlider[1].totalVendido : "N/A"}
            </span>
          </li>
          <li class="card">
            <div class="img">
              <img
                src={datoSlider[2] ? datoSlider[2].url : Logo}
                alt="img"
                width={80}
                height={80}
                style={{ objectFit: "cover", borderRadius: "50%" }}
                draggable="false"
              />
            </div>
            <h2>{datoSlider[2] ? datoSlider[2].nombre : nombreDefault}</h2>
            <span>
              Vendidos : {datoSlider[2] ? datoSlider[2].totalVendido : "N/A"}
            </span>
          </li>
          <li class="card">
            <div class="img">
              <img
                src={datoSlider[3] ? datoSlider[3].url : Logo}
                alt="img"
                width={80}
                height={80}
                style={{ objectFit: "cover", borderRadius: "50%" }}
                draggable="false"
              />
            </div>
            <h2>{datoSlider[3] ? datoSlider[3].nombre : nombreDefault}</h2>
            <span>
              Vendidos : {datoSlider[3] ? datoSlider[3].totalVendido : "N/A"}
            </span>
          </li>
          <li class="card">
            <div class="img">
              <img
                src={datoSlider[4] ? datoSlider[4].url : Logo}
                alt="img"
                width={80}
                height={80}
                style={{ objectFit: "cover", borderRadius: "50%" }}
                draggable="false"
              />
            </div>
            <h2>{datoSlider[4] ? datoSlider[4].nombre : nombreDefault}</h2>
            <span>
              Vendidos : {datoSlider[4] ? datoSlider[4].totalVendido : "N/A"}
            </span>
          </li>
          <li class="card">
            <div class="img">
              <img
                src={datoSlider[5] ? datoSlider[5].url : Logo}
                alt="img"
                width={80}
                height={80}
                style={{ objectFit: "cover", borderRadius: "50%" }}
                draggable="false"
              />
            </div>
            <h2>{datoSlider[5] ? datoSlider[5].nombre : nombreDefault}</h2>
            <span>
              Vendidos : {datoSlider[5] ? datoSlider[5].totalVendido : "N/A"}
            </span>
          </li>
        </ul>
        <i id="right" class="fa-solid fa-angle-right">
          <svg
            width={30}
            height={30}
            class="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 8 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
            />
          </svg>
        </i>
      </div>
    </>
  );
};

export default slider;
