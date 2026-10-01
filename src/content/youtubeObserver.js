/**
 * YouTube Observer Module
 * Monitors dynamic DOM changes using MutationObserver with filtering and debouncing.
 */

let activeObserver = null;
let debounceTimer = null;
const DEBOUNCE_MS = 150;

export function initObserver(onMutationDetected) {
  stopObserver();

  const getTargetContainer = () => {
    return document.querySelector('#movie_player') ||
           document.querySelector('.html5-video-player') ||
           document.querySelector('ytd-page-manager') ||
           document.body;
  };

  const container = getTargetContainer();
  if (!container) {
    console.warn('[AdRerouter] No suitable container found for MutationObserver');
    return;
  }

  activeObserver = new MutationObserver((mutations) => {
    if (!hasRelevantMutation(mutations)) return;

    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      onMutationDetected();
    }, DEBOUNCE_MS);
  });

  activeObserver.observe(container, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class', 'style']
  });

  console.log('[AdRerouter] Observer initialized on container:', container.tagName || container.id);
}

export function stopObserver() {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
    debounceTimer = null;
  }
  if (activeObserver) {
    activeObserver.disconnect();
    activeObserver = null;
  }
}

function hasRelevantMutation(mutations) {
  for (const mutation of mutations) {
    if (mutation.type === 'childList' && (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)) {
      return true;
    }
    if (mutation.type === 'attributes') {
      const target = mutation.target;
      if (target && target.className) {
        const className = String(target.className);
        if (className.includes('ad') || className.includes('ytp-') || className.includes('video')) {
          return true;
        }
      }
    }
  }
  return false;
}
