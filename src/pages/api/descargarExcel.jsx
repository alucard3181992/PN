const XlsxPopulate = require("xlsx-populate");

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "GET": {
      try {
        // Cargar el archivo de Excel existente
        const workbook = await XlsxPopulate.fromFileAsync("./out.xlsx");

        // Convertir el archivo a un buffer para enviarlo como respuesta
        const buffer = await workbook.outputAsync();

        // Enviar el archivo como respuesta
        res.setHeader(
          "Content-Disposition",
          'attachment; filename="archivo.xlsx"'
        );
        res.setHeader(
          "Content-Type",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        return res.status(200).send(buffer);
      } catch (error) {
        console.log("ERROR", error);
        return res.status(500).json({ message: "ERROR: " + error.message });
      }
    }

    case "POST": {
      try {
        return res
          .status(200)
          .json({ message: "Datos añadidos correctamente." });
      } catch (error) {
        console.error("Error al modificar el archivo:", error.message);
        return res.status(500).json({ message: "ERROR: " + error.message });
      }
    }

    case "DELETE": {
      try {
        return res.status(200).json({ message: "TODO BIEN" });
      } catch (error) {
        return res.status(500).json({ message: "ERROR: " + error.message });
      }
    }

    case "PUT": {
      try {
        return res.status(200).send({ message: "TODO BIEN: " });
      } catch (error) {
        console.log("ERROR", error);
        return res.status(500).json({ message: "ERROR: " + error.message });
      }
    }
  }
}
