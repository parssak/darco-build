import React from 'react'
import styled from 'styled-components';

const ModalContainer = styled.div`
    width: 13rem;
    height: 13rem;
    background-color: white;
    color: black;
    z-index: 99;
    position: absolute;
    top: 30%;  /* position the top  edge of the element at the middle of the parent */
    left: 50%; /* position the left edge of the element at the middle of the parent */
    border-radius: 1rem;
    transform: translate(-50%, -30%);
`;
export default function LoadingModal({completion}) {
    return (
        <ModalContainer>
                {completion * 100}          
        </ModalContainer>
    )
}
