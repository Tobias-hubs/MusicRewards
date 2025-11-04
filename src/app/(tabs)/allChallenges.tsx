import React from 'react';
import { View, StyleSheet } from 'react-native';
import ChallengeList from '../../components/challenge/ChallengeList';
import { useMusicStore, selectChallenges } from '../../stores/musicStore';
import { SAMPLE_CHALLENGES } from '../../constants/theme';
import type { MusicChallenge } from '../../types';
import { router } from 'expo-router';

export default function ChallengesScreen() {
  const challenges = useMusicStore(selectChallenges) ?? (SAMPLE_CHALLENGES as MusicChallenge[]);

  const handleSelect = async (c: MusicChallenge) => {
    router.push(`/(modals)/player?id=${c.id}`);
  };

  return (
    <View style={styles.container}>
      <ChallengeList
        challenges={challenges}
        onSelect={handleSelect}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 24, backgroundColor: '#000' },
  listContainer: { paddingBottom: 48 },
});
