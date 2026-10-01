<<<<<<< HEAD
# Ad_rerouter
=======
# Ad Rerouter

**Ad Rerouter** is a lightweight Chrome extension designed to reduce the visual and audio disruption caused by YouTube advertisements.

Instead of traditional ad blocking, Ad Rerouter temporarily takes control of the visual presentation layer during an ad:
- Mutes the YouTube tab during ad playback.
- Displays a pitch-black fullscreen overlay with a 5-second countdown and a short motivational quote.
- Allows the ad to run underneath and automatically triggers YouTube's native "Skip Ad" button when it becomes available.
- Restores previous audio state and removes the overlay when the ad finishes.

---

## Features
- **Reliable Multi-Signal Ad Detection**: Uses `MutationObserver` with debouncing and multiple fallback signals to detect YouTube ads without relying on a single CSS selector.
- **Audio Preservation**: Captures the user's prior mute state before ad playback and restores it cleanly afterwards.
- **Motivational Overlay**: Clean, minimal pitch-black screen (`#000000`) displaying study/motivational quotes.
- **Native Skip Integration**: Clicks native Skip Ad controls cleanly without duplicating clicks.
- **Minimal React Popup**: Simple status dashboard and toggle controls (`Enable/Disable`, `Motivation Mode`).
- **Privacy & Local-First**: Stores preferences in `chrome.storage.local`. Requires no accounts, backend, tracking, or network requests.

---

## Extension Structure
```
ad-rerouter/
├── public/
│   ├── manifest.json
│   └── icons/
├── src/
│   ├── content/
│   │   ├── content.js          # Entry point
│   │   ├── adDetector.js       # Multi-signal ad detector
│   │   ├── adController.js     # State machine & audio/overlay control
│   │   └── youtubeObserver.js  # Debounced MutationObserver
│   ├── components/
│   │   ├── AdOverlay.jsx       # Overlay component
│   │   ├── Countdown.jsx       # 5-second countdown component
│   │   └── Quote.jsx           # Motivational quote component
│   ├── popup/
│   │   ├── App.jsx             # Popup UI
│   │   ├── main.jsx            # Popup entry
│   │   └── popup.css           # Popup styling
│   ├── quotes/
│   │   └── motivationalQuotes.js
│   ├── utils/
│   │   └── storage.js
│   └── styles/
│       └── overlay.css
├── package.json
├── vite.config.js
└── README.md
```

---

## Installation & Development

### Prerequisites
- **Node.js**: v16+
- **npm**: v8+

### Setup & Build
1. Install dependencies:
   ```bash
   npm install
   ```
2. Build the extension:
   ```bash
   npm run build
   ```
3. Load in Google Chrome:
   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable **Developer mode** in the top right corner.
   - Click **Load unpacked** and select the `dist/` folder created by `npm run build`.

---

## Privacy
Ad Rerouter operates strictly local to your browser:
- No tracking or analytics.
- No user data collected or stored externally.
- No remote network requests required.
>>>>>>> ac9522c (Initial commit: Ad Rerouter Chrome Extension with React, Vite, and MV3)
