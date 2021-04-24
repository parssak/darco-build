import PreviewPanel from './components/PreviewPanel';
import SettingsPanel from './components/SettingsPanel';
import StatusPanel from './components/StatusPanel';
import styled from 'styled-components';
import { Title } from './styles';
// import { useDarco } from './DarcoContext';

const AppContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 0.1fr 1.9fr;
  gap: 1rem;
  grid-template-areas:
    "title preview settings"
    "status preview settings";
  @media (max-width: 900px) {
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
function App() {
  // const { state } = useDarco()
  return (
    <AppContainer>
      <Title>Darco</Title>
      <StatusPanel />
      <PreviewPanel />
      <SettingsPanel />
    </AppContainer>
  );
}

export default App;
