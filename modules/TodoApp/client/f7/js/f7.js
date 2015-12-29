/**
 * Created by dinos on 27/12/15.
 */
import "./framework7.custom.es5.js";

// Initialize f7 via a static class to be sure we always deal with one instance.
let Instance;
export default class F7 {
  constructor(options) {
    const defaultOptions = {
      animateNavBackIcon:true
    }

    this.options = options ? options : defaultOptions;

    if(!Instance) {
      Instance = new window.Framework7(this.options);
    }

    return Instance;
  }
}