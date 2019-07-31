const path = require('path')
const { execSync } = require('child_process')
const { log } = require('@gem-mine/sapphire-helper')
const detect = require.resolve('detect-port/bin/detect-port')
const { SRC } = require('./constant')
const { helper, join } = require('./helper')
const custom = require('../webpack')

const kill = require('tree-kill')

const pid = process.pid
process.on('SIGINT', function () {
  kill(pid, 'SIGKILL')
})

const isHot = process.env.npm_config_hot !== ''
const shouldAnalyzer = !!process.env.npm_config_analyzer
let port = process.env.npm_config_port || 9000

const p = Number(execSync(`node ${detect} ${port}`).toString().trim())

if (port !== p) {
  log.warning(`warning: port ${port} has been used, will use the ${p} instead.\n`)
  port = p
}

const devServer = helper.devServer(isHot, port)

/**
 * 开发模式下构建
 */
const config = {
  mode: 'development',
  entry: {
    main: [path.resolve(SRC, 'index.js')]
  },
  output: helper.output.hash(),
  resolve: helper.resolve(),
  resolveLoader: helper.resolveLoader(),
  // devtool: 'cheap-module-eval-source-map',
  cache: true,
  module: {
    rules: join(
      helper.loaders.babel(isHot),
      helper.loaders.css(isHot, custom.excludeStyleModule),
      helper.loaders.less(isHot, custom.excludeStyleModule),
      helper.loaders.sass(isHot, custom.excludeStyleModule),
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
    helper.plugins.splitCss(),
    helper.plugins.extraWatch(),

    custom.plugins,
    helper.plugins.done(null, true, true),
    helper.plugins.browser(`http://${devServer.host}:${devServer.port}`)
  ),
  devServer,
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

module.exports = config
