const custom = require('../webpack')
module.exports = {
  ident: 'postcss',
  plugins: [
    require('postcss-import')(),
    require('precss')(),
    require('postcss-cssnext')(),
    require('postcss-pxtorem')(custom.postcssPxtoremOptions)
  ]
}
