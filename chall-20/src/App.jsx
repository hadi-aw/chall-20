import { useState, useEffect } from 'react';
import Gallery from './components/Gallery';
import DestinationSelector from './components/DestinationSelector';


const API = '/api/react-tours-project';

export default function App() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState('All');

  // Fetch on mount
  useEffect(() => {
    setLoading(true);
    fetch(API)
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        setTours(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Remove one
  const handleNotInterested = id =>
    setTours(curr => curr.filter(t => t.id !== id));

  // Reload all
  const handleRefresh = () => {
    setSelected('All');
    setError(null);
    setLoading(true);
    fetch(API)
      .then(r => r.json())
      .then(data => {
        setTours(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <div className="App" style={{ padding: '1rem' }}>
      <h1>Tour Explorer</h1>
      <DestinationSelector
        tours={tours}
        selected={selected}
        onChange={setSelected}
      />
      <Gallery
        tours={tours}
        loading={loading}
        error={error}
        selected={selected}
        onNotInterested={handleNotInterested}
        onRefresh={handleRefresh}
      />
    </div>
  );
}
