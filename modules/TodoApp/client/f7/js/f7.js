// The import of the library happens in client/entry.js to be sure wepbacks optimization does not kill our global

// Initialize f7 via a static class to be sure we always deal with one instance and don't conflict with SSR
let Instance;
export default class F7 {
  constructor(options) {
    const defaultOptions = {
      animateNavBackIcon:true
    };

    this.options = options ? options : defaultOptions;

    // Deal with SSR
    if(!Instance && Meteor.isClient) {
      Instance = new window.Framework7(this.options);
    }

    return Instance;
  }
}