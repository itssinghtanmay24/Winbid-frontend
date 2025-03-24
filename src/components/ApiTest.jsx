import React, { useState, useEffect } from 'react';
import api from '../services/api';

function ApiTest() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get('/hello')
      .then(response => {
        setMessage(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setMessage('Error connecting to API');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>API Connection Test</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
}

export default ApiTest;