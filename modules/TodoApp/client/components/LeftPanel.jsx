import { Component } from 'react';
import style from 'TodoApp/client/css/TodoApp.import.css';

export default class LeftPanel extends Component {
  render() {
    return (
      <div className="panel panel-left layout-dark panel-reveal">
        <div className="content-block-title">Touch2S v.0.2.2</div>
        <div className="content-block">
          <p className>This boilerplate uses Framework7 + React + Meteor + TrackerReact and Webpack as a build tool.</p>
        </div>
        <div className="content-block-title">Useful Links</div>
        <div className="list-block">
          <ul>
            <li><a href="http://github.com/d1no/touch2s" target="_blank" className="item-link external">
              <div className="item-content">
                <div className="item-media"><i className={"icon " + style.githubIcon} /></div>
                <div className="item-inner">
                  <div className="item-title">Fork Touch2S</div>
                </div>
              </div>
            </a></li>
            <li><a href="http://github.com/thereactivestack/kickstart" target="_blank" className="item-link external">
              <div className="item-content">
                <div className="item-media"><i className={"icon " + style.reactiveStackIcon} /></div>
                <div className="item-inner">
                  <div className="item-title">TRS Kickstart</div>
                </div>
              </div>
            </a></li>
            <li><a href="http://www.idangero.us/framework7" target="_blank" className="item-link external">
              <div className="item-content">
                <div className="item-media"><i className="icon icon-f7"/></div>
                <div className="item-inner">
                  <div className="item-title">Framework 7</div>
                </div>
              </div>
            </a></li>
            <li><a href="https://github.com/ultimatejs/tracker-react/" target="_blank" className="item-link external">
              <div className="item-content">
                <div className="item-media"><i className={"icon " + style.reactIcon} /></div>
                <div className="item-inner">
                  <div className="item-title">TrackerReact</div>
                </div>
              </div>
            </a></li>
            <li><a href="https://webpack.github.io/" target="_blank" className="item-link external">
              <div className="item-content">
                <div className="item-media"><i className={"icon " + style.webpackIcon} /></div>
                <div className="item-inner">
                  <div className="item-title">Webpack</div>
                </div>
              </div>
            </a></li>
            <li><a href="http://meteor.com" className="item-link external">
              <div className="item-content">
                <div className="item-media"><i className={"icon " + style.meteorIcon} /></div>
                <div className="item-inner">
                  <div className="item-title">Meteor</div>
                </div>
              </div>
            </a></li>
          </ul>
        </div>
        <div className="content-block">
          <p>This is a workflow experiment of how to bring a traditional library (F7)
            together with Meteor and React while achieving server side rendering (SSR).
            So far <a href="#" data-panel="right" className="open-panel">it works pretty well</a>.</p>
        </div>
      </div>
    );
  }
}