import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { MedicationProvider } from './context/MedicationContext';
import './styles/App.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MedicationProvider>
      <App />
    </MedicationProvider>
  </React.StrictMode>
);
