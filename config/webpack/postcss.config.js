const custom = require('../webpack')
module.exports = {
  ident: 'postcss',
  plugins: [
    require('postcss-calc')(),
    require('postcss-import')(),
    require('precss')(),
    require('postcss-cssnext')(),
    require('postcss-pxtorem')(custom.postcssPxtoremOptions)
  ]
}
