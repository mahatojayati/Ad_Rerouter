import React, { useState, useEffect } from 'react';
import { getSettings, setSettings } from '../utils/storage';

export default function App() {
  const [enabled, setEnabled] = useState(true);
  const [motivationMode, setMotivationMode] = useState(true);

  useEffect(() => {
    getSettings().then((s) => {
      setEnabled(s.enabled);
      setMotivationMode(s.motivationMode);
    });
  }, []);

  const toggleEnabled = async () => {
    const updated = !enabled;
    setEnabled(updated);
    await setSettings({ enabled: updated, motivationMode });
  };

  const toggleMotivationMode = async () => {
    const updated = !motivationMode;
    setMotivationMode(updated);
    await setSettings({ enabled, motivationMode: updated });
  };

  return (
    <div className="popup-container">
      <div className="header">AD REROUTER</div>
      <div className="status-badge">
        <span className={`status-dot ${enabled ? 'active' : 'disabled'}`}></span>
        <span>{enabled ? 'ACTIVE' : 'DISABLED'}</span>
      </div>
      <div className="subtext">
        {enabled ? 'Ads are being rerouted.' : 'Extension is paused.'}
      </div>

      <div className="divider" />

      <div className="toggle-row">
        <span className="toggle-label">Extension</span>
        <button
          className={`toggle-btn ${enabled ? 'active' : ''}`}
          onClick={toggleEnabled}
          aria-label="Toggle Extension"
        >
          {enabled ? 'ON' : 'OFF'}
        </button>
      </div>

      <div className="toggle-row">
        <span className="toggle-label">Motivation Mode</span>
        <button
          className={`toggle-btn ${motivationMode ? 'active' : ''}`}
          onClick={toggleMotivationMode}
          aria-label="Toggle Motivation Mode"
        >
          {motivationMode ? 'ON' : 'OFF'}
        </button>
      </div>
    </div>
  );
}
