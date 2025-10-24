import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Button, FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { fetchRewards } from '../api/helloAgainApi';
import { useAppSelector } from '../hooks';
import { Reward } from '../types/reward';
import RewardCard from '../components/RewardCard';

const PAGE_SIZE = 20;
const ITEM_HEIGHT = 80;

export default function RewardsListScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const collected = useAppSelector((s) => s.collectedRewards.items);
  const collectedIds = useMemo(() => new Set(collected.map((r) => r.id)), [collected]);

  const [items, setItems] = useState<Reward[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPage = useCallback(async (p: number, append: boolean) => {
    try {
      const res = await fetchRewards({ limit: PAGE_SIZE, page: p, filterWithoutImages: true });
      setHasMore(res.hasMore);
      setItems((prev) => (append ? [...prev, ...res.items] : res.items));
      setError(null);
    } catch (e: any) {
      setError(e?.message || 'Failed to load rewards');
    } finally {
      setLoadingInitial(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    loadPage(1, false);
  }, [loadPage]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title="Collected" onPress={() => navigation.navigate('CollectedRewards')} />
      ),
    });
  }, [navigation]);

  const onEndReached = useCallback(() => {
    if (loadingMore || !hasMore) return;
    const next = page + 1;
    setLoadingMore(true);
    setPage(next);
    loadPage(next, true);
  }, [hasMore, loadingMore, page, loadPage]);

  const keyExtractor = useCallback((item: Reward) => item.id, []);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Reward>) => (
      <RewardCard reward={item} collected={collectedIds.has(item.id)} />
    ),
    [collectedIds]
  );

  if (loadingInitial) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error && items.length === 0) {
    return (
      <View style={styles.center}>
        <Button title="Retry" onPress={() => loadPage(1, false)} />
      </View>
    );
  }

  return (
    <FlatList
      data={items}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      getItemLayout={(_, index) => ({ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index })}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      initialNumToRender={12}
      windowSize={11}
      removeClippedSubviews
      contentContainerStyle={styles.listContent}
      ListFooterComponent={loadingMore ? <ActivityIndicator /> : null}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  listContent: { padding: 8 },
});


