
import MedicationForm from './components/MedicationForm';
import MedicationList from './components/MedicationList';
import ReminderChecker from './components/ReminderChecker';

const App = () => {
  return (
    <div className="app">
      <h1 style={{ textAlign: 'center' }}>Medicine Reminder App</h1>

      <MedicationForm />
      <MedicationList />
      <ReminderChecker />
    </div>
  );
};

export default App;
