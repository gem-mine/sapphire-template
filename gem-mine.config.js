const path = require('path')
const configureWebpack = require('./webpack.config')

module.exports = {
  useDll: true,
  useKoa: false,
  lintOnSave: true,
  hardSource: true,
  bundleAnalyzer: false,
  dllModule: ['react', 'react-dom', 'prop-types', 'create-react-class', '@gem-mine/durex', '@gem-mine/request', '@gem-mine/immutable'],
  chainWebpack(config) {
    config.entryPoints.delete('index')
    config.output.path(path.resolve('./build'))
    const extensions = ['.json', '.js', '.jsx', '.ts', '.tsx', '.css', '.less', '.scss']
    extensions.forEach((extension) => {
      config.resolve.extensions.delete(extension)
    })
    const rules = ['ts', 'image', 'movie', 'font', 'css', 'css-modules', 'less', 'less-modules', 'sass', 'sass-modules', 'scss', 'scss-modules', 'js']
    rules.forEach((rule) => {
      config.module.rules.delete(rule)
    })
    const plugins = [
      'DefinePlugin',
      'SuccessPlugin',
      'CopyWebpackPlugin',
      // 'HtmlWebpackPlugin',
      'MiniCssExtractPlugin',
      'CSSSplitWebpackPlugin',
      // 'HtmlWebpackTagsPlugin',
      'OptimizeCSSAssetsPlugin',
      'HotModuleReplacementPlugin'
      // 'ScriptExtHtmlWebpackPlugin'
    ]
    plugins.forEach((plugin) => {
      config.plugins.delete(plugin)
    })
  },
  configureWebpack
}
