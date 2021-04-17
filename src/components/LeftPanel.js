import React from 'react';
import { SidePanel, Title } from '../styles';
import Steps from './Steps';

const LeftPanel = () => {
    return (
        <SidePanel>
            <Title>Darco</Title>
            <Steps/>
        </SidePanel>
    );
}

export default LeftPanel;
