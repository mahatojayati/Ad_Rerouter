const DEFAULT_SETTINGS = {
  enabled: true,
  motivationMode: true
};

export async function getSettings() {
  return new Promise((resolve) => {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get(DEFAULT_SETTINGS, (result) => {
        resolve(result || DEFAULT_SETTINGS);
      });
    } else {
      resolve(DEFAULT_SETTINGS);
    }
  });
}

export async function setSettings(newSettings) {
  return new Promise((resolve) => {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.set(newSettings, () => {
        resolve(newSettings);
      });
    } else {
      resolve(newSettings);
    }
  });
}

export function onSettingsChanged(callback) {
  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.onChanged) {
    const listener = (changes, areaName) => {
      if (areaName === 'local') {
        const updated = {};
        for (const key in changes) {
          updated[key] = changes[key].newValue;
        }
        callback(updated);
      }
    };
    chrome.storage.onChanged.addListener(listener);
    return () => chrome.storage.onChanged.removeListener(listener);
  }
  return () => {};
}
