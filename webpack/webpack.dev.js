const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common')

const dev = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    host: '0.0.0.0',
    port: 3000,
	public: 'localhost:3000',
    open: true
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
      __BUILD_TYPE__: '\'web\'',
    })
  ]
}

module.exports = merge(common, dev)
