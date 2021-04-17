import React, { useRef } from 'react';
import styled from 'styled-components';

import { Button } from '../styles';
import { ReactComponent as Download } from '../svgs/download.svg';
import { ReactComponent as DarkMode } from '../svgs/darkmode.svg';
import { ReactComponent as Share } from '../svgs/share.svg';
import { primary, success, loading } from '../styles/constants';
import { ReducerTypes, useDarco } from '../DarcoContext';

const buttonTexts = ["Select", "Loading", "Convert", "Converting", "Converted", "Download", "Download"]

const Steps = () => {
    const { state, dispatch } = useDarco()
    const inputFile = useRef(null)

    const onButtonClick = () => {
        console.log("onn button clikc")
        switch (state.step) {
            case ReducerTypes.Load:
                inputFile.current.click()
                break
            case ReducerTypes.Info:
                dispatch({ type: ReducerTypes.Convert });
                break;
            case ReducerTypes.Convert:
                dispatch({ type: ReducerTypes.Converting });
                break;
            case ReducerTypes.ImagesConverted:
                dispatch({ type: ReducerTypes.Download });
                break;
            case ReducerTypes.Download:
                dispatch({ type: ReducerTypes.PressedDownload });
                break;
            default:
                break;
        }

    }

    const onFileChange = e => dispatch({ type: ReducerTypes.Load, data: e.target.files[0] })

    return (
        <>
            <Step stepDiff={1 - state.step}>
                <Download fill={1 - state.step < 0 ? success : primary} />
                <StepTextWrapper>
                    <StepTitle>Select</StepTitle>
                    <StepDescription>Choose from Files</StepDescription>
                </StepTextWrapper>
            </Step>
            <Step stepDiff={2 - state.step} loading={state.step === 3}>
                <DarkMode fill={state.step === 3 ? loading : 2 - state.step < 0 ? success : primary} />
                <StepTextWrapper>
                    <StepTitle>Convert</StepTitle>
                    <StepDescription>Convert PDF to dark mode</StepDescription>
                </StepTextWrapper>
            </Step>
            <Step stepDiff={3 - state.step} >
                <Share fill={3 - state.step < 0 ? success : primary} />
                <StepTextWrapper>
                    <StepTitle>Download</StepTitle>
                    <StepDescription>Export PDF anywhere</StepDescription>
                </StepTextWrapper>
            </Step>
            <Button onClick={onButtonClick}>{state.step}</Button>
            <input type="file" accept="application/pdf" ref={inputFile} style={{ display: 'none' }} onChange={onFileChange} />
        </>
    );
}

export default Steps;

// Styling

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
    ${props => props.loading ? `color: ${loading}` : props.stepDiff < 0 && `color: ${success}`}
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