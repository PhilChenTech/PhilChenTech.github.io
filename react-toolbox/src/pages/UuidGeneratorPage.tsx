import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Layout from '../components/Layout/Layout';
import './UuidGeneratorPage.css';

const UuidGeneratorPage: React.FC = () => {
  const [uuid, setUuid] = useState<string>('');

  const generateAndCopyUuid = async () => {
    const newUuid = uuidv4();
    setUuid(newUuid);
    
    try {
      await navigator.clipboard.writeText(newUuid);
    } catch (err) {
      console.error('Failed to copy UUID:', err);
    }
  };

  return (
    <Layout title="UUID Generator">
      <div className="uuid-generator-container">
        <button 
          id="generate-and-copy" 
          onClick={generateAndCopyUuid}
          className="generate-button"
        >
          Generate and Copy UUID
        </button>
        <p id="uuid" className="uuid-display">{uuid}</p>
      </div>
    </Layout>
  );
};

export default UuidGeneratorPage;