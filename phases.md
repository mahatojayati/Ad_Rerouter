# Ad Rerouter - Implementation Phases

## Phase 0 - Project Initialization
Goal: Create the basic Chrome extension project.
Tasks: npm project setup, React & Vite setup, Manifest V3, directory structure, placeholder icons.

## Phase 1 - Basic YouTube Content Script
Goal: Confirm extension runs correctly on YouTube with SPA navigation.

## Phase 2 - MutationObserver
Goal: Create dynamic DOM observation system with filtering and debouncing.

## Phase 3 - Advertisement Detector
Goal: Implement multi-signal `detectAdState()`.

## Phase 4 - State Controller
Goal: Implement deterministic state machine: `IDLE` -> `COUNTDOWN` -> `AD_ACTIVE` -> `SKIP_AVAILABLE` -> `RESTORING`.

## Phase 5 - Audio Control
Goal: Mute YouTube during advertisement presentation, save & restore audio state.

## Phase 6 - Overlay
Goal: Create black advertisement replacement React overlay under `#ad-rerouter-root`.

## Phase 7 - Countdown
Goal: Add 5-second countdown timer with clean cancellation path.

## Phase 8 - Native Skip Integration
Goal: Automatically trigger YouTube's native Skip Ad control when actionable.

## Phase 9 - Popup
Goal: Create minimal React extension popup UI with state badges and toggles.

## Phase 10 - Storage
Goal: Persist preferences via `chrome.storage.local`.

## Phase 11 - Failure Recovery
Goal: Ensure non-intrusive error handling and safe fallback to normal YouTube playback.

## Phase 12 - Performance Optimization
Goal: Reduce DOM queries, tune debouncing, avoid memory leaks.

## Phase 13 - UI Polish
Goal: Typography, smooth overlay transitions, accessible controls.

## Phase 14 - Testing
Goal: Verify build and functional criteria across video states.

## Phase 15 - Production Build
Goal: Run Vite production build producing loadable Chrome extension in `dist/`.

## Phase 16 - Documentation
Goal: Create comprehensive `README.md` and `TECHNICAL_DOCUMENTATION.md`.
