import PreviewPanel from './components/PreviewPanel';
import SettingsPanel from './components/SettingsPanel';
import StatusPanel from './components/StatusPanel';
import styled from 'styled-components';
import { Title } from './styles';
import React, { useRef } from 'react';
import useResizeObserver from '@react-hook/resize-observer';
// import { useDarco } from './DarcoContext';

const AppContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 0.1fr 1.9fr;
  gap: 1rem;
  grid-template-areas:
    "title preview settings"
    "status preview settings";
  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    grid-template-rows: 0.1fr 1.6fr 1.1fr;
    grid-template-areas:
    "title"
    "preview "
    "status";
  }
  padding: 4vw;
  height: 100vh;
  width: 100vw;
  background: radial-gradient(142.86% 68.13% at 64.57% 133.75%, rgba(175, 82, 222, 0.41) 0%, rgba(42, 26, 135, 0) 100%), radial-gradient(64.33% 47.29% at 78.42% -7.16%, rgba(88, 86, 214, 0.72) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(0deg, #000000, #000000);
`;


const useSize = (target) => {
  const [size, setSize] = React.useState()

  React.useLayoutEffect(() => {
    setSize(target.current.getBoundingClientRect())
  }, [target])

  // Where the magic happens
  useResizeObserver(target, (entry) => setSize(entry.contentRect))
  return size
}

function App() {
  // const { state } = useDarco()
  const target = useRef(null)
  const size = useSize(target)
  return (
    <AppContainer ref={target}>
      <Title>Darco</Title>
      <StatusPanel />
      <PreviewPanel width={size?.width} height={size?.height}/>
      <SettingsPanel />
    </AppContainer>
  );
}

export default App;
