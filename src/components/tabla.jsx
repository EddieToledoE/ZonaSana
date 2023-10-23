"use client";
import MUIDataTable from "mui-datatables";
import Axios from "axios";
import Styles from "@/styles/Tabla-clientes.css";
import { useEffect, useState } from "react";

export const TablaClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  const ruta = "http://localhost:3000/api/clientes";

  const getData = async () => {
    await Axios.get(ruta).then((response) => {
      const data = response.data;
      console.log(data);
      setClientes(data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      name: "nombre",
      label: "Nombre",
    },
    {
      name: "apellido",
      label: "Apellido",
    },
    {
      name: "telefono",
      label: "Telefono",
    },
    {
      name: "acciones",
      label: "Direccion",
      options: {
        customBodyRender: (value, tableMeta) => {
          return (
            <button onClick={() => handleShowDetails(tableMeta.rowData)}>
              Ver Detalles
            </button>
          );
        },
      },
    },
  ];

  const handleShowDetails = (rowData) => {
    setSelectedRow(rowData);
  };

  const handleCloseModal = () => {
    setSelectedRow(null);
  };

  return (
    <div>
      <MUIDataTable
        title={"Tabla de clientes"}
        data={clientes}
        columns={columns}
      />

      {selectedRow && (
        <div className="modal">
          <div className="modal_header">
            <h3>Dirección</h3>
          </div>
          <p>CP: {selectedRow[3]}</p>
          <p>Calle: {selectedRow[4]}</p>
          <p>Municipio: {selectedRow[5]}</p>
          <p>Estado: {selectedRow[6]}</p>
          <button onClick={handleCloseModal}>Cerrar</button>
        </div>
      )}
    </div>
  );
};
