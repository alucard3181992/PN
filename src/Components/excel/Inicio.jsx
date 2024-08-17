import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  descargarExcel,
  nuevosDatosExcel,
  consultaExcel,
  modificarExcel,
} from "./funciones";

import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const VistaPrincipalExcel = () => {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Realiza la solicitud a la API
    const fetchData = async () => {
      try {
        console.log("SI ME EJECUTO LLAMANDO AL GET");
        const response = await axios.get("/api/generadorExcel");
        //const response = await fetch("/api/generadorExcel");
        console.log("RESPONSE", response);
        const result = await response.data;
        setHeaders(result.headers); // Guarda los encabezados
        setData(result.data); // Guarda los datos
        console.log("DATOS OBTENIDOS", result.headers);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Deja de mostrar el loading una vez que los datos se han cargado
      }
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <div className="flex flex-wrap gap-2">
        <Button
          label="NuevosExcel"
          rounded
          text
          onClick={nuevosDatosExcel}
          icon="pi pi-file-excel"
        />
        <Button
          label="DescargarExcel"
          rounded
          text
          onClick={descargarExcel}
          icon="pi pi-file-excel"
        />
        <Button
          label="ModificarExcel"
          rounded
          text
          onClick={modificarExcel}
          icon="pi pi-file-excel"
        />

        {loading ? (
          <p>Cargando datos...</p>
        ) : (
          <DataTable
            value={data}
            stripedRows
            className="w-full"
            scrollable={false}
            selectionMode="radiobutton"
          >
            {headers.map((header, index) => (
              <Column key={index} field={header} header={header} />
            ))}
          </DataTable>
        )}
      </div>
    </React.Fragment>
  );
};

export default VistaPrincipalExcel;
