import React, { memo, useCallback } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAppDispatch } from '../hooks';
import { collectReward } from '../store/collectedRewardsSlice';
import { Reward } from '../types/reward';

interface Props {
  reward: Reward;
  collected: boolean;
}

function RewardCardBase({ reward, collected }: Props) {
  const dispatch = useAppDispatch();
  const onCollect = useCallback(() => {
    if (!collected) dispatch(collectReward(reward));
  }, [dispatch, reward, collected]);

  const thumbnail = reward.pictures && reward.pictures[0];

  return (
    <View style={[styles.card, collected && styles.collected]}>
      {thumbnail ? (
        <Image source={{ uri: thumbnail }} style={styles.thumbnail} />
      ) : (
        <View style={[styles.thumbnail, styles.placeholder]} />
      )}
      <View style={styles.center}>
        <Text style={styles.title}>{reward.name}</Text>
        <Text style={styles.points}>{reward.points} pts</Text>
      </View>
      <View style={styles.right}>
        {collected ? (
          <View style={styles.badge}><Text style={styles.badgeText}>Collected</Text></View>
        ) : (
          <TouchableOpacity onPress={onCollect} style={styles.btn} accessibilityLabel="Collect reward">
            <Text style={styles.btnText}>Collect</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: '#fff', borderRadius: 8, marginBottom: 8, elevation: 1 },
  collected: { opacity: 0.6 },
  thumbnail: { width: 56, height: 56, borderRadius: 8, backgroundColor: '#eee' },
  placeholder: { backgroundColor: '#ddd' },
  center: { flex: 1, marginHorizontal: 12 },
  title: { fontSize: 16, fontWeight: 'bold' },
  points: { marginTop: 4, color: '#555' },
  right: {},
  btn: { paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#0a7', borderRadius: 6 },
  btnText: { color: '#fff', fontWeight: '700' },
  badge: { paddingHorizontal: 8, paddingVertical: 6, backgroundColor: '#ddd', borderRadius: 6 },
  badgeText: { color: '#333', fontWeight: '600' },
});

const RewardCard = memo(RewardCardBase);
export default RewardCard;


