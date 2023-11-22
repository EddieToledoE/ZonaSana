
'use client'
import React from 'react'
import Stylos from '@/styles/slider.css';
import { useRef, useState, useEffect } from 'react';


const slider = () => {
  const wrapperRef = useRef(null);
  const carouselRef = useRef(null);
  let isDragging = false,
    isAutoPlay = true,
    startX,
    startScrollLeft,
    timeoutId;

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const carousel = carouselRef.current;

    const firstCardWidth = carousel.querySelector(".card")?.offsetWidth;
    const arrowBtns = wrapper.querySelectorAll("i");
    const carouselChildrens = [...carousel.children];

    if (firstCardWidth) {
      let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

      carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
        carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
      });

      carouselChildrens.slice(0, cardPerView).forEach(card => {
        carousel.insertAdjacentHTML("beforeend", card.outerHTML);
      });

      carousel.classList.add("no-transition");
      carousel.scrollLeft = carousel.offsetWidth;
      carousel.classList.remove("no-transition");

      arrowBtns.forEach(btn => {
        btn.addEventListener("click", () => {
          carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
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
        if (carousel.scrollLeft === 0) {
          carousel.classList.add("no-transition");
          carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
          carousel.classList.remove("no-transition");
        } else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
          carousel.classList.add("no-transition");
          carousel.scrollLeft = carousel.offsetWidth;
          carousel.classList.remove("no-transition");
        }

        clearTimeout(timeoutId);
        if (!wrapper.matches(":hover")) autoPlay();
      };

      const autoPlay = () => {
        if (window.innerWidth < 800 || !isAutoPlay) return;
        timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
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
        wrapper.removeEventListener("mouseenter", () => clearTimeout(timeoutId));
        wrapper.removeEventListener("mouseleave", autoPlay);

        arrowBtns.forEach(btn => {
          btn.removeEventListener("click", () => {
            carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
          });
        });
      };
    }
  }, []);


  return (
    <>
     <div  ref={wrapperRef} class="wrapper">
      <i id="left" class="fa-solid fa-angle-left"><svg width={30} height={30} class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"/>
      </svg></i>
      <ul class="carousel" ref={carouselRef}>
        <li class="card">
          <div class="img"><img src="images/img-1.jpg" alt="img" draggable="false"/></div>
          <h2>Yazmin</h2>
          <span>Backend</span>
        </li>
        <li class="card">
          <div class="img"><img src="images/img-2.jpg" alt="img" draggable="false"/></div>
          <h2>Zoee</h2>
          <span>Web Developer</span>
        </li>
        <li class="card">
          <div class="img"><img src="images/img-3.jpg" alt="img" draggable="false"/></div>
          <h2>David</h2>
          <span>Online</span>
        </li>
        <li class="card">
          <div class="img"><img src="images/img-4.jpg" alt="img" draggable="false"/></div>
          <h2>Teddy</h2>
          <span>eddi asado</span>
        </li>
        <li class="card">
          <div class="img"><img src="images/img-5.jpg" alt="img" draggable="false"/></div>
          <h2>Pa</h2>
          <span>yA NO HAY</span>
        </li>
        <li class="card">
          <div class="img"><img src="images/img-6.jpg" alt="img" draggable="false"/></div>
          <h2>Manguitos</h2>
          <span>Cantidad:1</span>
        </li>
      </ul>
      <i id="right" class="fa-solid fa-angle-right"><svg width={30} height={30} class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"/>
  </svg></i>
    </div>
    </>

  )
}

export default slider