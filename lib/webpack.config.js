'use strict'
const webpack = require('webpack')
  , {dirname} = require('path')
  , nodeExternals = require('webpack-node-externals')
  , babel = require('../babel.config')

const parent = dirname(__dirname)
module.exports = {
  entry: './lib/index.js',
  output: {
    filename: 'lib.js', // <-- Important
    path: `${parent}/functions`,
    libraryTarget: 'commonjs', // <-- Important
  },
  context: parent,
  target: 'node', // <-- Important
  module: {
    rules: [
      {
        test: /jsx?$/,
        exclude: /node_modules/,
        use: babel(process.env),
      }
    ]
  },
  resolve: {
    alias: {
      '~': parent,
    }
  },
  externals: [
    nodeExternals(),
    {'firebase-functions': true},
  ] // <-- Important
}
