// Profile screen - User progress and stats
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { GlassCard } from "../../components/ui/GlassCard";
import { useMusicStore, selectChallenges } from "../../stores/musicStore";
import {
  useUserStore,
  selectTotalPoints,
  selectCompletedChallenges,
} from "../../stores/userStore";
import { THEME } from "../../constants/theme";
import { LinearGradient } from "expo-linear-gradient";

export default function ProfileScreen() {
  const challenges = useMusicStore(selectChallenges);
  const totalPoints = useUserStore(selectTotalPoints);
  const completedChallenges = useUserStore(selectCompletedChallenges);

  const totalChallenges = challenges.length;
  const completionRate =
    totalChallenges > 0
      ? (completedChallenges.length / totalChallenges) * 100
      : 0;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Your Progress</Text>

      {/* Stats Overview */}
      <GlassCard
        style={styles.statsCard}
        gradientColors={["#1e3c72", "#2a5298"]}
      >
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{totalPoints}</Text>
            <Text style={styles.statLabel}>Total Points</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{completedChallenges.length}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{Math.round(completionRate)}%</Text>
            <Text style={styles.statLabel}>Success Rate</Text>
          </View>
        </View>
      </GlassCard>

      {/* Challenge Progress */}
      <GlassCard
        style={styles.progressCard}
        gradientColors={["#42275a", "#734b6d"]}
      >
        <Text style={styles.sectionTitle}>Challenge Progress</Text>
        {challenges.map((challenge) => {
          const isCompleted = completedChallenges.includes(challenge.id);
          return (
            <View key={challenge.id} style={styles.challengeItem}>
              <View style={styles.challengeHeader}>
                <Text style={styles.challengeTitle}>{challenge.title}</Text>
                <Text
                  style={[
                    styles.challengeStatus,
                    {
                      color: isCompleted
                        ? THEME.colors.secondary
                        : THEME.colors.text.secondary,
                    },
                  ]}
                >
                  {isCompleted ? "✅" : "⏳"}
                </Text>
              </View>
              <View style={styles.progressBar}>
                <LinearGradient
                  colors={["#00e0ff", "#00ff85"]}
                  style={[
                    styles.progressFill,
                    { width: `${challenge.progress}%` },
                  ]}
                />
              </View>
              <Text style={styles.progressText}>
                {Math.round(challenge.progress)}% • {challenge.points} points
              </Text>
            </View>
          );
        })}
      </GlassCard>

      {/* Achievements */}
      <GlassCard
        style={styles.achievementsCard}
        gradientColors={["#141e30", "#243b55"]}
      >
        <Text style={styles.sectionTitle}>Achievements</Text>

        {totalPoints >= 100 && (
          <View style={styles.achievement}>
            <Text style={styles.achievementIcon}>🏆</Text>
            <Text style={styles.achievementText}>First 100 Points!</Text>
          </View>
        )}

        {completedChallenges.length >= 1 && (
          <View style={styles.achievement}>
            <Text style={styles.achievementIcon}>🎵</Text>
            <Text style={styles.achievementText}>Music Lover</Text>
          </View>
        )}

        {completionRate >= 100 && (
          <View style={styles.achievement}>
            <Text style={styles.achievementIcon}>🌟</Text>
            <Text style={styles.achievementText}>Perfect Score!</Text>
          </View>
        )}

        {totalPoints === 0 && completedChallenges.length === 0 && (
          <Text style={styles.noAchievements}>
            Complete challenges to unlock achievements!
          </Text>
        )}
      </GlassCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
    paddingHorizontal: THEME.spacing.md,
  },
  header: {
    fontSize: THEME.fonts.sizes.xxl,
    fontWeight: "bold",
    color: THEME.colors.text.primary,
    marginVertical: THEME.spacing.lg,
    textAlign: "center",
  },
  statsCard: {
    marginBottom: THEME.spacing.md,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: THEME.fonts.sizes.xl,
    fontWeight: "bold",
    color: THEME.colors.accent,
    marginBottom: THEME.spacing.xs,
  },
  statLabel: {
    fontSize: THEME.fonts.sizes.sm,
    color: THEME.colors.text.secondary,
  },
  progressCard: {
    marginBottom: THEME.spacing.md,
  },
  sectionTitle: {
    fontSize: THEME.fonts.sizes.lg,
    fontWeight: "bold",
    color: THEME.colors.text.primary,
    marginBottom: THEME.spacing.md,
  },
  challengeItem: {
    marginBottom: THEME.spacing.md,
  },
  challengeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: THEME.spacing.xs,
  },
  challengeTitle: {
    fontSize: THEME.fonts.sizes.md,
    color: THEME.colors.text.primary,
  },
  challengeStatus: {
    fontSize: THEME.fonts.sizes.lg,
  },
  progressBar: {
    height: 6,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 3,
    overflow: "hidden",
    marginBottom: THEME.spacing.xs,
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  progressText: {
    fontSize: THEME.fonts.sizes.sm,
    color: THEME.colors.text.secondary,
  },
  achievementsCard: {
    marginBottom: THEME.spacing.xl,
  },
  achievement: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: THEME.spacing.sm,
  },
  achievementIcon: {
    fontSize: THEME.fonts.sizes.xl,
    marginRight: THEME.spacing.md,
  },
  achievementText: {
    fontSize: THEME.fonts.sizes.md,
    color: THEME.colors.text.primary,
  },
  noAchievements: {
    fontSize: THEME.fonts.sizes.sm,
    color: THEME.colors.text.tertiary,
    textAlign: "center",
    fontStyle: "italic",
  },
});
