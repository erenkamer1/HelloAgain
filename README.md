# HelloAgain Challenge App

## 🎯 Challenge Completed

This project meets all the requirements of the React Native TypeScript challenge.

## ✨ Features

- **📱 Modern React Native App** - Strong type safety with TypeScript
- **🧭 Navigation** - Stack navigation with React Navigation 6
- **📦 State Management** - Centralized state management with Redux Toolkit
- **🔄 API Integration** - Pagination-enabled rewards API with Axios
- **🎨 UI Components** - Responsive and performance-focused components
- **⚡ Performance Optimized** - FlatList optimizations and memoization
- **🧪 Testing** - Unit tests with Jest
- **💾 Local State** - Collected rewards stored in Redux store

## 🚀 Installation

```bash
# Install dependencies
npm install

# Start Metro bundler
npm start

# Open a new terminal and run for Android
npm run android

# Or for iOS (macOS)
npm run ios
```

## 📁 Project Structure

```
app/
├── api/
│   └── helloAgainApi.ts      # API client + pagination
├── components/
│   └── RewardCard.tsx        # Reward card component
├── hooks/
│   └── index.ts              # RTK typed hooks
├── navigation/
│   └── index.tsx             # Stack navigator
├── screens/
│   ├── RewardsListScreen.tsx     # Main list + pagination
│   └── CollectedRewardsScreen.tsx # Collected rewards
├── store/
│   ├── index.ts                  # RTK store config
│   └── collectedRewardsSlice.ts  # Rewards state slice
└── types/
    └── reward.ts                 # TypeScript types
```

## 🎮 Usage

1. **RewardsList Screen** - View all rewards, paginate, collect
2. **Collected Rewards** - View collected rewards (top right button)
3. **Pull to Refresh** - Refresh the list
4. **Error Handling** - Retry button on API errors
5. **Loading States** - Smooth loading experience

## 🧪 Testing

```bash
# Run unit tests
npm test

# Test files:
# __tests__/App.test.tsx              # Smoke test
# __tests__/collectedRewardsSlice.test.ts # Reducer tests
```

## 🔧 Technical Details

### Performance Optimizations
- **Virtual Scrolling** - FlatList windowSize and initialNumToRender
- **Memoization** - useCallback, useMemo, React.memo
- **getItemLayout** - Item sizes for scroll performance
- **removeClippedSubviews** - Memory optimization

### State Management
- **Redux Toolkit** - Modern Redux API
- **Typed Selectors** - Type-safe state access with TypeScript
- **Immer** - Immutable state updates

### API Integration
- **Pagination** - Pagination with infinite scroll
- **Error Handling** - Axios interceptors and retry logic
- **Loading States** - Initial load, refresh, pagination loading

## 📋 PR Checklist

- [x] TypeScript strict mode enabled
- [x] ESLint and Prettier configuration
- [x] Navigation setup (SafeArea + Stack)
- [x] RTK store and slice implementation
- [x] API client (axios + pagination)
- [x] RewardCard component (memoized)
- [x] RewardsListScreen (FlatList + infinite scroll)
- [x] CollectedRewardsScreen implementation
- [x] Loading and error state handling
- [x] Performance optimizations
- [x] Unit tests (reducer + smoke)
- [x] README and documentation

## 🎯 Demo

When the app runs:
1. View all rewards in the rewards list
2. Collect a reward by pressing the "Collect" button
3. Press the top right "Collected" button
4. View collected rewards
5. Scroll down to load more rewards


## 📱 Platform Support

- ✅ Android (API Level 21+)
- ✅ iOS (iOS 12+)
- ✅ TypeScript 5.8+
- ✅ React Native 0.82+

> **Note:** This application has been tested only on Android Studio. iOS compatibility is expected but not verified.

