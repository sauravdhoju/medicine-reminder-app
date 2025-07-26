import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Medication } from '../types/medication';

interface MedicationContextType {
  medications: Medication[];
  addMedication: (med: Medication) => void;
  updateMedication: (med: Medication) => void;
  deleteMedication: (id: number) => void;
}

const MedicationContext = createContext<MedicationContextType | undefined>(undefined);

export const MedicationProvider = ({ children }: { children: ReactNode }) => {
  const [medications, setMedications] = useState<Medication[]>(() => {
    const stored = localStorage.getItem('medications');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('medications', JSON.stringify(medications));
  }, [medications]);

  const addMedication = (med: Medication) => {
    setMedications(prev => [...prev, med]);
  };

  const updateMedication = (med: Medication) => {
    setMedications(prev =>
      prev.map(m => (m.id === med.id ? med : m))
    );
  };

  const deleteMedication = (id: number) => {
    setMedications(prev => prev.filter(m => m.id !== id));
  };

  return (
    <MedicationContext.Provider value={{ medications, addMedication, updateMedication, deleteMedication }}>
      {children}
    </MedicationContext.Provider>
  );
};

export const useMedication = (): MedicationContextType => {
  const context = useContext(MedicationContext);
  if (!context) throw new Error('useMedication must be used within a MedicationProvider');
  return context;
};
