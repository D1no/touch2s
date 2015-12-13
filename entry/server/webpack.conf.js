var webpack = require('webpack');

var localIdentName = process.env.NODE_ENV === 'production' ? '[hash:base64:5]' : '[name]__[local]__[hash:base64:5]';
var babelSettings = { presets: ['react', 'es2015', 'stage-0'] };
babelSettings.plugins = ['transform-decorators-legacy'];

module.exports = {
  entry: './entry',
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel', query: babelSettings, exclude: /node_modules/ },
      { test: /\.css$/, loader: 'css/locals?module&localIdentName=' + localIdentName },
      { test: /\.(png|jpe?g)(\?.*)?$/, loader: 'url?limit=8182' },
      { test: /\.(svg|ttf|woff|eot)(\?.*)?$/, loader: 'file' }
    ]
  }
};
