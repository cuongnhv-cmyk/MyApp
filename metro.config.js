const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = mergeConfig(getDefaultConfig(__dirname), {
  // you can add other Metro config here later if needed
});

module.exports = withNativeWind(config, { input: './global.css' });
