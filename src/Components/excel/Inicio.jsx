import React, { useEffect, useState } from "react";

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

  useEffect(() => {
    // Realiza la solicitud a la API
    const fetchData = async () => {
      try {
        const response = await fetch("/api/generadorExcel");
        const result = await response.json();
        setHeaders(result.headers); // Guarda los encabezados
        setData(result.data); // Guarda los datos
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  /* <Button
            label="ConsultarExcel"
            className="mb-3"
            rounded
            onClick={consultaExcel}
          /> */
  return (
    <React.Fragment>
      <div className="flex flex-wrap gap-2 ">
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
        {/* {JSON.stringify(data)} */}
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
      </div>
    </React.Fragment>
  );
};
export default VistaPrincipalExcel;
