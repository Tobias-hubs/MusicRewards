import React from 'react';
import { FlatList, StyleProp, ViewStyle } from 'react-native';
import type { MusicChallenge } from '../../types';
import { ChallengeCard } from './ChallengeCard';

type Props = {
  challenges: MusicChallenge[];
  onSelect: (c: MusicChallenge) => void;
  onPlay?: (c: MusicChallenge) => void;
  contentContainerStyle?: StyleProp<ViewStyle>;
  currentTrackId?: string;
  isPlaying?: boolean;
};

export default function ChallengeList({
  challenges,
  onSelect,
  onPlay,
  contentContainerStyle,
  currentTrackId,
  isPlaying,
}: Props) {
  return (
    <FlatList
      data={challenges}
      keyExtractor={(i) => i.id}
      contentContainerStyle={contentContainerStyle}
      renderItem={({ item }) => (
        <ChallengeCard
          challenge={item}
          onPlay={onPlay ?? onSelect}
        //   onPress={() => onSelect(item)}
          isCurrentTrack={item.id === currentTrackId}
          isPlaying={isPlaying}
        />
      )}
      showsVerticalScrollIndicator={false}
    />
  );
}
