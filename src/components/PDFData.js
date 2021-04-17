import React, { useRef } from 'react';
import styled from 'styled-components';
import { Button } from '../styles'
const PDFDataSectionContainer = styled.div`
    flex-grow: 0.4;
    min-width: 300px;
    display: flex;
    flex-direction: column;
`
const DataTitle = styled.h3`
    font-size: 1.4rem;
    letter-spacing: -0.01rem;
`
const DataSubTitle = styled.h4`
    font-size: 1rem;
    color: rgba(153, 153, 153, 1);
`
const DataSection = styled.div`
    margin-bottom: 1.5rem;
`
const PDFData = ({ file, pages, onFileChange }) => {
    const inputFile = useRef(null)
    console.log(file)
    if (!file)
        return null
    return (
        <PDFDataSectionContainer>
            <DataSection>
                <div className="h">
                    <DataTitle>{file.name}</DataTitle>
                    <h3>{Math.round(file.size / 1024)} Kb</h3>
                </div>
                <div className="h">
                    <DataSubTitle>Last modified: {new Date(file.lastModified).toLocaleDateString()} </DataSubTitle>
                    <DataSubTitle>{pages} page{pages > 1 && 's'}</DataSubTitle>
                </div>
            </DataSection>
            <DataSection>
                <div className="h">
                    <DataTitle>Quality</DataTitle>
                </div>
            </DataSection>
            <DataSection>
                <div className="h">
                    <DataTitle>Theme</DataTitle>
                </div>
            </DataSection>
            <Button secondary onClick={() => inputFile.current.click()}>Select New File</Button>
            <input type="file" accept="application/pdf" ref={inputFile} style={{ display: 'none' }} onChange={onFileChange} />
        </PDFDataSectionContainer>
    )
}


export default PDFData;
