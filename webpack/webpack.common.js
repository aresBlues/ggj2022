const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { InjectManifest } = require('workbox-webpack-plugin')

const copyFolders = [
  { from: 'src/assets', to: 'assets' },
  { from: 'pwa', to: '' },
  { from: 'src/favicon.ico', to: '' }
]

const mainConfig = {
  entry: ['./src/main.js', './webpack/credits.js'],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js'
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: ['babel-loader']	}]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          filename: '[name].bundle.js'
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({ gameName: 'GGJ 2022', template: 'src/index.html' }),
    new CopyWebpackPlugin(copyFolders),
    new InjectManifest({
      swSrc: path.resolve(__dirname, '../pwa/sw.js'),
      exclude: ['index.html']
    })
  ]
}

module.exports = mainConfig
