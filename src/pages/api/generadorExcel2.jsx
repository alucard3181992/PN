import XlsxPopulate from "xlsx-populate";

export default async function handler(req, res) {
    const filePath = "./out.xlsx";
    const workbook = await XlsxPopulate.fromFileAsync(filePath);
    const sheet = workbook.sheet(0); 
    const table = sheet.table(0); 

    switch (req.method) {
        case "GET":
            const headers = table.headers();
            const data = table.rows().map(row => {
                const rowData = {};
                headers.forEach((header, i) => {
                    rowData[header] = row.cell(i + 1).value();
                });
                return rowData;
            });
            return res.status(200).json(data);
        
        case "POST":
            const newData = req.body;
            table.addRow().values(newData);
            await workbook.toFileAsync(filePath);
            return res.status(201).json(newData);

        case "PUT":
            const updatedData = req.body;
            const { Código } = updatedData;
            const targetRow = table.rows().find(row => row.cell(1).value() === Código);

            if (targetRow) {
                updatedData.forEach((value, i) => {
                    targetRow.cell(i + 1).value(value);
                });
                await workbook.toFileAsync(filePath);
                return res.status(200).json({ message: "Registro actualizado" });
            } else {
                return res.status(404).json({ message: "Registro no encontrado" });
            }

        case "DELETE":
            const { codigo } = req.body;
            const rowToDelete = table.rows().find(row => row.cell(1).value() === codigo);

            if (rowToDelete) {
                rowToDelete.delete();
                await workbook.toFileAsync(filePath);
                return res.status(200).json({ message: "Registro eliminado" });
            } else {
                return res.status(404).json({ message: "Registro no encontrado" });
            }

        default:
            return res.status(405).json({ message: "Método no permitido" });
    }
}
