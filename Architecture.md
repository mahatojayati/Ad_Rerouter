# Ad Rerouter - System Architecture

## 1. Architecture Overview
Ad Rerouter is a client-side Chrome extension built using JavaScript, React, Chrome Manifest V3, MutationObserver, Chrome Extension APIs, Vite, and Node.js for development/building.

There is no production backend.

```
CHROME
 -> YouTube Tab -> Content Script -> MutationObserver -> Ad Detector -> State Controller -> Overlay UI / Audio Control -> Restore State
 -> Extension Popup -> React UI -> chrome.storage
```

## 2. Project Layers
### Layer 1 - Detection
* `src/content/adDetector.js`
* `src/content/youtubeObserver.js`

### Layer 2 - State Management
* `src/content/adController.js`

### Layer 3 - Presentation
* `src/components/AdOverlay.jsx`
* `src/components/Countdown.jsx`
* `src/components/Quote.jsx`

### Layer 4 - Browser Integration
* `src/utils/storage.js`

### Layer 5 - Popup
* `src/popup/App.jsx`
* `src/popup/main.jsx`
* `src/popup/popup.css`

## 3. Directory Architecture
```
ad-rerouter/
├── public/
│   ├── manifest.json
│   └── icons/
├── src/
│   ├── content/
│   │   ├── content.js
│   │   ├── adDetector.js
│   │   ├── adController.js
│   │   └── youtubeObserver.js
│   ├── components/
│   │   ├── AdOverlay.jsx
│   │   ├── Countdown.jsx
│   │   └── Quote.jsx
│   ├── popup/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── popup.css
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
