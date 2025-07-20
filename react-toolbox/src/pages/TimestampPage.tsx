import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import './TimestampPage.css';

const TimestampPage: React.FC = () => {
  const [currentTimestamp, setCurrentTimestamp] = useState<string>('');
  const [currentISO, setCurrentISO] = useState<string>('');
  const [timestampInput, setTimestampInput] = useState<string>('');
  const [dateInput, setDateInput] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const getCurrentTimestamp = async () => {
    const now = Date.now();
    const isoDate = new Date(now).toISOString();
    
    setCurrentTimestamp(`Current Timestamp: ${now}`);
    setCurrentISO(`Current ISO8601: ${isoDate}`);

    try {
      await navigator.clipboard.writeText(now.toString());
    } catch (err) {
      alert('Failed to copy timestamp.');
    }
  };

  const convertToHuman = () => {
    if (timestampInput) {
      const date = new Date(parseInt(timestampInput));
      setResult(`Human Readable Date: ${date.toISOString()}`);
    } else {
      setResult('Please enter a valid Unix timestamp.');
    }
  };

  const convertToTimestamp = () => {
    if (dateInput) {
      const timestamp = new Date(dateInput).getTime();
      setResult(`Unix Timestamp: ${timestamp}`);
    } else {
      setResult('Please enter a valid date.');
    }
  };

  return (
    <Layout title="Timestamp Converter">
      <div className="timestamp-container">
        <div className="converter">
          <div className="input-group">
            <button onClick={getCurrentTimestamp} className="timestamp-button">
              Get Current Timestamp and Copy
            </button>
            <p id="currentTimestamp">{currentTimestamp}</p>
            <p id="currentISO">{currentISO}</p>
          </div>
          
          <div className="input-group">
            <label htmlFor="timestamp">Unix Timestamp (ms):</label>
            <input 
              type="number" 
              id="timestamp" 
              value={timestampInput}
              onChange={(e) => setTimestampInput(e.target.value)}
              placeholder="Enter Unix Timestamp (ms)"
            />
            <button onClick={convertToHuman} className="timestamp-button">
              Convert to Date
            </button>
          </div>
          
          <div className="input-group">
            <label htmlFor="date">Human Readable Date:</label>
            <input 
              type="datetime-local" 
              id="date"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
            />
            <button onClick={convertToTimestamp} className="timestamp-button">
              Convert to Timestamp
            </button>
          </div>
        </div>
        
        <div className="result">
          <h2>Result:</h2>
          <p id="result">{result}</p>
        </div>
      </div>
    </Layout>
  );
};

export default TimestampPage;