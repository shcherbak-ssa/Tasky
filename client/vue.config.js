const path = require('path');

const { defineConfig } = require('@vue/cli-service');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');

module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,
  productionSourceMap: false,
  runtimeCompiler: true,

  devServer: {
    proxy: 'http://localhost:3333',
  },

  configureWebpack(config) {
    const tsconfigPathsPlugin = new TsconfigPathsPlugin({
      configFile: path.join(__dirname, 'tsconfig.json'),
    });

    if (config.resolve.plugins && Array.isArray(config.resolve.plugins)) {
      config.resolve.plugins.push(tsconfigPathsPlugin);
    } else {
      config.resolve.plugins = [tsconfigPathsPlugin];
    }
  },
});
