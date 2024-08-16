import React, { useContext, useState } from "react";
import { RegistroContext } from "./RegistroContext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import RegistroForm from "./RegistroForm";

const RegistroTable = () => {
  const { registros, deleteRegistro } = useContext(RegistroContext);
  const [selectedRegistro, setSelectedRegistro] = useState(null);

  const handleDelete = () => {
    if (selectedRegistro) {
      deleteRegistro(selectedRegistro.Código);
      setSelectedRegistro(null);
    }
  };
  console.log("REGISTROS", registros);
  return (
    <div>
      <DataTable
        value={registros}
        selectionMode="single"
        onSelectionChange={(e) => setSelectedRegistro(e.value)}
      >
        <Column field="Código" header="Código" />
        <Column field="Nombre" header="Nombre" />
        <Column field="Apellido P" header="Apellido P" />
        <Column field="Apellido M" header="Apellido M" />
        <Column field="Celular" header="Celular" />
        <Column field="Dato1" header="Dato1" />
        <Column field="Dato2" header="Dato2" />
        <Column field="Dato3" header="Dato3" />
      </DataTable>

      <div style={{ marginTop: "20px" }}>
        <Button
          label="Añadir"
          icon="pi pi-plus"
          onClick={() => setSelectedRegistro(null)}
        />
        <Button
          label="Modificar"
          icon="pi pi-pencil"
          onClick={() => {
            /* handleEdit */
          }}
        />
        <Button label="Eliminar" icon="pi pi-trash" onClick={handleDelete} />
      </div>

      {selectedRegistro && <RegistroForm registro={selectedRegistro} />}
    </div>
  );
};

export default RegistroTable;
