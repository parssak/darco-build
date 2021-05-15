import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import DarcoProvider from './DarcoContext';

ReactDOM.render(
    <DarcoProvider>
      <App />
    </DarcoProvider>,
  document.getElementById('root')
);
