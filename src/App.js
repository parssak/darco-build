import Steps from './components/Steps';
import PDFPreview from './components/PDFPreview';
import PDFData from './components/PDFData';
import { useEffect, useState } from 'react';

function App() {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState('');
  const [pdfPages, setPdfPages] = useState(null);
  function onFileChange(event) {
    setFile(event.target.files[0]);
  }

  const nextStep = () => {}
  useEffect(() => {
    if (file !== '')
      setStep(2)
    else
      setStep(1)
  }, [file])

  return (
    <div className="App">
        <Steps currentStep={step} onFileChange={onFileChange}/>
        <PDFPreview file={file} nextStep={nextStep} setPdfPages={setPdfPages}/>
      <PDFData file={file} pages={pdfPages} onFileChange={onFileChange} />
    </div>
  );
}

export default App;
