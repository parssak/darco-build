import React, { useState } from 'react';
import styled from 'styled-components';
import { usePdf, Theme } from '../DarcoContext';
import { tertiary } from '../styles/constants';
import { ReactComponent as GreyPage } from '../svgs/greypage.svg';

const PagePreview = styled.div`
    filter: invert(1);
    `
const ThemeOptionContainer = styled.div`
      ${props => props.selected && `background-color: ${tertiary};`};
      flex-grow: 0.5;
      border-radius: 8.91px;
      width: 50%;
      & > * {
          height: 100%;
          padding: 1rem;
      }
    `;
const ThemeOption = ({ theme, selected, handleSelect }) => {
    return (
        <ThemeOptionContainer selected={selected} onClick={handleSelect}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <PagePreview>
                    <GreyPage />
                </PagePreview>
                <p style={{ alignSelf: 'center', marginTop: '0.4rem', textTransform: 'capitalize' }}>{theme}</p>
            </div>
        </ThemeOptionContainer>
    )
}
const ThemePickerContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: 100%;
    & > * {
        transition: all 0.3s ease;
    }
`;

const ThemePicker = () => {
    const [selected, setSelected] = useState(0);
    const { state, dispatch } = usePdf();

    return (
        <ThemePickerContainer>
            {
                Object.values(Theme).map(e => <ThemeOption theme={e} selected={e === selected} handleSelect={() => setSelected(e)} />)
            }
        </ThemePickerContainer>
    );
}

export default ThemePicker;
