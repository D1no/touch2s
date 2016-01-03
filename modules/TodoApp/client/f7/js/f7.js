// Import Framework7 Styles
import "TodoApp/client/f7/less/ios/framework7.ios.less";
import "TodoApp/client/f7/less/ios/framework7.ios.colors.less";

import "TodoApp/client/f7/less/my-app.less";

// Initialize f7 via a static class to be sure we always deal with one instance and don't conflict with SSR
let Instance;
let currentTheme;
export default class F7 {

  static currentTheme() {
    return currentTheme;
  }

  static loadTheme(name) {
    console.log(name);
/*    let styles;
    let colors;

    if(name === "ios") {
      styles = require("style!TodoApp/client/f7/less/ios/framework7.ios.less");
      colors = require("style!TodoApp/client/f7/less/ios/framework7.ios.colors.less");
    }

    if(name === "material") {
      styles = require("style!TodoApp/client/f7/less/material/framework7.material.less");
      colors = require("style!TodoApp/client/f7/less/material/framework7.material.colors.less");
    }

    currentTheme = {
      name: name,
      styles: styles,
      colors: colors
    };*/
  }

  constructor(options) {
    const defaultOptions = {
      // Enable dynamic Navbar
      dynamicNavbar: true,
      // Enable Dom Cache so we can use all inline pages
      domCache: true,
      material: false
    };

    this.options = options ? _.extend(defaultOptions, options) : defaultOptions;

    // Import Framework7 styles
    F7.loadTheme(this.options.material ? "material" : "ios");

    // Deal with SSR
    if(!Instance && !Meteor.isServer) {
      Instance = new window.Framework7(this.options);
    }

    return Instance;
  }


}