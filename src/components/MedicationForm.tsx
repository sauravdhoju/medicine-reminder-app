import React, { useState } from 'react';
import { useMedication } from '../context/MedicationContext';
import type { Medication } from '../types/medication';

const MedicationForm = () => {
  const { addMedication } = useMedication();

  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [time, setTime] = useState('');
  const [times, setTimes] = useState<string[]>([]);

  const handleAddTime = () => {
    if (time && !times.includes(time)) {
      setTimes(prev => [...prev, time]);
      setTime('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newMed: Medication = {
      id: Date.now(),
      name,
      dosage,
      times,
    };

    addMedication(newMed);
    setName('');
    setDosage('');
    setTimes([]);
  };

  return (
    <form onSubmit={handleSubmit} className="med-form">
      <h2>Add Medication</h2>
      <input
        type="text"
        placeholder="Medicine Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Dosage (e.g. 500mg)"
        value={dosage}
        onChange={e => setDosage(e.target.value)}
        required
      />

      <div className="time-input">
        <input
          type="time"
          value={time}
          onChange={e => setTime(e.target.value)}
        />
        <button type="button" onClick={handleAddTime}>+ Add Time</button>
      </div>

      <div className="times-list">
        {times.map((t, idx) => (
          <span key={idx} className="pill">{t}</span>
        ))}
      </div>

      <button type="submit">Save Medication</button>
    </form>
  );
};

export default MedicationForm;
