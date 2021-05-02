import PreviewPanel from './components/PreviewPanel';
import SettingsPanel from './components/SettingsPanel';
import StatusPanel from './components/StatusPanel';
import styled from 'styled-components';
import { Title } from './styles';
import React, { useRef } from 'react';
import useResizeObserver from '@react-hook/resize-observer';

const AppContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 0.1fr 1.9fr;
  gap: 1rem;
  grid-template-areas:
    "title preview settings"
    "status preview settings";
  @media (max-width: 1000px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 0.1fr 1.6fr 1.1fr;
    grid-template-areas:
    "title title"
    "preview settings"
    "status status";
  }
  padding: 4vw;
  height: 100vh;
  width: 100vw;
  /* background-color: white; */
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
  const target = useRef(null)
  const size = useSize(target)

  return (
    <AppContainer ref={target}>
      <svg width="100vw" height="100vh" viewBox="0 0 100vw 100vh" fill="none" xmlns="http://www.w3.org/2000/svg" className="bg">
        <rect width="100vw" height="100vh" fill="url(#paint0_radial)"/>
        <rect width="100vw" height="100vh" fill="url(#paint1_radial)" />
        <defs>
          <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform={`translate(936.302 -59.7211) rotate(15.768) scale(798.116 506.722)`}>
            <stop stop-color="#5856D6" stop-opacity="0.72" />
            <stop offset="1" stop-opacity="0" />
          </radialGradient>
          <radialGradient id="paint1_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform={`translate(1448.12 849.716) rotate(-159.161) scale(850.184 809.54)`}>
            <stop stop-color="#AF52DE" stop-opacity="0.41" />
            <stop offset="1" stop-color="#2A1A87" stop-opacity="0" />
          </radialGradient>
        </defs>
      </svg>
      <Title>Darco</Title>
      <StatusPanel />
      <PreviewPanel width={size?.width} height={size?.height}/>
      <SettingsPanel />
    </AppContainer>
  );
}

export default App;
