const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');

module.exports = {
  output: {
    path: join(__dirname, '../../dist/apps/api'),
    clean: true,
    ...(process.env.NODE_ENV !== 'production' && {
      devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    }),
  },
  resolve: {
    alias: {
      '@dziki-zielnik/database': join(__dirname, '../../libs/database/src/index.ts'),
      '@dziki-zielnik/data-access': join(__dirname, '../../libs/data-access/src/index.ts'),
      '@dziki-zielnik/contracts': join(__dirname, '../../libs/contracts/src/index.ts'),
      '@dziki-zielnik/api-client': join(__dirname, '../../libs/api-client/src/index.ts'),
      '@dziki-zielnik/database-seed': join(__dirname, '../../libs/database-seed/src/index.ts'),
    },
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: true,
      sourceMap: true,
    }),
  ],
};
