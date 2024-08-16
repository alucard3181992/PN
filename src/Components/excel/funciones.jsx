export const nuevosDatosExcel = async () => {
  console.log("ME LLAMAN NUEVOS ");
  const response = await fetch("/api/generadorExcel", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(["Juan Pérez", "Desarrollador Web", "555-1234"]),
  });
  /**nombre: "Juan Pérez",
      cargo: "Desarrollador Web",
      telefono: "555-1234",
      email: "juan.perez@example.com",
      empresa: "Tech Solutions", */
  if (response.ok) {
    console.log("Variables saved successfully!");
  } else {
    console.error("Failed to save variables");
  }
};

export const consultaExcel = async () => {
  const response = await fetch("/api/generadorExcel");
  const result = await response.json();
  console.log("RESULTADO", result);
  if (response.ok) {
    console.log("Variables saved successfully!");
  } else {
    console.error("Failed to save variables");
  }
};
export const descargarExcel = async () => {
  fetch("/api/descargarExcel", {
    method: "GET",
  })
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
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
  const response = await fetch("/api/generadorExcel", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ codigo: "COD-5" }),
  });
  if (response.ok) {
    console.log("Variables saved successfully!");
  } else {
    console.error("Failed to save variables");
  }
};
