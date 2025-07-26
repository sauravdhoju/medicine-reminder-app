import React, { useEffect } from 'react';
import { useMedication } from '../context/MedicationContext';
import { isTimeMatch } from '../utils/isTimeMatch';

const ReminderChecker = () => {
  const { medications } = useMedication();

  useEffect(() => {
    const interval = setInterval(() => {
      medications.forEach((med) => {
        med.times.forEach((time) => {
          if (isTimeMatch(time)) {
            alert(`Time to take your medication: ${med.name} (${med.dosage})`);
          }
        });
      });
    }, 60000); // check every minute

    return () => clearInterval(interval);
  }, [medications]);

  return null; // This component doesn’t render anything
};

export default ReminderChecker;
