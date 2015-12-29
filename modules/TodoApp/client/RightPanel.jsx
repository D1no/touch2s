import { Component } from 'react';

export default class RightPanel extends Component {

  render() {
    return (
      <div className="panel panel-right panel-cover layout-dark">
        <div className="content-block-title">Right Panel</div>
        <div className="content-block">
          <p className>This is a right side panel. You can close it by clicking outsite or on this link: <a href="#" className="close-panel">close me</a>. You can put here anything, even another isolated view, try it:</p>
        </div>
        <div className="list-block">
          <ul>
            <li><a href="panel-right2.html" className="item-link">
              <div className="item-content">
                <div className="item-inner">
                  <div className="item-title">Right panel page 2</div>
                </div>
              </div></a></li>
            <li><a href="panel-right3.html" className="item-link">
              <div className="item-content">
                <div className="item-inner">
                  <div className="item-title">Right panel page 3</div>
                </div>
              </div></a></li>
          </ul>
        </div>
      </div>
    );
  }
}