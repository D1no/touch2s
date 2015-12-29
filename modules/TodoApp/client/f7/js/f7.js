/**
 * Created by dinos on 27/12/15.
 */


// Initialize f7 via a static class to be sure we always deal with one instance.
let Instance;
export default class F7 {
  constructor(options) {
    const defaultOptions = {
      animateNavBackIcon:true
    }

    this.options = options ? options : defaultOptions;

    if(!Instance && Meteor.isClient) {
      Instance = new window.Framework7(this.options);
    }

    return Instance;
  }
}