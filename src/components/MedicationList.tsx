import React from 'react';
import { useMedication } from '../context/MedicationContext';

const MedicationList = () => {
  const { medications, removeMedication } = useMedication();

  if (medications.length === 0) {
    return <p className="empty">No medications added yet.</p>;
  }

  return (
    <div className="med-list">
      <h2>Your Medications</h2>
      {medications.map((med) => (
        <div key={med.id} className="med-card">
          <div className="card-header">
            <h3>{med.name}</h3>
            <button className="delete-btn" onClick={() => removeMedication(med.id)}>✕</button>
          </div>
          <p>Dosage: {med.dosage}</p>
          <div className="times">
            {med.times.map((time, idx) => (
              <span key={idx} className="pill">{time}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MedicationList;
