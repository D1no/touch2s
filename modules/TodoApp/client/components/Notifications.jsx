import { Component, PropTypes  } from 'react';

let notificationStore = {};
export default class Notifications extends Component {
  static propTypes = {
    f7: PropTypes.any.isRequired,
    new: {
      _id: PropTypes.string, // Added for tracking.
      where: React.PropTypes.shape({
        user_ids: React.PropTypes.string,
        channels: React.PropTypes.string
      }),
      data: React.PropTypes.shape({
        // ToDo match parse.com data type
        // Parameter docs:
        // http://www.idangero.us/framework7/docs/notifications.html#notifications-javascript-api
        // Simply trigger notifications by setting the state in the parent component pointed to triggerNotification
        title: PropTypes.string,
        subtitle: PropTypes.string,
        media: PropTypes.string,
        hold: PropTypes.number,
        closeIcon: PropTypes.bool,
        button: PropTypes.object,
        closeOnClick: PropTypes.bool,
        additionalClass: PropTypes.string,
        custom: PropTypes.string,
        // ToDo proxy onClick and onClose through class
        onClick: PropTypes.func,
        onClose: PropTypes.func
      }),
      push_time: React.PropTypes.instanceOf(Date),
      expiration_interval: React.PropTypes.instanceOf(Date)
    },
    handleNotification: PropTypes.func // added to be able to close this or all notifications
  };

  static reset(toStore) {
    // Be able to reset the local store or load an old one.
    notificationStore = (typeof toStore === 'object') ? toStore : {};
    return notificationStore;
  }

  constructor(props, context) {
    super(props);
  };

  componentWillReceiveProps(newProps, newContext) {
    let f7 = this.props.f7;
    let n = newProps.new;

    // Do not fire notifications twice
    if(!n || n._id === this.new._id) {
      return
    }

    // We need global unique IDs to prevent conflicts
    n._id = n._id ? n._id : _.uniqueId("n");

    // Do not fire notification already in store
    if(notificationStore[n.id]) {
      console.log("Notification: " + n._id + " was already dispatched!");
      return
    }

    // ToDo complete handler

    // Default Media
    n.media = n.media ? n.media : '<h2 style="margin: 0">T2S</h2>';

    notificationStore[n.id] = f7.addNotification(n);
  }

  shouldComponentUpdate(newProps, newState) {
    // We handle notifications in a "Rendering-Style" so we let Framework7
    // handle the (occasional) DOM-Updates. Component should never re-render.
    return false;
  }

  // On first trigger, F7 will append a div with class "notification" to the body for us.
  // Outside of reacts management. So we render here nothing.
  render() {
    return null
  }
}