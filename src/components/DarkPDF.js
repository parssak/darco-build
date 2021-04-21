import React from 'react';
import  { Page,  Document, StyleSheet, Image } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#000000'
    }
});
const DarkPDF = ({images, dimensions}) => {
    return (
            <Document onRender={e => console.log(e)} >
                {
                    images.map(e => {
                        return (
                            <Page size={{ width: dimensions[0], height: dimensions[1]}} style={styles.page}>
                                <Image src={e} />
                            </Page>
                        )
                    })
                }
            </Document>
    );
}
export default DarkPDF;
