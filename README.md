# HelloAgain Challenge App

## 🎯 Challenge Tamamlandı

Bu proje, React Native TypeScript challenge'ının tüm gereksinimlerini karşılamaktadır.

## ✨ Özellikler

- **📱 Modern React Native App** - TypeScript ile güçlü tip güvenliği
- **🧭 Navigation** - React Navigation 6 ile stack navigasyonu
- **📦 State Management** - Redux Toolkit ile merkezi durum yönetimi
- **🔄 API Integration** - Axios ile pagination destekli rewards API
- **🎨 UI Components** - Responsive ve performans odaklı bileşenler
- **⚡ Performance Optimized** - FlatList optimizasyonları ve memoization
- **🧪 Testing** - Jest ile unit testler
- **💾 Local State** - Toplanan ödüllerin redux store'da tutulması

## 🚀 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Metro bundler'ı başlat
npm start

# Yeni terminal açıp Android için
npm run android

# Veya iOS için (macOS)
npm run ios
```

## 📁 Proje Yapısı

```
app/
├── api/
│   └── helloAgainApi.ts      # API client + pagination
├── components/
│   └── RewardCard.tsx        # Reward kart bileşeni
├── hooks/
│   └── index.ts              # RTK typed hooks
├── navigation/
│   └── index.tsx             # Stack navigator
├── screens/
│   ├── RewardsListScreen.tsx     # Ana liste + pagination
│   └── CollectedRewardsScreen.tsx # Toplanan ödüller
├── store/
│   ├── index.ts                  # RTK store config
│   └── collectedRewardsSlice.ts  # Rewards state slice
└── types/
    └── reward.ts                 # TypeScript tipleri
```

## 🎮 Kullanım

1. **RewardsList Screen** - Tüm ödülleri görüntüle, sayfala, topla
2. **Collected Rewards** - Toplanan ödülleri gör (sağ üst buton)
3. **Pull to Refresh** - Listeyi yenile
4. **Error Handling** - API hatalarında retry butonu
5. **Loading States** - Smooth loading deneyimi

## 🧪 Test

```bash
# Unit testleri çalıştır
npm test

# Test dosyaları:
# __tests__/App.test.tsx              # Smoke test
# __tests__/collectedRewardsSlice.test.ts # Reducer testleri
```

## 🔧 Teknik Detaylar

### Performance Optimizasyonları
- **Virtual Scrolling** - FlatList windowSize ve initialNumToRender
- **Memoization** - useCallback, useMemo, React.memo
- **getItemLayout** - Scroll performans için item boyutları
- **removeClippedSubviews** - Memory optimizasyonu

### State Management
- **Redux Toolkit** - Modern Redux API
- **Typed Selectors** - TypeScript ile tip güvenli state access
- **Immer** - Immutable state updates

### API Integration
- **Pagination** - Infinite scroll ile sayfalama
- **Error Handling** - Axios interceptors ve retry logic
- **Loading States** - Initial load, refresh, pagination loading

## 📋 PR Checklist

- [x] TypeScript strict mode aktif
- [x] ESLint ve Prettier konfigürasyonu
- [x] Navigation kurulumu (SafeArea + Stack)
- [x] RTK store ve slice implementasyonu
- [x] API client (axios + pagination)
- [x] RewardCard bileşeni (memoized)
- [x] RewardsListScreen (FlatList + infinite scroll)
- [x] CollectedRewardsScreen implementasyonu
- [x] Loading ve error state handling
- [x] Performance optimizasyonları
- [x] Unit testler (reducer + smoke)
- [x] README ve dokümantasyon

## 🎯 Demo

Uygulama çalıştığında:
1. Rewards listesinde tüm ödülleri gör
2. "Collect" butonuna basarak ödül topla
3. Sağ üst "Collected" butonuna bas
4. Toplanan ödülleri görüntüle
5. Listeyi aşağı kaydırarak daha fazla ödül yükle

## 🛠 Geliştirme

```bash
# Linting
npm run lint

# Type checking
npx tsc --noEmit

# Test coverage (jest eklendikten sonra)
npm test -- --coverage
```

## 📱 Platform Desteği

- ✅ Android (API Level 21+)
- ✅ iOS (iOS 12+)
- ✅ TypeScript 5.8+
- ✅ React Native 0.82+

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
