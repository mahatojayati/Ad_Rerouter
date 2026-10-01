# Ad Rerouter - AI IDE Rules

This document defines mandatory development rules for AI coding agents.

## 1. General Principle
Build the smallest reliable system that solves the stated problem.
Prefer: Simple / Local / Observable / Testable / Recoverable
Over: Complex / Remote / Over-engineered

## 2. Technology Rules
Use: JavaScript, React, JSX, CSS, Chrome Manifest V3, Node.js/npm for dev, Vite for building.
Do not introduce TypeScript unless explicitly requested.
Do not introduce backend, Express, database, authentication, or cloud services.

## 3. Node.js Rule
Node.js exists only for package management, development tooling, Vite, and build scripts.

## 4. React Rules
React should be used for popup UI and overlay UI.

## 5. MutationObserver Rules
Advertisement detection must use MutationObserver. Filtering & debouncing required.

## 6. Observer Rule
Only one primary YouTube observer should exist.

## 7. DOM Selector Rules
Never rely on a single undocumented YouTube class as the sole source of truth.

## 8. State Rules
Valid states: `IDLE`, `COUNTDOWN`, `AD_ACTIVE`, `SKIP_AVAILABLE`, `RESTORING`.

## 9. Idempotency
Functions (`startAd`, `restoreState`) must be safe against repeated calls.

## 10. Timer Rules
Every timer must be tracked and cleared when no longer needed.

## 11. Cleanup Rules
Every resource must have a cleanup path (`MutationObservers`, timers, listeners, React roots).

## 12. Audio Rules
Never assume user was unmuted. Always save previous state before changing it.

## 13. Overlay Rules
The extension must own only its own DOM using `#ad-rerouter-root`.

## 14. Skip Button Rules
Only click native Skip Ad control when positively identified, visible, actionable, and state unskipped.

## 15. Storage Rules
Use `chrome.storage.local`. Store only `{ enabled: true, motivationMode: true }`.
