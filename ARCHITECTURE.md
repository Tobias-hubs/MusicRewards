# 🧠 Architecture Overview

This document explains the architectural decisions behind the MusicRewards mini-app built for Belong's React Native technical assessment.

---

## 🏗️ Tech Stack

- **Framework**: React Native with Expo SDK 54
- **Navigation**: Expo Router (file-based routing)
- **State Management**: Zustand with persistence via AsyncStorage
- **Audio Playback**: react-native-track-player (nightly build)
- **Styling**: StyleSheet + Glass design system (expo-blur + gradients)

---

## 🧩 Component Architecture

The app follows a modular, reusable component structure:

- `GlassCard` and `GlassButton`: Core UI primitives with blur and gradient effects
- `ChallengeCard`: Displays challenge info with difficulty-based styling
- `PointsCounter`: Animated progress and points logic

All components follow accessibility guidelines and support custom styling via props.

---

## 🧠 State Management

Zustand is used for its simplicity and performance:

- `musicStore`: Handles playback state, current track, and challenge progress
- `userStore`: Tracks total points and completed challenges

Selectors (`useStore(s => s.property)`) are used to optimize re-renders.

State is persisted using AsyncStorage to support app restarts and offline use.

---

## 🔄 Business Logic Hooks

Custom hooks encapsulate async logic and side effects:

- `useMusicPlayer`: Controls playback, seeking, and error handling
- `usePointsCounter`: Calculates points based on playback progress
- `useChallenges`: Loads and completes challenges

Hooks are decoupled from UI and can be reused across screens.

---

## 🎧 Audio Architecture

`react-native-track-player` is used for advanced playback features:

- Nightly build required for Expo compatibility
- Supports background playback, seeking, and interruption handling
- Audio session is initialized in `audioService.ts`

---

## 🧭 Navigation Structure

Expo Router is used with tab and modal layouts:


Modal-heavy navigation mimics Belong’s app structure.

---

## 🧪 Error Handling

- Playback errors are caught and displayed via `useMusicPlayer`
- Network errors are handled in `useChallenges` with retry logic
- Loading states are shown for all async operations

---

## 📈 Scaling Considerations

- Zustand stores can be split by domain
- Hooks are composable and testable
- Audio architecture supports playlists and queueing
- UI components follow design tokens for easy theming

---

## 🧹 Known Limitations

- Minor UI bugs and unfinished edge cases
- No backend integration (static challenge data)
- Audio visualization and confetti animations not yet implemented

---

## 📦 Why These Choices?

- Zustand over Redux: simpler, less boilerplate, better DX
- Expo Router: file-based routing aligns with modular design
- TrackPlayer over expo-av: supports background playback and advanced controls

