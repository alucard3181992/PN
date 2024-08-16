
import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { PDFDownloadLink } from '@react-pdf/renderer';
import VoterPDF, { VerPdfVotante } from './PDF';

const VoterTable = ({ voters }) => {
    console.log(voters);
    const renderCategories = (rowData) => {
        const activeCategories = Object.entries(rowData.categories).filter(([, value]) => value.enabled);
        return activeCategories.map(([key, value]) => (
            <div key={key}>
                {key}: {value.respaldo}
            </div>
        ));
    };

    const printButtonTemplate = (rowData) => {
        return (
            <PDFDownloadLink document={<VoterPDF voter={rowData} />} fileName={`${rowData.nombre}.pdf`}>
                <Button label="Imprimir" />
            </PDFDownloadLink>
        );
    };

    const verButtonTemplate = (rowData) => {
        return (
            <Button
                label="Ver"
                onClick={() => {
                    setDocumento(true);
                    setDataNueva(rowData);
                }}
            />
        );
    };

    const [documento, setDocumento] = useState(false);
    const [dataNueva, setDataNueva] = useState(null);

    return (
        <div>
            <DataTable
                value={voters}
                rows={5}
                paginator
                rowsPerPageOptions={[5, 10, 15]}
                header={
                    <center>REGISTRO DE VOTANTES</center>
                }
            >
                <Column field="id" header="N" />
                <Column field="ci" header="CI" />
                <Column field="nombre" header="Votante" />
                <Column field="cel" header="Celular" />
                {/* <Column body={renderCategories} header="Categorías y Respaldos" /> */}
                <Column body={printButtonTemplate} header="Imprimir" />
                <Column body={verButtonTemplate} header="Ver" />
            </DataTable >
            {documento && (
                <VerPdfVotante
                    voter={dataNueva}
                    documento={documento}
                    setDocumento={setDocumento}
                />
            )}
        </div >
    );
};

export default VoterTable;

