import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Medication } from '../types/medication';

interface MedicationContextType {
    medications: Medication[];
    addMedication: (medication: Medication) => void;
    updateMedication: (medication: Medication) => void;
    removeMedication: (id: number) => void;
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

    const addMedication = (medication: Medication) => {
        setMedications(prev => [...prev, medication]);
    };

    const updateMedication = (medication: Medication) => {
        setMedications(prev =>
            prev.map(m => (m.id === medication.id ? medication : m))
        );
    };

    const removeMedication = (id: number) => {
        setMedications(prev => prev.filter(m => m.id !== id));
    };

    return (
        <MedicationContext.Provider
            value={{ medications, addMedication, updateMedication, removeMedication }}
        >
            {children}
        </MedicationContext.Provider>
    );
};

export const useMedication = (): MedicationContextType => {
    const context = useContext(MedicationContext);
    if (!context) {
        throw new Error('useMedication must be used within a MedicationProvider');
    }
    return context;
};
