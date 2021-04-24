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
     -webkit-transition: width 1.5s ease;
        -o-transition: width 1.5 ease;
    width: ${props => props.completion}%;
    /* width: 100%; */
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: linear-gradient(89.93deg, #5200FF -13.49%, #7328D2 55.98%);
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
