import React from 'react';
import MedicationForm from './components/MedicationForm';
import MedicationList from './components/MedicationList';

const App = () => {
  return (
    <div className="app">
      <h1>Medicine Reminder App 💊</h1>
      <MedicationForm />
      <MedicationList />
    </div>
  );
};

export default App;
