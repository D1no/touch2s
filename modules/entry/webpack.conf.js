var webpack = require('webpack');

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
    root: __dirname + '/..',
    extensions: ['', '.js', '.jsx', '.json', '.css', '.scss']
  }
};
