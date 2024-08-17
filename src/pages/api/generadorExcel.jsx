const XlsxPopulate = require("xlsx-populate");

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "GET": {
      try {
        // Cargar el archivo Excel
        console.log("SOY EL PINCHE GET DE EXCEL");
        const workbook = await XlsxPopulate.fromFileAsync("out.xlsx");

        // Seleccionar la hoja que contiene la tabla
        const sheet = workbook.sheet(0);

        // Determinar la última fila y columna con datos
        const lastRow = sheet.usedRange().endCell().rowNumber();
        const lastCol = sheet.usedRange().endCell().columnNumber();

        // Función para convertir número de columna a letra
        function numberToColumn(number) {
          let column = "";
          while (number > 0) {
            const modulo = (number - 1) % 26;
            column = String.fromCharCode(65 + modulo) + column;
            number = Math.floor((number - modulo) / 26);
          }
          return column;
        }

        // Obtener el rango dinámicamente
        const tableRange = sheet.range(
          `A1:${numberToColumn(lastCol)}${lastRow}`
        );

        // Obtener todos los valores del rango en forma de array
        const allValues = tableRange.value();

        // Obtener los encabezados (primer fila del rango)
        const headers = allValues[0];

        // Crear un array de objetos donde cada objeto representa una fila con sus claves basadas en los encabezados
        const data = allValues.slice(1).map((row) => {
          let rowData = {};
          headers.forEach((header, index) => {
            rowData[header] = row[index];
          });
          return rowData;
        });
        // Devolver los datos en la respuesta
        return res.status(200).json({ headers, data });
      } catch (error) {
        console.log("EL ERROR ES", error);
        return res.status(500).json({ message: "ERROR: " + error.message });
      }
    }
    case "POST": {
      try {
        console.log("SOY POST REQ", req.body);
        const newData = [
          req.body,
          // Agrega más filas si es necesario
        ];

        // 1. Abre el archivo Excel existente
        const workbook = await XlsxPopulate.fromFileAsync("./out.xlsx");
        const sheet = workbook.sheet(0); // Usamos la primera hoja del archivo

        // 2. Encuentra la última fila con datos en la columna A
        const lastRow = sheet.usedRange().endCell().rowNumber();

        // 3. Escribe los nuevos datos comenzando en la fila siguiente
        newData.forEach((row, index) => {
          row.forEach((cellValue, colIndex) => {
            // Asigna el valor a la celda correcta
            sheet.cell(lastRow + 1 + index, colIndex + 1).value(cellValue);
          });
        });

        // 4. Guarda el archivo con los nuevos datos añadidos
        await workbook.toFileAsync("./out.xlsx");

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
        console.log("SOY PUT ", req.body);
        const { codigo } = req.body;
        // Load an existing workbook
        const workbook = await XlsxPopulate.fromFileAsync("./out.xlsx");

        const sheet = workbook.sheet(0);
        const lastRow = sheet.usedRange().endCell().rowNumber();
        const lastCol = sheet.usedRange().endCell().columnNumber();
        for (var i = 1; i <= lastRow; i++) {
          if (sheet.cell(`A${i}`).value() === codigo) {
            sheet.cell(`B${i}`).value("Encontrado Nombre");
            sheet.cell(`C${i}`).value("Encontrado Apellido Paterno");
            sheet.cell(`D${i}`).value("Encontrado Apellido Materno");
          }
        }
        await workbook.toFileAsync("./out.xlsx");
        return res
          .status(200)
          .json({ message: "Datos modificados correctamente." });
      } catch (error) {
        console.log("ERROR", error);
        return res.status(500).json({ message: "ERROR: " + error.message });
      }
    }
  }
}
// Modify the workbook if needed
/* const value = workbook.sheet("Sheet1").cell("A1").value();
        console.log(value); */
// Modificar las celdas específicas con los nuevos datos
/* workbook.sheet(0).cell("B1").value("NUEVASO");
        workbook.sheet(0).cell("B2").value("PRUEBA"); */
// Convert the workbook to a binary format
// Set headers to prompt download in browser
/* res.setHeader("Content-Disposition", "attachment; filename=out.xlsx");
        res.setHeader(
          "Content-Type",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ); */
