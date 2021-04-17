import React from 'react';
import  { Page,  Document, StyleSheet, Image } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#000000'
    }
});
const DarkPDF = ({images}) => {
    return (
            <Document onRender={e => console.log(e)} >
                {
                    images.map(e => {
                        return (
                            <Page size="A4" style={styles.page}>
                                <Image src={e} />
                            </Page>

                        )
                    })
                }

                {/* <Page size="A4" style={styles.page}>
                    <Image src={state.images[0]} />
                </Page> */}
                {/* <Page size="A4" style={styles.page}>
                    <Image src={state.images[1]} />
                </Page> */}
            </Document>
            
        // </PDFViewer>
    );
}
export default DarkPDF;
