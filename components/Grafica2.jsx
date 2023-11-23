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

    // Organizar datos para Chart.js
    const groupedData = groupDataByMonth(data);

    const labels = Object.keys(groupedData).reverse();
    const datasets = [
      {
        label: "Ganancias mensual por envíos",
        data: labels.map((mes) =>
          groupedData[mes].reduce((total, envio) => total + envio.valor, 0)
        ),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
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
      },
    });
  }, [data]);

  // Función para agrupar los datos por mes
  const groupDataByMonth = (data) => {
    return data.reduce((result, envio) => {
      const mes = envio.fecha.split("-")[1];
      if (!result[mes]) {
        result[mes] = [];
      }
      result[mes].push(envio);
      return result;
    }, {});
  };

  return (
    <div className="Grafica">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default ChartComponent;
