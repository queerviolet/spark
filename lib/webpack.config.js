'use strict'
const webpack = require('webpack')
    , {dirname} = require('path')
    , nodeExternals = require('webpack-node-externals');

const parent = dirname(__dirname)
module.exports = {
    entry: ['babel-polyfill', './lib/index.js'],
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
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['env', {
                                node: '6.10',
                            }],
                            'stage-2',
                            'react',
                        ],
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.jsx', '.js', '.json'],
        alias: {
          '~': parent,
        }
    },
    externals: [
      nodeExternals(),
      {'firebase-functions': true},
    ] // <-- Important
}
