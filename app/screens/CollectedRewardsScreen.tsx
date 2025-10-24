import React, { useCallback } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, Text, View } from 'react-native';
import { useAppSelector } from '../hooks';
import { Reward } from '../types/reward';

export default function CollectedRewardsScreen() {
  const items = useAppSelector((s) => s.collectedRewards.items);

  const keyExtractor = useCallback((item: Reward) => item.id, []);
  const renderItem = useCallback(({ item }: ListRenderItemInfo<Reward>) => {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.points}>{item.points} pts</Text>
      </View>
    );
  }, []);

  if (items.length === 0) {
    return (
      <View style={styles.center}> 
        <Text>No collected rewards</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={items}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      contentContainerStyle={styles.listContent}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  listContent: { padding: 8 },
  card: { padding: 12, borderRadius: 8, backgroundColor: '#fff', marginBottom: 8, elevation: 1 },
  title: { fontSize: 16, fontWeight: 'bold' },
  points: { marginTop: 4, color: '#555' },
});


