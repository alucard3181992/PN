import React, { useState } from "react";

import VariableEditor from "@/components/VariableEditor";
import PreviewPanel from "@/components/PreviewPanel";
import variables from "@/styles/variables.json";
import VoterRegistration from "@/Components/Votantes/Principal";
import { Button } from "primereact/button";
import VistaPrincipalExcel from "@/Components/excel/Inicio";
//import CategoryPanel from "@/Components/CategoryPanel";
import CategoryPanel from "../Components/CategoryPanel";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(
    Object.keys(variables)[0]
  );
  const [editedVariables, setEditedVariables] = useState(variables);

  const handleSave = async (newVariables) => {
    // Actualizamos el estado con los nuevos valores
    const updatedCategory = editedVariables[selectedCategory].map(
      (variable) => {
        const [name, value] = variable.split(":");
        const cleanName = name.trim();
        return newVariables[cleanName]
          ? `${cleanName}: ${newVariables[cleanName]} !default;`
          : variable;
      }
    );

    const updatedVariables = {
      ...editedVariables,
      [selectedCategory]: updatedCategory,
    };

    setEditedVariables(updatedVariables);

    // Enviar los datos a la API para guardarlos en el archivo JSON
    const response = await fetch("/api/saveVariables", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ updatedVariables }),
    });

    if (response.ok) {
      console.log("Variables saved successfully!");
    } else {
      console.error("Failed to save variables");
    }
  };

  return (
    <React.Fragment>
      <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
        <CategoryPanel
          categories={Object.keys(editedVariables)}
          onSelectCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
        />
        <VariableEditor
          variables={editedVariables[selectedCategory]}
          onSave={handleSave}
        />
        <PreviewPanel />
      </div>
    </React.Fragment>
  );
}

{
  /* <div className="grid-sectionN">
        <div className="cardN discussions">
          <a
            href="https://github.com/orgs/primefaces/discussions"
            target="_blank"
          >
            {
              // eslint-disable-next-line @next/next/no-img-element
              <img src="./discussions.svg" alt="primeland"></img>
            }
          </a>
        </div>
      </div> */
}
{
  /* <VistaPrincipalExcel /> */
}
{
  /* <VoterRegistration /> */
}
