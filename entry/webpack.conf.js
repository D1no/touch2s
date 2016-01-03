var webpack = require('webpack');
var path = require('path');

module.exports = {
  devServer: {
    // You can change this to your server IP address to access it remotely
    // Or add a settings.json with your dev server IP and do "meteor --settings settings.json"
    host: ((Meteor.settings || {}).devel || {}).ip || "localhost"
  },
  hotMiddleware: {
    reload: true
  },
  resolve: {
    root: path.join(__dirname, '..', 'modules'),
    extensions: ['', '.js', '.jsx', '.json', '.css', '.scss', '.less']
  }
};
