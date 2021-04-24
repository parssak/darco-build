import React from 'react'
import styled from 'styled-components';

const LoadingBarWrapper = styled.div`
    width: 100%;
    border-radius: 5rem;
    height: 1rem;
    background-color: blue;
    position: relative;
    transition: all 1s ease;
    overflow: hidden;
`;

const LoadingBarInner = styled.div`
    transition: all 0.5s ease;
    width: ${props => props.completion}%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: linear-gradient(249.32deg, #7328D2 7.45%, #5200FF 100%);
    border-radius: 5rem;

`
export default function LoadingBar({ completion }) {
    return (
        <>
            {completion * 100}
            <LoadingBarWrapper>
                <LoadingBarInner completion={isNaN(completion) ? 5 : completion * 100} />
            </LoadingBarWrapper>
        </>
    )
}
