module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!((@)?react-native|@reduxjs|react-redux|immer)/)',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|svg|webp)$': '<rootDir>/__mocks__/fileMock.js',
  },
};
