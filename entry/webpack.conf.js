var webpack = require('webpack');
var path = require('path');

module.exports = {
  devServer: {
    // You can change this to your server IP address to access it remotely
    host: '192.168.1.100'
  },
  hotMiddleware: {
    reload: true
  },
  resolve: {
    root: path.join(__dirname, '..', 'modules'),
    extensions: ['', '.js', '.jsx', '.json', '.css', '.scss', '.less']
  }
};
