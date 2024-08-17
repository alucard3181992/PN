import axios from "axios";
export const nuevosDatosExcel = async () => {
  console.log("ME LLAMAN NUEVOS ");
  const response = await axios.post("/api/generadorExcel", [
    "Juan Pérez NUEVO",
    "Desarrollador Web NUEVO",
    "555-1234456",
  ]);
  console.log("RESPONSE DE POST", response);
  if (response.statusText === "OK") {
    console.log("Variables saved successfully!");
  } else {
    console.error("Failed to save variables");
  }
};

export const consultaExcel = async () => {
  console.log("SI ME EJECUTO LLAMANDO AL GET");
  const response = await axios.get("/api/generadorExcel");
  const result = await response.data;
  console.log("RESULTADO DE GET", result);
  if (response.statusText === "OK") {
    console.log("Variables saved successfully!");
  } else {
    console.error("Failed to save variables");
  }
};

export const descargarExcel = async () => {
  await axios({
    url: "/api/descargarExcel",
    method: "GET",
    responseType: "blob", // Cambiamos para manejar blobs
  })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "archivo.xlsx";
      document.body.appendChild(a); // Necesario para Firefox
      a.click();
      a.remove();
    })
    .catch((error) => console.error("Error downloading file:", error));
};
export const modificarExcel = async () => {
  const response = await axios.put("/api/generadorExcel", { codigo: "COD-7" });
  if (response.statusText === "OK") {
    console.log("Variables saved successfully!");
  } else {
    console.error("Failed to save variables");
  }
};
