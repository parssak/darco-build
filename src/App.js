import Steps from './components/Steps';
import PDFPreview from './components/PDFPreview';
import PDFData from './components/PDFData';
import { Title } from './styles'
import { useState } from 'react';

function App() {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState('');

  function onFileChange(event) {
    setFile(event.target.files[0]);
  }

  const nextStep = () => setStep(step => step + 1)

  return (
    <div className="App">
      <Title>Darco</Title>
      <div className="wrapper">
        <Steps currentStep={step} onFileChange={onFileChange}/>
        <PDFPreview file={file} nextStep={nextStep}/>
        <PDFData file={file} />
      </div>
    </div>
  );
}

export default App;
