// const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = mergeConfig(getDefaultConfig(__dirname), {
    // you can add other Metro config here later if needed
    // resolver: {
    //     extraNodeModules: {
    //         '@components': path.resolve(__dirname, 'src/components'),
    //         '@screens': path.resolve(__dirname, 'src/screens'),
    //         '@assets': path.resolve(__dirname, 'src/assets'),
    //         '@navigation': path.resolve(__dirname, 'src/navigation'),
    //         '@constants': path.resolve(__dirname, 'src/constants'),
    //         '@app-types': path.resolve(__dirname, 'src/types'),
    //     },
    // },
});

module.exports = withNativeWind(config, { input: './global.css' });
