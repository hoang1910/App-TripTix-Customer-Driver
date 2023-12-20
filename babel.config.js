module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@constants': './src/constants',
          '@enums': './src/enums',
          '@httpClient': './src/httpClient',
          '@navigation': './src/navigation',
          '@screens': './src/screens',
          '@storage': './src/storage',
          '@store': './src/store',
          '@types': './src/types',
          '@utils': './src/utils',
        },
      },
    ],
    ['module:react-native-dotenv'],
  ],
};
