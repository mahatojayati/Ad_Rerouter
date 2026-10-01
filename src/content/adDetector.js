/**
 * Ad Detector Module
 * Exposes detectAdState() returning { isAd: boolean, isSkippable: boolean, skipButton: HTMLElement | null }
 * Uses multiple independent signals to detect YouTube ads cleanly and reliably.
 */

const AD_CONTAINER_SELECTORS = [
  '.ad-showing',
  '.ad-interrupting',
  '.video-ads',
  '.ytp-ad-player-overlay',
  '.ytp-ad-module',
  '.ytp-ad-text',
  '.ytp-ad-simple-ad-badge'
];

const SKIP_BUTTON_SELECTORS = [
  '.ytp-ad-skip-button',
  '.ytp-ad-skip-button-modern',
  '.ytp-skip-ad-button',
  'button.ytp-ad-skip-button-text',
  '.ytp-ad-skip-button-container button',
  '[id^="skip-button"]'
];

export function detectAdState() {
  let isAd = false;
  let isSkippable = false;
  let skipButton = null;

  try {
    const moviePlayer = document.querySelector('#movie_player') || document.querySelector('.html5-video-player');

    // Signal 1: Movie player class list signals (.ad-showing, .ad-interrupting)
    if (moviePlayer) {
      if (moviePlayer.classList.contains('ad-showing') || moviePlayer.classList.contains('ad-interrupting')) {
        isAd = true;
      }
    }

    // Signal 2: Check for presence of active ad elements inside document or player
    if (!isAd) {
      for (const selector of AD_CONTAINER_SELECTORS) {
        const el = document.querySelector(selector);
        if (el && el.offsetParent !== null && el.children.length > 0) {
          isAd = true;
          break;
        }
      }
    }

    // Signal 3: Check video element attributes or duration/ad overlay markers
    if (!isAd && moviePlayer) {
      const adBadge = moviePlayer.querySelector('.ytp-ad-text, .ytp-ad-preview-text, .ytp-ad-simple-ad-badge');
      if (adBadge && adBadge.offsetParent !== null) {
        isAd = true;
      }
    }

    // If ad detected, search for skip button
    if (isAd) {
      for (const selector of SKIP_BUTTON_SELECTORS) {
        const btn = document.querySelector(selector);
        if (btn && isVisibleAndActionable(btn)) {
          skipButton = btn;
          isSkippable = true;
          break;
        }
      }
    }
  } catch (error) {
    console.error('[AdRerouter] Error in detectAdState:', error);
  }

  return {
    isAd,
    isSkippable,
    skipButton
  };
}

function isVisibleAndActionable(element) {
  if (!element) return false;
  const style = window.getComputedStyle(element);
  if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
    return false;
  }
  const rect = element.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
}
