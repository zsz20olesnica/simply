import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AudioProvider from './Contexts/AudioContext';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AudioProvider>
      <Router>
        <App />
      </Router>
    </AudioProvider>
  </React.StrictMode>
);

reportWebVitals();
