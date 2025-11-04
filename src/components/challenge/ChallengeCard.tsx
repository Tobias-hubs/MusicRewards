// ChallengeCard component - Individual challenge display
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { GlassCard, GlassButton } from "../ui/GlassCard";
import { THEME } from "../../constants/theme";
import type { MusicChallenge } from "../../types";
import { LinearGradient } from "expo-linear-gradient";

interface ChallengeCardProps {
  challenge: MusicChallenge;
  onPlay: (challenge: MusicChallenge) => void;
  isCurrentTrack?: boolean;
  isPlaying?: boolean;
  replayingChallengeId?: string;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({
  challenge,
  onPlay,
  isCurrentTrack = false,
  isPlaying = false,
  replayingChallengeId,
}) => {
  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return THEME.colors.secondary;
      case "medium":
        return THEME.colors.accent;
      case "hard":
        return THEME.colors.primary;
      default:
        return THEME.colors.text.secondary;
    }
  };

  const getGradientForDifficulty = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return ["#1e3c72", "#2a5298"];
      case "medium":
        return ["#42275a", "#734b6d"];
      case "hard":
        return ["#141e30", "#243b55"];
      default:
        return THEME.glass.gradientColors.card; // fallback
    }
  };

const getButtonTitle = () => {
  if (isCurrentTrack && isPlaying) return "Playing...";
  if (isCurrentTrack && !isPlaying) return "Resume";
  if (challenge.completed) return "Completed ✓"; 
  return "Play Challenge";
};

  return (
    <GlassCard
      style={StyleSheet.flatten([
        styles.card,
        isCurrentTrack && styles.currentTrackCard,
      ])}
      gradientColors={getGradientForDifficulty(challenge.difficulty)}
    >
      {isCurrentTrack && (
        <View style={styles.nowPlayingBanner}>
          <Text style={styles.nowPlayingText}>
            {isPlaying ? "🎵 Now Playing" : "⏸ Paused"}
          </Text>
        </View>
      )}
      <View style={styles.header}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>{challenge.title}</Text>
          <Text style={styles.artist}>{challenge.artist}</Text>
        </View>
        <View
          style={StyleSheet.flatten([
            styles.difficultyBadge,
            { backgroundColor: getDifficultyColor(challenge.difficulty) },
          ])}
        >
          <Text style={styles.difficultyText}>
            {/* {challenge.difficulty.toUpperCase()} */}
            {challenge.difficulty === 'easy' && '🎧 EASY'}
  {challenge.difficulty === 'medium' && '⚡ MEDIUM'}
  {challenge.difficulty === 'hard' && '🔥 HARD'}
          </Text>
        </View>
      </View>

      <Text style={styles.description} numberOfLines={2}>
        {challenge.description}
      </Text>

      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Duration</Text>
          <Text style={styles.infoValue}>
            {formatDuration(challenge.duration)}
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Points</Text>
          <Text style={[styles.infoValue, { color: THEME.colors.accent }]}>
            {challenge.points}
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Progress</Text>
          <Text style={styles.infoValue}>
            {Math.round(challenge.progress)}%
          </Text>
        </View>
      </View>

      {challenge.progress > 0 && (
        <View style={styles.progressContainer}>
          <View style={styles.progressTrack}>
            <LinearGradient
              colors={["#00e0ff", "#00ff85"]} 
              style={[styles.progressFill, { width: `${challenge.progress}%` }]}
            />
          </View>
        </View>
      )}

      <GlassButton
        title={getButtonTitle()}
        onPress={() => onPlay(challenge)}
        variant={isCurrentTrack ? "primary" : "secondary"}
        style={
         challenge.completed && challenge.id !== replayingChallengeId
          ? [styles.playButton, { opacity: 0.8 }]
          : styles.playButton
        }
      />
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: THEME.spacing.md,
  },
  currentTrackCard: {
    borderWidth: 2,
    borderColor: THEME.colors.primary,
    shadowColor: THEME.colors.primary,
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
   nowPlayingBanner: {
    position: "absolute",
    top: -10,
    left: 10,
    backgroundColor: "rgba(0,255,100,0.2)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  nowPlayingText: {
    color: "#00ff85",
    fontWeight: "600",
    fontSize: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: THEME.spacing.sm,
  },
  titleSection: {
    flex: 1,
    marginRight: THEME.spacing.sm,
  },
  title: {
    fontSize: THEME.fonts.sizes.lg,
    fontWeight: "bold",
    color: THEME.colors.text.primary,
    marginBottom: THEME.spacing.xs,
  },
  artist: {
    fontSize: THEME.fonts.sizes.md,
    color: THEME.colors.text.secondary,
  },
  difficultyBadge: {
    paddingHorizontal: THEME.spacing.sm,
    paddingVertical: THEME.spacing.xs,
    borderRadius: THEME.borderRadius.sm,
  },
  difficultyText: {
    fontSize: THEME.fonts.sizes.xs,
    fontWeight: "bold",
    color: "#111",
  },
  description: {
    fontSize: THEME.fonts.sizes.sm,
    color: THEME.colors.text.tertiary,
    lineHeight: 20,
    marginBottom: THEME.spacing.md,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: THEME.spacing.md,
  },
  infoItem: {
    alignItems: "center",
  },
  infoLabel: {
    fontSize: THEME.fonts.sizes.xs,
    color: THEME.colors.text.tertiary,
    marginBottom: THEME.spacing.xs,
  },
  infoValue: {
    fontSize: THEME.fonts.sizes.sm,
    fontWeight: "600",
    color: THEME.colors.text.primary,
  },
  progressContainer: {
    marginBottom: THEME.spacing.md,
  },
  progressTrack: {
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 2,
  },
  playButton: {
    marginTop: THEME.spacing.sm,
  },
});