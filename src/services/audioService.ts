// Audio service - TrackPlayer setup and configuration
import TrackPlayer, {
  Capability,
  AppKilledPlaybackBehavior,
  Event,
  RepeatMode,
} from 'react-native-track-player';

// TrackPlayer service setup - call this in your App.tsx or _layout.tsx
export const setupTrackPlayer = async (): Promise<void> => {
  try {
    // Setup the player
    await TrackPlayer.setupPlayer({
      maxCacheSize: 1024 * 10, // 10MB
    });

    // Configure capabilities
    await TrackPlayer.updateOptions({
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.SeekTo,
      ],

      // Android-specific behavior
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },

      // Notification controls (replaces compactCapabilities)
      notificationCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
      ],
    });

    await TrackPlayer.setRepeatMode(RepeatMode.Queue);

    console.log(' TrackPlayer setup complete');
  } catch (error) {
    console.error(' TrackPlayer setup error:', error);
    throw error;
  }
};

// Reset player state
export const resetPlayer = async (): Promise<void> => {
  try {
    await TrackPlayer.reset();
  } catch (error) {
    console.error('Reset player error:', error);
  }
};

// Add track(s) to player
export const addTrack = async (track: {
  id: string;
  url: string;
  title: string;
  artist: string;
  duration?: number;
}): Promise<void> => {
  try {
    await TrackPlayer.add([
      {
        id: track.id,
        url: track.url,
        title: track.title,
        artist: track.artist,
        duration: track.duration,
      },
    ]);
  } catch (error) {
    console.error('Add track error:', error);
    throw error;
  }
};

// Play current track
export const playTrack = async (): Promise<void> => {
  try {
    await TrackPlayer.play();
  } catch (error) {
    console.error('Play track error:', error);
  }
};

// Pause current track
export const pauseTrack = async (): Promise<void> => {
  try {
    await TrackPlayer.pause();
  } catch (error) {
    console.error('Pause track error:', error);
  }
};

// Seek to position
export const seekToPosition = async (seconds: number): Promise<void> => {
  try {
    await TrackPlayer.seekTo(seconds);
  } catch (error) {
    console.error('Seek error:', error);
  }
};

// Get current playback progress
export const getCurrentProgress = async (): Promise<number> => {
  try {
    const { position } = await TrackPlayer.getProgress();
    return position;
  } catch (error) {
    console.error('Get progress error:', error);
    return 0;
  }
};

// Get duration of current track
export const getCurrentTrackDuration = async (): Promise<number> => {
  try {
    const track = await TrackPlayer.getActiveTrack();
    return track?.duration ?? 0;
  } catch (error) {
    console.error('Get track duration error:', error);
    return 0;
  }
};

// Handle playback errors
export const handlePlaybackError = (error: any) => {
  console.error('Playback error:', error);
  return {
    message: error?.message || 'Unknown playback error',
    code: error?.code || 'UNKNOWN_ERROR',
  };
};

// Cleanup function - call when app is unmounting
export const cleanupTrackPlayer = async (): Promise<void> => {
  try {
    await TrackPlayer.reset();
  } catch (error) {
    console.error('Cleanup error:', error);
  }
};
