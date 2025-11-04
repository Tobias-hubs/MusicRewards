# MusicRewards Test App

> ⚠️ **Disclaimer**  
> This project now uses `react-native-track-player@5.0.0-alpha0-nightly359af5a12d712d3b685530aed9b9625865a25d74`  
> because the stable release does not compile with Expo SDK/Android at the moment.  
> This is a known community workaround.  
>  
> The `android/` folder is included so the reviewer can build and run the app directly.  
>  
> 🚧 This project is **not complete** and may contain **small bugs**.


### ✅ Prerequisites
- [Node.js](https://nodejs.org/)
- [Android Studio](https://developer.android.com/studio) with emulator or connected device
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

## 🚀 Get Started

```bash
# 1. Install dependencies
npm install

# 2. Run the app on Android (requires Android Studio)
npx expo run:android

# 3. Clear cache (optional, if you run into issues)
npx expo start -c

# 4. Notes:
# - This project uses Expo SDK 54
# - Requires a development build (Expo Go will not work)
# - Uses a nightly version of react-native-track-player:
#   react-native-track-player@5.0.0-alpha0-nightly359af5a12d712d3b685530aed9b9625865a25d74
# - Android Studio must be installed with an emulator or connected device

