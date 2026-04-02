const { getDefaultConfig } = require('expo/metro-config');
const { withUniwindConfig } = require('uniwind/metro');
const path = require('path');

const config = getDefaultConfig(__dirname);

// SVG transformer
config.resolver.assetExts = config.resolver.assetExts.filter(
  (ext) => ext !== 'svg',
);
config.resolver.sourceExts = [
  ...config.resolver.sourceExts,
  'svg',
  'cjs',
  'mjs',
];
config.transformer.babelTransformerPath = require.resolve(
  'react-native-svg-transformer',
);

// Monorepo: obserwuj libs
config.watchFolders = [path.resolve(__dirname, '../../libs')];

// Monorepo: node_modules
config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, 'node_modules'),
  path.resolve(__dirname, '../../node_modules'),
];

// Aliasy dla @dziki-zielnik/* — Metro nie czyta tsconfig paths
config.resolver.extraNodeModules = {
  '@dziki-zielnik/database': path.resolve(
    __dirname,
    '../../libs/database/src/index.ts',
  ),
  '@dziki-zielnik/data-access': path.resolve(
    __dirname,
    '../../libs/data-access/src/index.ts',
  ),
  '@dziki-zielnik/contracts': path.resolve(
    __dirname,
    '../../libs/contracts/src/index.ts',
  ),
  '@dziki-zielnik/api-client': path.resolve(
    __dirname,
    '../../libs/api-client/src/index.ts',
  ),
};

module.exports = withUniwindConfig(config, {
  cssEntryFile: './global.css',
  dtsFile: './uniwind-types.d.ts',
});
