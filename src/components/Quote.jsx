import React from 'react';

export default function Quote({ text, show }) {
  if (!show || !text) return null;
  return (
    <div className="ad-rerouter-quote">
      "{text}"
    </div>
  );
}
