import './App.css';
import TripsList from './components/TripsList';
import TripDetails from './components/TripDetails';
import { useState } from 'react';

function App() {
  const [selectedTrip, setSelectedTrip] = useState(null); // State to store selected trip

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
      <div style={{ flex: 1, marginRight: '20px' }}>
        <h1>Welcome to Amazing Trips</h1>
        <TripsList onSelectTrip={setSelectedTrip} />
      </div>
      <div style={{ flex: 1 }}>
        <TripDetails trip={selectedTrip} />
      </div>
    </div>
  );
}

export default App;
