import React from 'react';

export default function Countdown({ value, status }) {
  if (status === 'COUNTDOWN' && value > 0) {
    return (
      <div className="ad-rerouter-countdown">
        {value}
      </div>
    );
  }
  return null;
}
