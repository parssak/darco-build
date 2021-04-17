import React from 'react';
import ReactPDF, { Page, Text, View, Document, StyleSheet, PDFDownloadLink, PDFViewer, PDFRenderer } from '@react-pdf/renderer';
import { useDarco } from '../DarcoContext';

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
});
const DarkPDF = () => {
    const { state } = useDarco();
    console.log(state);
    return (
        <PDFViewer>
            <Document onRender={e => console.log(e)}>
                <Page size="A4" style={styles.page}>
                    <Text>Hello world</Text>
                </Page>
            </Document>
        </PDFViewer>
    );
}
export default DarkPDF;
