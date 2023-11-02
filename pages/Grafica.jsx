import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import estilos from '@/styles/Grafica.css'
const ChartComponent = ({initialData}) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }
    const ctx = chartRef.current.getContext('2d');
    chartInstanceRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo','Junio','Julio'],
        datasets: [
          {
            label: 'Ventas Mensuales',
            data: initialData,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            borderRadius: 10,
              
            
          
          },
        ],
      },
    });
  }, [initialData]);

  return (
    <div className='Grafica'>
    <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default ChartComponent;
