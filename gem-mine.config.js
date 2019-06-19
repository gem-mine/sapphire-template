const webpackConfig = require('./webpack.config')

module.exports = {
  useKoa: false,
  lintOnSave: true,
  hardSource: true,
  bundleAnalyzer: false,
  chainWebpack() {
    // use webpack-chain
  },
  configureWebpack: webpackConfig
}
