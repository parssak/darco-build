import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';


const Preview = styled.div`
    flex-basis: content;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    position: relative;
`

const options = {
    cMapUrl: 'cmaps/',
    cMapPacked: true,
};

const PDFPreview = ({ file, nextStep, setPdfPages }) => {
    const [numPages, setNumPages] = useState(null);
    
    function onDocumentLoadSuccess(pdf) {
        console.log(pdf)
        setNumPages(pdf._pdfInfo.numPages);
        nextStep()
    }

    useEffect(() => {
        setPdfPages(numPages);
    }, [setPdfPages, numPages]);
    if (file === '')
        return null
    return (
        <Preview>
            <Document
                className={'pdf'}
                file={file}
                onLoadSuccess={onDocumentLoadSuccess}
                options={options}
            >
                {
                    // Array.from(
                    //     new Array(numPages),
                    //     (el, index) => (
                    //         <Page
                    //             key={`page_${index + 1}`}
                    //             pageNumber={index + 1}
                    //         />
                    //     ),
                    // )
                    <Page
                        key={`page_${0}`}
                        pageNumber={0 + 1}
                        scale={0.8}
                        className="page"
                    />
                    
                }
            </Document>
        </Preview>
    );
}

export default PDFPreview;
