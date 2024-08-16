import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import VoterTable from './Tabla';

// Updated categories data
const categories = [
    {
        name: 'Juventudes', label: 'Juventudes',
        documents: { "Cedula de Identidad": false }
    },
    {
        name: 'Mujer', label: 'Mujer',
        documents: { "Cedula de Identidad": false }
    },
    {
        name: 'Antigua Militancia y Adulto Mayor', label: 'Antigua Militancia y Adulto Mayor',
        documents: { "Cedula de Identidad": false }
    },
    {
        name: 'Persona con Discapacidad', label: 'Persona con Discapacidad',
        documents: { "Cedula de Identidad": false, "Carnet de Discapacidad": false }
    },
    {
        name: 'LGTBI', label: 'LGTBI',
        documents: { "Cedula de Identidad": false, "Declaracion Jurada Voluntaria": false }
    },
    {
        name: 'Profesionales', label: 'Profesionales',
        documents: { "Cedula de Identidad": false, "Titulo Academico": false }
    },
    {
        name: 'Universitarios y Estudiantes', label: 'Universitarios y Estudiantes',
        documents: { "Cedula de Identidad": false, "Matricula": false, "Carnet Universitario": false }
    },
    {
        name: 'deportistas', label: 'Deportistas',
        documents: { "Cedula de Identidad": false, "Carnet de Deportista": false, "Documento que acredite pertenecer a Club Deportivo": false, "Documento que acredite pertenecer a Federación Deportiva": false }
    },
    {
        name: 'Transportistas', label: 'Transportistas',
        documents: { "Cedula de Identidad": false, "Licencia de Conducir": false, "Documento que acredite pertenecer a Asociación de Transporte": false, "Documento que acredite pertenecer a Federación de Transporte": false }
    },
    {
        name: 'Gremiales', label: 'Gremiales',
        documents: { "Cedula de Identidad": false, "Documento que acredite pertenecer a Asociación de Gremial": false, "Documento que acredite pertenecer a Federación de Gremial": false }
    },
    {
        name: 'Empresarios', label: 'Empresarios',
        documents: { "Cedula de Identidad": false, "Registro de Empresa": false }
    },
    {
        name: 'Campesinos', label: 'Campesinos',
        documents: { "Cedula de Identidad": false, "Documento que acredite residencia Rural": false }
    },
    {
        name: 'Mineros', label: 'Mineros',
        documents: { "Cedula de Identidad": false, "Documento que acredite pertenecer a empresa minera": false, "Documento que acredite pertenecer a cooperativa minera": false }
    }
];

const VoterRegistration = () => {
    const [voter, setVoter] = useState({
        nombre: '',
        ci: '',
        cel: '',
        categories: categories.reduce((acc, category) => {
            acc[category.name] = { enabled: false, documents: category.documents };
            return acc;
        }, {})
    });
    const [voters, setVoters] = useState([]);
    const toast = React.useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setVoter({ ...voter, [name]: value });
    };

    const handleCheckboxChange = (category) => {
        setVoter({
            ...voter,
            categories: {
                ...voter.categories,
                [category]: {
                    ...voter.categories[category],
                    enabled: !voter.categories[category].enabled,
                }
            }
        });
    };

    const handleDocumentChange = (category, document) => {
        setVoter({
            ...voter,
            categories: {
                ...voter.categories,
                [category]: {
                    ...voter.categories[category],
                    documents: {
                        ...voter.categories[category].documents,
                        [document]: !voter.categories[category].documents[document],
                    }
                }
            }
        });
    };

    const handleSubmit = () => {
        // Verificar si el votante ya existe con el mismo nombre y CI
        const duplicate = voters.some(v => v.nombre === voter.nombre && v.ci === voter.ci);

        if (duplicate) {
            toast.current.show({ severity: 'warn', summary: 'Advertencia', detail: 'El votante ya está registrado con el mismo nombre y CI', life: 3000 });
            return;
        }

        setVoters([...voters, { ...voter, id: voters.length + 1 }]);
        setVoter({
            nombre: '',
            ci: '',
            cel: '',
            categories: categories.reduce((acc, category) => {
                acc[category.name] = { enabled: false, documents: category.documents };
                return acc;
            }, {})
        });
    };

    return (
            <div className="p-fluid">
                <Toast ref={toast} />
                <div className='grid'>
                    <div className='col-12 text-3xl text-center font-bold underline'>Registro Votante</div>
                    <div className="mb-3 col-12 md:col-4">
                        <span className="p-float-label p-input-icon-right w-full">
                            <InputText id="nombre" name="nombre" value={voter.nombre} onChange={handleInputChange} />
                            <label htmlFor="nombre">Nombre</label>
                        </span>
                    </div>
                    <div className="mb-3 col-12 md:col-4">
                        <span className="p-float-label p-input-icon-right w-full">
                            <InputText id="ci" name="ci" value={voter.ci} onChange={handleInputChange} />
                            <label htmlFor="ci">CI</label>
                        </span>
                    </div>
                    <div className="mb-3 col-12 md:col-4">
                        <span className="p-float-label p-input-icon-right w-full">
                            <InputText id="cel" name="cel" value={voter.cel} onChange={handleInputChange} />
                            <label htmlFor="cel">Celular</label>
                        </span>
                    </div>
                </div>

                {categories.map(category => (
                    <div key={category.name} className="p-field-checkbox mb-3 gap-2">
                        <Checkbox
                            inputId={category.name}
                            checked={voter.categories[category.name].enabled}
                            onChange={() => handleCheckboxChange(category.name)}
                            className='mr-2' />
                        <label htmlFor={category.name} className='font-bold'>{category.label}</label>
                        {voter.categories[category.name].enabled && (
                            <div className='ml-5 mt-2 card'>
                                {Object.keys(voter.categories[category.name].documents).map(document => (
                                    <div key={document} className="p-field-checkbox mb-3">
                                        <Checkbox
                                            inputId={document}
                                            checked={voter.categories[category.name].documents[document]}
                                            onChange={() => handleDocumentChange(category.name, document)}
                                            className='mr-2' />
                                        <label htmlFor={document}>{document}</label>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
                <Button label="Registrar Votante" onClick={handleSubmit} />
                <div className='col-12 card mt-3'>
                    {voters.length > 0 && <VoterTable voters={voters} />}
                </div>
            </div>
    );
};

export default VoterRegistration;

