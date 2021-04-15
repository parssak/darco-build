import React, { useState } from 'react';
import styled from 'styled-components';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';


const Preview = styled.div`
    background: green;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    position: relative;
`

const options = {
    cMapUrl: 'cmaps/',
    cMapPacked: true,
};

const PDFPreview = ({ file }) => {
    const [numPages, setNumPages] = useState(null);
    function onDocumentLoadSuccess(pdf) {
        setNumPages(pdf.nextNumPages);
        console.log(pdf);
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
