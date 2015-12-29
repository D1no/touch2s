import { Component } from 'react';

export default class LeftPanel extends Component {
  render() {
    return (
      <div className="panel panel-left layout-dark panel-reveal">
        <div className="content-block-title">REFTEOR (Meteor + React + F7)</div>
        <div className="content-block">
          <p className>This is a side panel. You can close it by clicking outsite or on this link: <a href="#" className="close-panel">close me</a>. You can put here anything, even another isolated view like in <a href="#" data-panel="right" className="open-panel">Right Panel</a></p>
        </div>
        <div className="content-block-title">Links</div>
        <div className="list-block">
          <ul>
            <li><a href="forms.html" className="item-link close-panel">
              <div className="item-content">
                <div className="item-media"><i className="icon icon-f7" /></div>
                <div className="item-inner">
                  <div className="item-title">Github</div>
                </div>
              </div></a></li>
            <li><a href="list-view.html" className="item-link close-panel">
              <div className="item-content">
                <div className="item-media"><i className="icon icon-f7" /></div>
                <div className="item-inner">
                  <div className="item-title">Framework 7</div>
                </div>
              </div></a></li>
          </ul>
        </div>
      </div>
    );
  }
}