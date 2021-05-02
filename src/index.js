import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import DarcoProvider from './DarcoContext';

ReactDOM.render(
  <React.StrictMode>
    <DarcoProvider>
      <App />
    </DarcoProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
