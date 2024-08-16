import React, { useState } from 'react';
import { PDFViewer, PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { Dialog } from 'primereact/dialog';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        padding: 30,
    },
    title: {
        fontSize: 12,
        textAlign: 'center',
        margin: 3
    },
    section: {
        margin: 5,
        padding: 5,
        flexGrow: 1
    },
    table: {
        display: "table",
        width: "auto",
        borderStyle: "solid",
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0
    },
    tableRow: {
        margin: "auto",
        flexDirection: "row"
    },
    tableCol: {
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    border1: {
        borderStyle: "solid",
        borderWidth: 0.5,
        borderLeftWidth: 0,
        borderBottomWidth: 0
    },
    tableCell: {
        margin: 5,
        fontSize: 10,
        textAlign: 'center',  // Center-align text
        overflow: 'hidden',   // Handle text overflow
        whiteSpace: 'nowrap'  // Prevent text from wrapping
    },
    text: {
        fontSize: 12,
    },
    text2: {
        fontSize: 12,
        textAlign: 'right',
    }
});

const VoterPDF = ({ voter }) => {
    const { nombre, ci, cel, categories } = voter;
    const activeCategories = Object.entries(categories).filter(([, value]) => value.enabled);
    console.log("ACTIVS", activeCategories);
    return (<Document>
        <Page style={styles.page}>
            <Text style={{ ...styles.title, }}>ELECCION DE COMANDOS FUNCIONALES Y SECTORIALES 2024</Text>
            <Text style={styles.title}>VERIFICACION Y HABILITACION DE MILITANTES ELECTORES</Text>
            <View style={styles.section}>
                <Text style={styles.text2}>CODIGO N°: {100}</Text>
                <Text style={styles.text2}>N° DE COMANDO HABILITADOS {4}</Text>
                <Text style={styles.text}>Nombre: {nombre}</Text>
                <Text style={styles.text}>CI: {ci}</Text>
                <Text style={styles.text}>Celular: {cel}</Text>
            </View>
            <View style={styles.table}>
                <View style={{ ...styles.tableRow, backgroundColor: "#f0f0f0" }} fixed>
                    <View style={{ ...styles.tableCol, width: '5%' }}><Text style={styles.tableCell}>Nº</Text></View>
                    <View style={{ ...styles.tableCol, width: '20%' }}><Text style={styles.tableCell}>COMANDO</Text></View>
                    <View style={{ ...styles.tableCol, width: '35%', padding: 0, margin: 0 }}>
                        <Text style={styles.tableCell}>VERIFICACION</Text>
                        <View style={{ ...styles.tableRow }}>
                            <View style={{ ...styles.border1, width: '65%', }}>
                                <Text style={{ ...styles.tableCell }} >{"DOCUMENTO HABILITANTE"}</Text>
                            </View>
                            <View style={{ ...styles.border1, borderRightWidth: 0, width: '35%', }}>
                                <Text style={styles.tableCell}>PRESENTO</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ ...styles.tableCol, width: '20%' }}><Text style={styles.tableCell}>HABILITACION</Text></View>
                    <View style={{ ...styles.tableCol, width: '20%' }}><Text style={styles.tableCell}>EMISION DE VOTO</Text></View>
                </View>
                {Object.keys(categories).map((key, index) => (
                    <View key={key} style={styles.tableRow}>
                        <View style={{ ...styles.tableCol, width: '5%' }}><Text style={styles.tableCell}>{index + 1}</Text></View>
                        <View style={{ ...styles.tableCol, width: '20%' }}><Text style={{ ...styles.tableCell, textAlign: 'center' }}>{key.toUpperCase()}</Text></View>
                        <View style={{ ...styles.tableCol, width: '35%', padding: 0, margin: 0 }}>
                            {Object.entries(categories[key].documents).map((doc) => (<View key={doc[0]} style={styles.tableRow}>
                                <Text style={{ ...styles.tableCell, textAlign: 'center', width: '65%', }}>{doc[0]}</Text>

                                <Text style={{ ...styles.tableCell, textAlign: 'center', width: '35%', }}>{doc[1] ? "Si" : "No"}</Text>

                            </View>
                            ))}
                        </View>
                        <View style={{ ...styles.tableCol, width: '20%' }}><Text style={{ ...styles.tableCell, textAlign: 'center', }}>{categories[key].enabled ? 'SI' : 'NO'}</Text></View>
                        <View style={{ ...styles.tableCol, width: '20%' }}><Text style={styles.tableCell}></Text></View>
                    </View>
                ))}
            </View>
        </Page>
    </Document>
    )
};

export default VoterPDF;

export const VerPdfVotante = ({ voter, setDocumento, documento }) => {
    const hideModal = () => {
        setDocumento(false);
    };
    return (<Dialog
        visible={documento}
        style={{ width: '80vw' }}
        onHide={hideModal}
        modal>
        <PDFViewer width="100%" height="800">
            <VoterPDF voter={voter} />
        </PDFViewer>
    </Dialog>)
}