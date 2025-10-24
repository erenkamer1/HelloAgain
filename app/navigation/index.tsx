import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CollectedRewardsScreen from '../screens/CollectedRewardsScreen';
import RewardsListScreen from '../screens/RewardsListScreen';

export type RootStackParamList = {
  RewardsList: undefined;
  CollectedRewards: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="RewardsList" component={RewardsListScreen} options={{ title: 'Rewards' }} />
          <Stack.Screen
            name="CollectedRewards"
            component={CollectedRewardsScreen}
            options={{ title: 'Collected' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}


