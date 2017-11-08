const webpack = require('webpack')

module.exports = {
  entry: './app.js',
  output: {
    filename: 'bundle.js',
    publicPath: '/',
  },
  devtool: 'source-map',
  module: {
    rules: [{
      test: /jsx?$/,
      exclude: /(node_modules|bower_components)/,
      use: ['babel-loader']
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin,  // enable HMR globally
    new webpack.NamedModulesPlugin,          // Better module names in the browser
                                              // console on HMR updates
    new webpack.NoEmitOnErrorsPlugin,        // Don't emit on errors.
  ],
}