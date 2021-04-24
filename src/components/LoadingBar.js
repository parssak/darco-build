import React from 'react'
import styled from 'styled-components';
import { gradient } from '../styles/constants';
const LoadingBarWrapper = styled.div`
    width: 100%;
    border-radius: 5rem;
    height: 1rem;
    background-color: whitesmoke;
    position: relative;
    transition: all 1s ease;
    overflow: hidden;
`;

const LoadingBarInner = styled.div`
    transition: all 0.5s ease;
    /* width: ${props => props.completion}%; */
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: ${gradient};
    border-radius: 5rem;

`
export default function LoadingBar({ completion }) {
    return (
        <>
            <p><strong>{Math.ceil(completion * 100)}%</strong></p>
            <br/>
            <LoadingBarWrapper>
                <LoadingBarInner completion={isNaN(completion) ? 5 : Math.ceil(completion * 100)} />
            </LoadingBarWrapper>
        </>
    )
}
