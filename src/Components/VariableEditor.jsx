import { useState } from "react";
import { ColorPicker } from "primereact/colorpicker";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

function VariableEditor({ variables, onSave }) {
  const [currentValues, setCurrentValues] = useState({});

  const handleChange = (name, value, NoColor = true) => {
    console.log("EL VALOR Q LLEGA ES", value);
    const formattedValue = NoColor ? value : `#${value}`;
    console.log("FORMATEADO", formattedValue);
    setCurrentValues((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  const handleSaveClick = () => {
    onSave(currentValues);
  };

  const isColorVariable = (value) => {
    return (
      value.startsWith("#") ||
      value.startsWith("rgb") ||
      value.startsWith("hsl")
    );
  };

  return (
    <div style={{ height: "100vh", overflow: "hidden", overflowY: "auto" }}>
      {variables.map((variable, index) => {
        const [name, value] = variable.split(":");
        const cleanName = name.trim();
        const cleanValue = value.trim().replace("!default;", "");

        return (
          <div key={index} style={{ marginBottom: "20px" }}>
            <div className="text-primary font-bold">{cleanName}</div>
            {isColorVariable(cleanValue) ? (
              <>
                <ColorPicker
                  value={currentValues[cleanName] || cleanValue}
                  onChange={(e) => handleChange(cleanName, e.value, false)}
                  format="hex" // o "rgb" dependiendo del formato deseado
                  inline
                />
                <p>Current value: {currentValues[cleanName] || cleanValue}</p>
              </>
            ) : (
              <>
                <InputText
                  value={currentValues[cleanName] || cleanValue}
                  onChange={(e) => handleChange(cleanName, e.target.value)}
                />
              </>
            )}
          </div>
        );
      })}
      <Button onClick={handleSaveClick} label="Guardar" />
    </div>
  );
}

export default VariableEditor;
