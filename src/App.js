import Steps from './components/Steps';
import PDFPreview from './components/PDFPreview';
import { Title } from './styles'
import { useState } from 'react';
function App() {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState('');

  function onFileChange(event) {
    setFile(event.target.files[0]);
  }
  return (
    <div className="App">
      <Title>Darco</Title>
      <div className="wrapper">
        <Steps currentStep={step} onFileChange={onFileChange}/>
        <PDFPreview file={file}/>
      </div>
    </div>
  );
}

export default App;
