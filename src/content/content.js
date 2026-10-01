/**
 * Main Content Script Entry Point
 * Lightweight orchestrator: initializes observer, runs ad detection, handles SPA navigation.
 */

import '../styles/overlay.css';
import { initObserver } from './youtubeObserver';
import { detectAdState } from './adDetector';
import { adController } from './adController';

console.log('[AdRerouter] Content script initialized on YouTube.');

function checkAdState() {
  try {
    const state = detectAdState();
    adController.handleStateUpdate(state);
  } catch (error) {
    console.error('[AdRerouter] Detection loop error:', error);
  }
}

function start() {
  initObserver(() => {
    checkAdState();
  });
  // Initial check
  checkAdState();
}

// Handle YouTube SPA Navigation
window.addEventListener('yt-navigate-finish', () => {
  console.log('[AdRerouter] SPA navigation detected. Re-evaluating observer.');
  start();
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start);
} else {
  start();
}
