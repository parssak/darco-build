import React, { useState } from 'react';
import styled from 'styled-components';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';


const Preview = styled.div`
    /* background: #000; */
    flex-grow: 1;
    display: flex;
    justify-content: center;
    position: relative;
`

const options = {
    cMapUrl: 'cmaps/',
    cMapPacked: true,
};

const PDFPreview = ({ file, nextStep }) => {
    const [numPages, setNumPages] = useState(null);
    function onDocumentLoadSuccess(pdf) {
        setNumPages(pdf.nextNumPages);
        nextStep()
    }
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
                    Array.from(
                        new Array(numPages),
                        (el, index) => (
                            <Page
                                key={`page_${index + 1}`}
                                pageNumber={index + 1}
                            />
                        ),
                    )
                }
            </Document>
        </Preview>
    );
}

export default PDFPreview;
