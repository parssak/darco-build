import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Button } from '../styles';

const StepsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0;
    margin-top: auto;
    margin-bottom: 2rem;
    flex-basis: 1;
    padding-right: 2rem;
`
const Step = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: 0;
    margin-bottom: 2rem;
    & > * {
        margin-right: 1rem;
    }
`
const StepTextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`
const StepTitle = styled.p`
font-weight: 600;
font-size: 1.2rem;
letter-spacing: -0.04rem;
`
const StepDescription = styled.p`
font-weight: 400;
font-size: 1.2rem;
letter-spacing: -0.04rem;

`
const Steps = ({ currentStep, onFileChange }) => {
    const inputFile = useRef(null)
    

    const onButtonClick = () => {
        // `current` points to the mounted file input element
        switch (currentStep) {
            case 1:
                inputFile.current.click();
                break;
            default:
                break;
        }
    };
    
    return (
        <StepsContainer>
            <Step>
                <div className="icon"/>
                <StepTextWrapper>
                    <StepTitle>Select</StepTitle>
                    <StepDescription>Choose from Files</StepDescription>
                </StepTextWrapper>
            </Step>
            <Step>
                <div className="icon"/>
                <StepTextWrapper>
                    <StepTitle>Convert</StepTitle>
                    <StepDescription>Convert PDF to dark mode</StepDescription>
                </StepTextWrapper>
            </Step>
            <Step>
                <div className="icon"/>
                <StepTextWrapper>
                    <StepTitle>Download</StepTitle>
                    <StepDescription>Export PDF anywhere</StepDescription>
                </StepTextWrapper>
            </Step>
            <Button onClick={onButtonClick}>Select</Button>
            <input type="file" ref={inputFile} style={{ display: 'none' }} onChange={onFileChange}/>
        </StepsContainer>
    );
}

export default Steps;
