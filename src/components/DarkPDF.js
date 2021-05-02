import React from 'react';
import  { Page,  Document, StyleSheet, Image } from '@react-pdf/renderer';
import { v4 as uuidv4 } from 'uuid';
// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#000000'
    }
});
const DarkPDF = ({images, dimensions, texts}) => {
    return (
            <Document onRender={e => console.log(e)} >
            {
                images.map((e, index) => {
                        return (
                            <Page size={{ width: dimensions[0], height: dimensions[1]}} style={styles.page} key={uuidv4()}>
                                <Image src={e} />
                                {/* {
                                    texts[index]?.map(e => console.log(e))
                                } */}
                                {
                                    console.log("making page!", index)
                                }
                            </Page>
                        )
                    })
                }
            </Document>
    );
}
export default DarkPDF;
