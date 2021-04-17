import React, { useRef } from 'react';
import styled from 'styled-components';

import { Button, Title } from '../styles';
import { ReactComponent as Download } from '../svgs/download.svg';
import { ReactComponent as DarkMode } from '../svgs/darkmode.svg';
import { ReactComponent as Share } from '../svgs/share.svg';
import { primary, success } from '../styles/constants';

const getButtonText = step => {
    switch (step) {
        case 1:
            return "Select"
        case 2:
            return "Convert"
        case 3:
            return "Download"
        default:
            return "Select"
    }
}
const StepsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0;
    position: relative;
    max-height: 100%;
    background-color: 'red';
    margin-top: auto;
    margin-bottom: 2rem;
    flex-basis: 1;
    & > * {
        transition: all 0.5s ease;
    }
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
    ${props => props.stepDiff > 0 && `opacity: 0.${100 - (props.stepDiff * 30)}`}
    ${props => props.stepDiff < 0 && `color: ${success}`}
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
        switch (currentStep) {
            case 1:
                inputFile.current.click();
                break;
            default:
                break;
        }
    };

    return (
        <div className="left-bar">
            <Title>Darco</Title>
            <StepsContainer>
                <Step stepDiff={1 - currentStep}>
                    <Download fill={1 - currentStep < 0 ? success : primary}/>
                    <StepTextWrapper>
                        <StepTitle>Select</StepTitle>
                        <StepDescription>Choose from Files</StepDescription>
                    </StepTextWrapper>
                </Step>
                <Step stepDiff={2 - currentStep}>
                    <DarkMode fill={2 - currentStep < 0 ? success : primary}/>
                    <StepTextWrapper>
                        <StepTitle>Convert</StepTitle>
                        <StepDescription>Convert PDF to dark mode</StepDescription>
                    </StepTextWrapper>
                </Step>
                <Step stepDiff={3 - currentStep}>
                    <Share fill={3 - currentStep < 0 ? success : primary}/>
                    <StepTextWrapper>
                        <StepTitle>Download</StepTitle>
                        <StepDescription>Export PDF anywhere</StepDescription>
                    </StepTextWrapper>
                </Step>
                <Button onClick={onButtonClick}>{getButtonText(currentStep)}</Button>
                <input type="file" accept="application/pdf" ref={inputFile} style={{ display: 'none' }} onChange={onFileChange} />
            </StepsContainer>
        </div>
    );
}

export default Steps;
