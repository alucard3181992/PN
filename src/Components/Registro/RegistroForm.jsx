import React, { useState, useContext, useEffect } from "react";
import { RegistroContext } from "./RegistroContext";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const RegistroForm = ({ registro }) => {
    const { addRegistro, updateRegistro } = useContext(RegistroContext);
    const [visible, setVisible] = useState(true);
    const [formData, setFormData] = useState({
        Código: "",
        Nombre: "",
        "Apellido P": "",
        "Apellido M": "",
        Celular: "",
        Dato1: "",
        Dato2: "",
        Dato3: "",
    });

    useEffect(() => {
        if (registro) {
            setFormData(registro);
        }
    }, [registro]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        if (registro) {
            updateRegistro(formData);
        } else {
            addRegistro(formData);
        }
        setVisible(false);
    };

    return (
        <Dialog visible={visible} onHide={() => setVisible(false)} header={registro ? "Modificar Registro" : "Añadir Registro"}>
            <div className="p-grid p-fluid">
                {Object.keys(formData).map((key) => (
                    <div key={key} className="p-col-12">
                        <InputText name={key} value={formData[key]} onChange={handleChange} placeholder={key} />
                    </div>
                ))}
            </div>
            <Button label={registro ? "Modificar" : "Añadir"} icon="pi pi-check" onClick={handleSubmit} />
        </Dialog>
    );
};

export default RegistroForm;
