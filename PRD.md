# Ad Rerouter - Product Requirements Document

## 1. Product Overview
Ad Rerouter is a lightweight Chrome extension designed to reduce the visual and audio disruption caused by YouTube advertisements.

When a YouTube advertisement is detected, Ad Rerouter temporarily takes control of the visible presentation layer:
1. Detect the advertisement.
2. Display a 5-second countdown.
3. Mute the YouTube tab.
4. Display a pitch-black fullscreen overlay.
5. Display a short study/motivational quote.
6. Allow the advertisement to continue underneath the overlay.
7. Automatically activate YouTube's native "Skip Ad" control when it becomes available.
8. Detect when the advertisement has ended.
9. Remove the overlay.
10. Restore the tab's previous audio state.
11. Return the user to normal YouTube playback.

The extension must remain silent, lightweight, privacy-preserving, and require no account.

## 2. Product Goals
### Primary Goals
* Detect YouTube advertisements reliably.
* Avoid relying on fixed timers or a single DOM selector.
* Use `MutationObserver` to react to YouTube DOM changes.
* Automatically detect the availability of the native Skip Ad control.
* Temporarily mute the YouTube tab during advertisements.
* Display a black overlay above the advertisement.
* Display a 5-second countdown before the ad presentation is rerouted.
* Display motivational/study-oriented quotes.
* Restore the user's previous state when the advertisement ends.
* Provide a minimal React-based popup for extension status and settings.
* Require no authentication.
* Store no personally identifiable information.
* Require no backend in the production extension.

## 3. Non-Goals
The project must NOT attempt to:
* Build a traditional advertising network.
* Collect user browsing history.
* Track users.
* Store YouTube watch history.
* Create user accounts.
* Build a remote database.
* Proxy YouTube traffic.
* Download advertisements.
* Modify or redistribute advertisement media.
* Circumvent YouTube authentication.
* Intercept network traffic.
* Modify YouTube's server-side responses.
* Implement a custom video player.
* Maintain a permanent overlay on YouTube.

The extension operates at the browser UI/content-script level.

## 4. Target Platform
Initial platform:
* Google Chrome
* Chromium-based browsers where Manifest V3 is supported

## 5. Technology Stack
* **Runtime**: JavaScript, Chrome Extension Manifest V3
* **UI**: React, JSX, CSS
* **Development**: Node.js, npm, Vite

## 6. User Experience
* **Normal state**: YouTube -> User watches video -> No extension UI
* **Advertisement state**: Advertisement detected -> 5-second countdown -> Tab muted -> Black overlay -> Motivational quote -> Advertisement continues underneath -> Skip available? -> Skip native button or wait -> Advertisement ends -> Remove overlay -> Restore audio -> Normal playback

## 7. Functional Requirements
### FR-01 - Advertisement Detection
* The content script must detect when YouTube enters an advertisement state.
* Detection must not depend on one permanent CSS selector.
* The detector should use multiple signals where possible (`src/content/adDetector.js`).

## 8. MutationObserver Requirement
* YouTube dynamically modifies its DOM. Use `MutationObserver` rather than `setInterval` polling.
* Monitor smallest practical DOM region (`#movie_player` / `.html5-video-player`).

## 9. Advertisement State Machine
Canonical states: `IDLE`, `COUNTDOWN`, `AD_ACTIVE`, `SKIP_AVAILABLE`, `RESTORING`.

## 10. Countdown
* 5 -> 4 -> 3 -> 2 -> 1, non-blocking visual state.

## 11. Audio Behaviour
* Save previous audio state before muting. Restore after ad ends. Never assume tab was originally unmuted.

## 12. Overlay
* Pitch-black overlay covering YouTube player (`#ad-rerouter-root`).

## 13. Motivational Quotes
* Stored locally in `src/quotes/motivationalQuotes.js`. No remote API.

## 14. Skip Ad Behaviour
* Click YouTube's native Skip Ad button when positively identified, visible, and actionable.

## 15. React Popup
* Minimal status dashboard (`ACTIVE` / `DISABLED`) with settings toggles.

## 16. Storage
* `chrome.storage.local` with `{ enabled: true, motivationMode: true }`.

## 17. Privacy
* No data collection, no analytics, no external network requests.
