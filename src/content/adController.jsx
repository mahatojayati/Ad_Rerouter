/**
 * Ad Controller Module
 * Owns the extension state machine and executes actions (Audio control, React overlay, Skip ad).
 * Canonical states: IDLE | COUNTDOWN | AD_ACTIVE | SKIP_AVAILABLE | RESTORING
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import AdOverlay from '../components/AdOverlay';
import { getRandomQuote } from '../quotes/motivationalQuotes';
import { getSettings, onSettingsChanged } from '../utils/storage';

class AdController {
  constructor() {
    this.state = {
      status: 'IDLE',
      countdown: 5,
      adDetectedAt: null,
      previousMutedState: null,
      skipAttempted: false
    };

    this.settings = {
      enabled: true,
      motivationMode: true
    };

    this.countdownTimer = null;
    this.reactRoot = null;
    this.containerEl = null;
    this.currentQuote = '';

    this.initSettings();
  }

  async initSettings() {
    this.settings = await getSettings();
    onSettingsChanged((newSettings) => {
      this.settings = { ...this.settings, ...newSettings };
      if (!this.settings.enabled && this.state.status !== 'IDLE') {
        this.restoreState();
      }
    });
  }

  handleStateUpdate(adState) {
    if (!this.settings.enabled) {
      if (this.state.status !== 'IDLE') {
        this.restoreState();
      }
      return;
    }

    const { isAd, isSkippable, skipButton } = adState;

    if (isAd) {
      if (this.state.status === 'IDLE') {
        this.startAd();
      } else if (this.state.status === 'COUNTDOWN') {
        // Countdown running
      } else if (this.state.status === 'AD_ACTIVE' || this.state.status === 'SKIP_AVAILABLE') {
        if (isSkippable && skipButton && !this.state.skipAttempted) {
          this.attemptSkip(skipButton);
        }
      }
    } else {
      if (this.state.status !== 'IDLE' && this.state.status !== 'RESTORING') {
        this.finishAd();
      }
    }
  }

  startAd() {
    if (this.state.status !== 'IDLE') return; // Idempotent check

    console.log('[AdRerouter] Advertisement detected. Starting rerouting process.');
    this.currentQuote = getRandomQuote();
    this.state.skipAttempted = false;
    this.state.adDetectedAt = Date.now();

    this.startCountdown();
  }

  startCountdown() {
    this.state.status = 'COUNTDOWN';
    this.state.countdown = 5;
    this.renderOverlay();

    if (this.countdownTimer) clearInterval(this.countdownTimer);

    this.countdownTimer = setInterval(() => {
      this.state.countdown -= 1;
      if (this.state.countdown <= 0) {
        clearInterval(this.countdownTimer);
        this.countdownTimer = null;
        this.activateAdMode();
      } else {
        this.renderOverlay();
      }
    }, 1000);
  }

  activateAdMode() {
    this.state.status = 'AD_ACTIVE';
    this.muteAudio();
    this.renderOverlay();
  }

  attemptSkip(skipButton) {
    if (this.state.skipAttempted || !skipButton) return;
    this.state.skipAttempted = true;
    this.state.status = 'SKIP_AVAILABLE';
    console.log('[AdRerouter] Triggering native Skip Ad button.');

    try {
      skipButton.click();
    } catch (e) {
      console.error('[AdRerouter] Error clicking skip button:', e);
    }
  }

  finishAd() {
    console.log('[AdRerouter] Advertisement ended.');
    this.restoreState();
  }

  restoreState() {
    this.state.status = 'RESTORING';

    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
      this.countdownTimer = null;
    }

    this.restoreAudio();
    this.unmountOverlay();

    this.state.status = 'IDLE';
    this.state.skipAttempted = false;
    this.state.adDetectedAt = null;
  }

  muteAudio() {
    const video = document.querySelector('video');
    if (video) {
      if (this.state.previousMutedState === null) {
        this.state.previousMutedState = video.muted;
      }
      video.muted = true;
      console.log('[AdRerouter] Tab audio muted (previous state:', this.state.previousMutedState, ')');
    }
  }

  restoreAudio() {
    const video = document.querySelector('video');
    if (video && this.state.previousMutedState !== null) {
      video.muted = this.state.previousMutedState;
      console.log('[AdRerouter] Tab audio state restored to:', this.state.previousMutedState);
      this.state.previousMutedState = null;
    }
  }

  renderOverlay() {
    let rootDiv = document.getElementById('ad-rerouter-root');
    const parentContainer = document.querySelector('#movie_player') || document.body;

    if (!rootDiv) {
      rootDiv = document.createElement('div');
      rootDiv.id = 'ad-rerouter-root';
      parentContainer.appendChild(rootDiv);
    }

    if (!this.reactRoot) {
      this.reactRoot = createRoot(rootDiv);
    }

    this.reactRoot.render(
      <AdOverlay
        status={this.state.status}
        countdown={this.state.countdown}
        quote={this.currentQuote}
        motivationMode={this.settings.motivationMode}
      />
    );
  }

  unmountOverlay() {
    if (this.reactRoot) {
      this.reactRoot.unmount();
      this.reactRoot = null;
    }
    const rootDiv = document.getElementById('ad-rerouter-root');
    if (rootDiv && rootDiv.parentNode) {
      rootDiv.parentNode.removeChild(rootDiv);
    }
  }
}

export const adController = new AdController();
