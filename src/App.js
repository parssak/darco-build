import PDFPreview from './components/PDFPreview';
import PDFData from './components/PDFData';
import LeftPanel from './components/LeftPanel';
import styled from 'styled-components';

const AppContainer = styled.div`
display: flex;
  justify-content: space-between;
  padding: 5vw;
  height: 100vh;
  width: 100vw;
  background: radial-gradient(142.86% 68.13% at 64.57% 133.75%, rgba(175, 82, 222, 0.41) 0%, rgba(42, 26, 135, 0) 100%), radial-gradient(64.33% 47.29% at 78.42% -7.16%, rgba(88, 86, 214, 0.72) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(0deg, #000000, #000000);
`;
function App() {
  return (
    <AppContainer>
        <LeftPanel/>
        <PDFPreview/>
        <PDFData/>
    </AppContainer>
  );
}

export default App;
