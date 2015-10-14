var webpack = require('webpack');

module.exports = {
  externals: {
    // Add global variables you would like to import
    'react': 'React',
    'react-router': 'ReactRouter',
    'react-router-ssr': 'ReactRouterSSR',
    'react-meteor-data': 'ReactMeteorData',
    'blaze-to-react': 'BlazeToReact'
  },
  devServer: {
    // You can change this to your server IP address to access it remotely
    host: 'localhost'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.css', '.scss']
  }
};
