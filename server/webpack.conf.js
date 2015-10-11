var webpack = require('webpack');

module.exports = {
  entry: './entry',
  externals: {
    // Add global variables you would like to import
    'react': 'React',
    'react-router': 'ReactRouter',
    'react-router-ssr': 'ReactRouterSSR',
    'react-meteor-data': 'ReactMeteorData',
    'blaze-to-react': 'BlazeToReact'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.css', '.scss']
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel', query: { stage: 0 }, exclude: /node_modules/ },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.scss$/, loader: 'style!css!sass' },
      { test: /\.(png|jpe?g)(\?.*)?$/, loader: 'url?limit=8182' },
      { test: /\.(svg|ttf|woff|eot)(\?.*)?$/, loader: 'file' }
    ]
  }
};
