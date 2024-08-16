import React from "react";
import { RegistroProvider } from "@/Components/Registro/RegistroContext";
import RegistroTable from "@/Components/Registro/RegistroTable";

const IndexPage = () => (
  <RegistroProvider>
    <div className="container">
      <h1>Gestión de Registros</h1>
      <RegistroTable />
    </div>
  </RegistroProvider>
);

export default IndexPage;
