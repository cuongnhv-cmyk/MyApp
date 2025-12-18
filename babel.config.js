module.exports = {
    presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
    plugins: [
        [
            'module-resolver',
            {
                root: ['./src'],
                extensions: [
                    '.ios.js',
                    '.android.js',
                    '.js',
                    '.jsx',
                    '.json',
                    '.tsx',
                    '.ts',
                ],
                alias: {
                    '@components': './src/components',
                    '@screens': './src/screens',
                    '@assets': './src/assets',
                    '@navigation': './src/navigation',
                    '@app-types': './src/types',
                    '@store': './src/store',
                    '@utils': './src/utils',
                },
            },
        ],
    ],
};
