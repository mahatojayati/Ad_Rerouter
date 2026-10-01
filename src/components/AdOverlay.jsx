import React from 'react';
import Countdown from './Countdown';
import Quote from './Quote';

export default function AdOverlay({ status, countdown, quote, motivationMode }) {
  if (status === 'IDLE' || status === 'RESTORING') {
    return null;
  }

  return (
    <div className="ad-rerouter-overlay" role="region" aria-label="Ad Rerouter Active">
      <Countdown value={countdown} status={status} />
      <Quote text={quote} show={motivationMode} />
      <div className="ad-rerouter-status-indicator">
        AD REROUTED • STAY FOCUSED
      </div>
    </div>
  );
}
