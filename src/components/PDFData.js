import React from 'react';
import styled from 'styled-components';


const PDFDataSection = styled.div`
    flex-grow: 0.4;
    min-width: 300px;
`
const DataTitle = styled.h3`
    font-size: 1.4rem;
`
const DataSubTitle = styled.h3`
    font-size: 1.2rem;
`

const PDFData = ({ file }) => {
    console.log(file)
    if (!file)
        return null
    return (
        <PDFDataSection>
            <div className="h">
                <DataTitle>{file.name}</DataTitle>
                <h3>{Math.round(file.size / 1024)} Kb</h3>
            </div>
            <div className="h">
                <h4>Last modified: {new Date(file.lastModified).toISOString()} </h4>
            </div>

        </PDFDataSection>
    )
}


export default PDFData;
