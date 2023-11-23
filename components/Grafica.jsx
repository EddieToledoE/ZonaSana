import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import estilos from "@/styles/Grafica.css";

const ChartComponent = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    // Filtrar datos para los últimos 5 días
    const today = new Date();
    const lastFiveDays = new Array(5).fill().map((_, index) => {
      const date = new Date();
      date.setDate(today.getDate() - index);
      return date.toISOString().split("T")[0];
    });

    const filteredData = data.filter((venta) =>
      lastFiveDays.includes(venta.fecha.split("T")[0])
    );

    // Organizar datos para Chart.js
    const labels = lastFiveDays.reverse();
    const datasets = [
      {
        label: "Venta Diaria",
        data: labels.map((fecha) =>
          filteredData.reduce((total, venta) => {
            if (venta.fecha.split("T")[0] === fecha) {
              return total + venta.monto;
            }
            return total;
          }, 0)
        ),
        backgroundColor: "rgba(255, 99, 132, 0.2)", // Color para el monto
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        borderRadius: 10,
      },
      {
        label: "Ganancia Diaria",
        data: labels.map((fecha) =>
          filteredData.reduce((total, venta) => {
            if (venta.fecha.split("T")[0] === fecha) {
              return total + venta.ganancia;
            }
            return total;
          }, 0)
        ),
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Color para la ganancia
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        borderRadius: 10,
      },
    ];

    chartInstanceRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: datasets,
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        stacked: false, // Configuración para barras no apiladas
      },
    });
  }, [data]);

  return (
    <div className="Grafica">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default ChartComponent;
