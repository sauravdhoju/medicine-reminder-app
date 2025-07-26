import React, { useState } from 'react';
import { useMedication } from '../context/MedicationContext';
import type { Medication } from '../types/medication';

interface EditState {
  [key: number]: boolean;
}

const MedicationList = () => {
  const { medications, removeMedication, updateMedication } = useMedication();

  const [editMode, setEditMode] = useState<EditState>({});
  const [editData, setEditData] = useState<Record<number, Medication>>({});

  if (medications.length === 0) {
    return <p className="empty">No medications added yet.</p>;
  }

  const startEdit = (med: Medication) => {
    setEditMode({ ...editMode, [med.id]: true });
    setEditData({ ...editData, [med.id]: { ...med } });
  };

  const cancelEdit = (id: number) => {
    setEditMode({ ...editMode, [id]: false });
  };

  const handleChange = (id: number, field: keyof Medication, value: any) => {
    setEditData({
      ...editData,
      [id]: {
        ...editData[id],
        [field]: value,
      },
    });
  };

  const saveEdit = (id: number) => {
    const medToUpdate = editData[id];
    if (!medToUpdate || medToUpdate.name.trim() === '') {
      alert('Name cannot be empty');
      return;
    }
    updateMedication(medToUpdate);
    setEditMode({ ...editMode, [id]: false });
  };

  const addTime = (id: number, time: string) => {
    if (time && !editData[id].times.includes(time)) {
      setEditData({
        ...editData,
        [id]: {
          ...editData[id],
          times: [...editData[id].times, time],
        },
      });
    }
  };

  const removeTime = (id: number, time: string) => {
    setEditData({
      ...editData,
      [id]: {
        ...editData[id],
        times: editData[id].times.filter((t) => t !== time),
      },
    });
  };

  return (
    <div className="med-list">
      <h2>Your Medications</h2>
      {medications.map((med) =>
        editMode[med.id] ? (
          <div key={med.id} className="med-card">
            <input
              type="text"
              value={editData[med.id]?.name || ''}
              onChange={(e) => handleChange(med.id, 'name', e.target.value)}
              placeholder="Medicine Name"
            />
            <input
              type="text"
              value={editData[med.id]?.dosage || ''}
              onChange={(e) => handleChange(med.id, 'dosage', e.target.value)}
              placeholder="Dosage"
            />

            <div>
              <label>Add Time:</label>
              <input
                type="time"
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTime(med.id, e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
              />
            </div>

            <div className="times">
              {editData[med.id]?.times.map((time) => (
                <span key={time} className="pill">
                  {time}{' '}
                  <button
                    className="remove-time-btn"
                    onClick={() => removeTime(med.id, time)}
                    type="button"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <div className="edit-buttons">
              <button onClick={() => saveEdit(med.id)}>Save</button>
              <button onClick={() => cancelEdit(med.id)}>Cancel</button>
            </div>
          </div>
        ) : (
          <div key={med.id} className="med-card">
            <div className="card-header">
              <h3>{med.name}</h3>
              <div>
                <button onClick={() => startEdit(med)}>Edit</button>{' '}
                <button onClick={() => removeMedication(med.id)}>Delete</button>
              </div>
            </div>
            <p>Dosage: {med.dosage}</p>
            <div className="times">
              {med.times.map((time) => (
                <span key={time} className="pill">
                  {time}
                </span>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default MedicationList;
