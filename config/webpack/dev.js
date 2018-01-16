const path = require('path')
const { helper, SRC, join } = require('./helper')

const isHot = process.env.npm_config_hot !== ''
const shouldAnalyzer = !!process.env.npm_config_analyzer

const custom = require('../webpack')

const config = {
  entry: {
    polyfill: ['babel-polyfill'],
    main: [path.resolve(SRC, 'index.js')]
  },
  output: helper.output.hash(),
  resolve: helper.resolve(),
  resolveLoader: helper.resolveLoader(),
  devtool: 'source-map',
  module: {
    loaders: join(
      helper.loaders.babel(isHot),
      helper.loaders.css(isHot),
      helper.loaders.less(isHot),
      helper.loaders.sass(isHot),
      helper.loaders.source(),
      custom.loaders
    )
  },
  plugins: join(
    helper.plugins.define('dev', {
      DEBUG: true
    }),
    helper.plugins.ignore(/vertx/),
    helper.plugins.scopeHosting(),
    helper.plugins.extractCss(),
    helper.plugins.html(),

    custom.plugins,
    helper.plugins.done()
  ),
  stats: {
    children: false,
    colors: true
  }
}

if (isHot) {
  config.plugins.push(helper.plugins.hot())
}
if (shouldAnalyzer) {
  config.plugins.push(helper.plugins.analyzer())
}

const devServer = helper.devServer(isHot)
config.plugins.push(helper.plugins.browser(`http://${devServer.host}:${devServer.port}`))
config.devServer = devServer

module.exports = config
