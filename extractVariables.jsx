//const filePath = "./src/Components/rhea/_variables.scss";

const fs = require("fs");

// Ruta del archivo SCSS
const filePath = "./src/Components/rhea/_variables.scss";

// Leer el archivo SCSS
fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error al leer el archivo:", err);
    return;
  }

  // Dividir el contenido del archivo en líneas
  const lines = data.split("\n");
  const categories = {};
  let currentCategory = "Global"; // Categoría por defecto

  // Recorrer cada línea para encontrar categorías y variables
  lines.forEach((line) => {
    line = line.trim();
    if (line.startsWith("//")) {
      // Extraer categoría desde el comentario
      currentCategory = line.replace("//", "").trim();
      // Inicializar la categoría si no existe
      if (!categories[currentCategory]) {
        categories[currentCategory] = [];
      }
    } else if (line.startsWith("$")) {
      // Añadir la variable a la categoría actual
      if (categories[currentCategory]) {
        categories[currentCategory].push(line);
      } else {
        console.error(`Categoría ${currentCategory} no está inicializada.`);
      }
    }
  });

  // Mostrar las categorías y variables extraídas
  console.log(categories);

  // Guardar el resultado en un archivo JSON
  fs.writeFileSync(
    "./src/styles/variables.json",
    JSON.stringify(categories, null, 2)
  );
});
