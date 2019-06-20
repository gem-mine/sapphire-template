const { join } = require('./util')
const { copyFileToDist } = require('./file')

const output = require('./webpack-output')
const loaders = require('./webpack-loaders')
const plugins = require('./webpack-plugins')
const { resolve, resolveLoader } = require('./webpack-resolve')
const devServer = require('./webpack-devServer')

exports.helper = {
  output,
  loaders,
  plugins,
  resolve,
  resolveLoader,
  devServer
}

exports.join = join
exports.copyFileToDist = copyFileToDist
