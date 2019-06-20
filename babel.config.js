module.exports = {
  'presets': [
    ['@babel/preset-env', {
      targets: {
        ie: '9'
      },
      useBuiltIns: 'entry',
      corejs: 3,
      modules: 'cjs'
    }],
    '@babel/preset-react'
  ],
  'plugins': [
    '@babel/plugin-transform-object-assign',
    '@babel/plugin-syntax-dynamic-import',
    [
      '@babel/plugin-transform-runtime',
      {
        'helpers': false,
        'regenerator': true
      }
    ],
    ['@babel/plugin-proposal-decorators', {
      'legacy': true
    }],
    ['@babel/plugin-proposal-class-properties', {
      'loose': true
    }]
  ]
}
