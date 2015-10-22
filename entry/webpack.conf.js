var webpack = require('webpack');
var path = require('path');

module.exports = {
  externals: {
    // Make sure we use Meteor package for react and react-router
    'react': 'React',
    'react-router': 'ReactRouter'
  },
  devServer: {
    // You can change this to your server IP address to access it remotely
    host: 'localhost'
  },
  resolve: {
    root: path.join(__dirname, '..', 'modules'),
    extensions: ['', '.js', '.jsx', '.json', '.css', '.scss']
  }
};
