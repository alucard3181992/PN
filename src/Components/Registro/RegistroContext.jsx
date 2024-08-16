import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const RegistroContext = createContext();

export const RegistroProvider = ({ children }) => {
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    // Cargar los registros cuando el componente se monte
    fetchRegistros();
  }, []);

  const fetchRegistros = async () => {
    try {
      const response = await axios.get("/api/generadorExcel2");
      setRegistros(response.data);
    } catch (error) {
      console.error("Error al obtener los registros:", error);
    }
  };

  const addRegistro = async (newRegistro) => {
    try {
      const response = await axios.post("/api/generadorExcel2", newRegistro);
      setRegistros([...registros, response.data]);
    } catch (error) {
      console.error("Error al añadir un registro:", error);
    }
  };

  const updateRegistro = async (updatedRegistro) => {
    try {
      await axios.put(`/api/generadorExcel2`, updatedRegistro);
      fetchRegistros(); // Recarga los registros
    } catch (error) {
      console.error("Error al actualizar el registro:", error);
    }
  };

  const deleteRegistro = async (codigo) => {
    try {
      await axios.delete(`/api/generadorExcel2`, { data: { codigo } });
      setRegistros(registros.filter((registro) => registro.Código !== codigo));
    } catch (error) {
      console.error("Error al eliminar el registro:", error);
    }
  };

  return (
    <RegistroContext.Provider
      value={{ registros, addRegistro, updateRegistro, deleteRegistro }}
    >
      {children}
    </RegistroContext.Provider>
  );
};
