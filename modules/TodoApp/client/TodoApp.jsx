import { Component, PropTypes } from 'react';
import ReactMixin from 'react-mixin';
import Helmet from 'react-helmet';
import F7 from './f7/js/f7';

import LoginScreen from './components/LoginScreen';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';

// Thanks to TrackerReact all our reactive meteor calls render also reactively in react (i.e. user())
@ReactMixin.decorate(TrackerReact)
export default class TodoApp extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired
  };

  constructor(props, context) {
    super(props);
    this.state = {
      f7: null
    }
  }

  user() {
    return Meteor.user();
  }

  loggingIn() {
    if(!Meteor.isServer) {
      return Meteor.loggingIn();
    } else {
      return false;
    }
  }

  handleLoginDialog() {
    if(this.user()) {
      Meteor.logout();
    } else {
      this.state.f7.loginScreen();
    }
  }

  componentDidMount() {
    if(!Meteor.isServer) {
      let app = new F7();
      //this.setState({app: app});

      // Add main View
      let view = app.addView('.view-main', {
        // Enable dynamic Navbar
        dynamicNavbar: true,
        // Enable Dom Cache so we can use all inline pages
        domCache: true
      });

      // Pass instance to state to pass to children.
      // We are anyhow able to always get the instance via new F7()
      this.setState({f7: app});
    }
  }

  render() {
    return (
      <span className="f7-main">
				<Helmet
          title="Touch2S To-Do"
          meta={[
            { name: 'description', content: 'Touch2S Meteor F7 Boilerplate' }
          ]}
        />
        {/* Status bar overlay for fullscreen mode*/}
        <div className="statusbar-overlay"/>
        {/* Panels overlay*/}
        <div className="panel-overlay"/>
        {/* Left panel with reveal effect*/}
        <LeftPanel />
        {/* Right panel with cover effect*/}
        <RightPanel />
        {/* Views*/}
        <div className="views">
          {/* Your main view, should have "view-main" class*/}
          <div className="view view-main">
            {/* Top Navbar*/}
            <div className="navbar">
              {/* Navbar inner for Index page*/}
              <div data-page="index" className="navbar-inner">
                {/* We have home navbar without left link*/}
                <div className="center sliding">Touch2S</div>
                <div className="right">
                  {/* Right link contains only icon - additional "icon-only" class*/}
                  <a href="#" onClick={this.handleLoginDialog.bind(this)} className={"button " + (this.user() ? "active" : "")}>{this.user() ? "Sign Out" : "Sign In"}</a>
                  {/* <a href="#" className="link icon-only open-panel"><i className="icon icon-bars"/></a>*/}
                </div>
              </div>
              {/* Navbar inner for About page*/}
              <div data-page="about" className="navbar-inner cached">
                <div className="left sliding"><a href="#" className="back link"> <i className="icon icon-back"/><span>Back</span></a>
                </div>
                <div className="center sliding">About Us</div>
              </div>
              {/* Navbar inner for Form page*/}
              <div data-page="form" className="navbar-inner cached">
                <div className="left sliding"><a href="#" className="back link"> <i className="icon icon-back"/><span>Back</span></a>
                </div>
                <div className="center sliding">Form</div>
              </div>
            </div>
            {/* Pages, because we need fixed-through navbar and toolbar, it has additional appropriate classes*/}
            <div className="pages navbar-through toolbar-through">
              {/* Index Page*/}
              <div data-page="index" className="page">
                {/* Scrollable page content*/}
                {this.props.children}
              </div>
              {/* About Page*/}
              <div data-page="about" className="page cached">
                <div className="page-content">
                  <div className="content-block">
                    <p>You may go <a href="#" className="back">back</a> or load <a href="#form">Form</a> page.
                    </p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel commodo massa, eu adipiscing
                      mi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                      Phasellus ultricies dictum neque, non varius tortor fermentum at. Curabitur auctor cursus
                      imperdiet. Nam molestie nisi nec est lacinia volutpat in a purus. Maecenas consectetur condimentum
                      viverra. Donec ultricies nec sem vel condimentum. Phasellus eu tincidunt enim, sit amet convallis
                      orci. Vestibulum quis fringilla dolor. </p>
                    <p>Mauris commodo lacus at nisl lacinia, nec facilisis erat rhoncus. Sed eget pharetra nunc. Aenean
                      vitae vehicula massa, sed sagittis ante. Quisque luctus nec velit dictum convallis. Nulla
                      facilisi. Ut sed erat nisi. Donec non dolor massa. Mauris malesuada dolor velit, in suscipit leo
                      consectetur vitae. Duis tempus ligula non eros pretium condimentum. Cras sed dolor odio.</p>
                    <p>Suspendisse commodo adipiscing urna, a aliquet sem egestas in. Sed tincidunt dui a magna
                      facilisis bibendum. Nunc euismod consectetur lorem vitae molestie. Proin mattis tellus libero, non
                      hendrerit neque eleifend ac. Pellentesque interdum velit at lacus consectetur scelerisque et id
                      dui. Praesent non fringilla dui, a elementum purus. Proin vitae lacus libero. Nunc eget lectus non
                      mi iaculis interdum vel a velit. Nullam tincidunt purus id lacus ornare, at elementum turpis
                      euismod. Cras mauris enim, congue eu nisl sit amet, pulvinar semper erat. Suspendisse sed mauris
                      diam.</p>
                    <p>Nam eu mauris leo. Pellentesque aliquam vehicula est, sed lobortis tellus malesuada facilisis.
                      Fusce at hendrerit ligula. Donec eu nibh convallis, pulvinar enim quis, lacinia diam. Ut semper ac
                      magna nec ornare. Integer placerat justo sed nunc suscipit facilisis. Vestibulum ac tincidunt
                      augue. Duis eu aliquet mauris, vel luctus mauris. Nulla non augue nec diam pharetra posuere at in
                      mauris.</p>
                  </div>
                </div>
              </div>
              {/* Form Page*/}
              <div data-page="form" className="page cached">
                <div className="page-content">
                  <div className="content-block-title">Form Example</div>
                  <div className="list-block">
                    <ul>
                      <li>
                        <div className="item-content">
                          <div className="item-media"><i className="icon icon-form-name"/></div>
                          <div className="item-inner">
                            <div className="item-title label">Name</div>
                            <div className="item-input">
                              <input type="text" placeholder="Your name"/>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="item-content">
                          <div className="item-media"><i className="icon icon-form-email"/></div>
                          <div className="item-inner">
                            <div className="item-title label">E-mail</div>
                            <div className="item-input">
                              <input type="email" placeholder="E-mail"/>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="item-content">
                          <div className="item-media"><i className="icon icon-form-url"/></div>
                          <div className="item-inner">
                            <div className="item-title label">URL</div>
                            <div className="item-input">
                              <input type="url" placeholder="URL"/>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="item-content">
                          <div className="item-media"><i className="icon icon-form-password"/></div>
                          <div className="item-inner">
                            <div className="item-title label">Password</div>
                            <div className="item-input">
                              <input type="password" placeholder="Password"/>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="item-content">
                          <div className="item-media"><i className="icon icon-form-tel"/></div>
                          <div className="item-inner">
                            <div className="item-title label">Phone</div>
                            <div className="item-input">
                              <input type="tel" placeholder="Phone"/>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="item-content">
                          <div className="item-media"><i className="icon icon-form-gender"/></div>
                          <div className="item-inner">
                            <div className="item-title label">Gender</div>
                            <div className="item-input">
                              <select>
                                <option>Male</option>
                                <option>Female</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="item-content">
                          <div className="item-media"><i className="icon icon-form-calendar"/></div>
                          <div className="item-inner">
                            <div className="item-title label">Birth date</div>
                            <div className="item-input">
                              <input type="date" placeholder="Birth day" defaultValue="2014-04-30"/>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="item-content">
                          <div className="item-media"><i className="icon icon-form-toggle"/></div>
                          <div className="item-inner">
                            <div className="item-title label">Switch</div>
                            <div className="item-input">
                              <label className="label-switch">
                                <input type="checkbox"/>
                                <div className="checkbox"/>
                              </label>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="item-content">
                          <div className="item-media"><i className="icon icon-form-settings"/></div>
                          <div className="item-inner">
                            <div className="item-title label">Slider</div>
                            <div className="item-input">
                              <div className="range-slider">
                                <input type="range" min={0} max={100} defaultValue={50} step="0.1"/>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="align-top">
                        <div className="item-content">
                          <div className="item-media"><i className="icon icon-form-comment"/></div>
                          <div className="item-inner">
                            <div className="item-title label">Textarea</div>
                            <div className="item-input">
                              <textarea defaultValue={""}/>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="content-block">
                    <div className="row">
                      <div className="col-50"><a href="#" className="button button-big button-fill color-red">Cancel</a>
                      </div>
                      <div className="col-50">
                        <input type="submit" defaultValue="Submit"
                               className="button button-big button-fill color-green"/>
                      </div>
                    </div>
                  </div>
                  <div className="content-block-title">Checkbox group</div>
                  <div className="list-block">
                    <ul>
                      <li>
                        <label className="label-checkbox item-content">
                          <input type="checkbox" name="ks-checkbox" defaultValue="Books" defaultChecked/>
                          <div className="item-media"><i className="icon icon-form-checkbox"/></div>
                          <div className="item-inner">
                            <div className="item-title">Books</div>
                          </div>
                        </label>
                      </li>
                      <li>
                        <label className="label-checkbox item-content">
                          <input type="checkbox" name="ks-checkbox" defaultValue="Movies"/>
                          <div className="item-media"><i className="icon icon-form-checkbox"/></div>
                          <div className="item-inner">
                            <div className="item-title">Movies</div>
                          </div>
                        </label>
                      </li>
                      <li>
                        <label className="label-checkbox item-content">
                          <input type="checkbox" name="ks-checkbox" defaultValue="Food"/>
                          <div className="item-media"><i className="icon icon-form-checkbox"/></div>
                          <div className="item-inner">
                            <div className="item-title">Food</div>
                          </div>
                        </label>
                      </li>
                      <li>
                        <label className="label-checkbox item-content">
                          <input type="checkbox" name="ks-checkbox" defaultValue="Drinks"/>
                          <div className="item-media"><i className="icon icon-form-checkbox"/></div>
                          <div className="item-inner">
                            <div className="item-title">Drinks</div>
                          </div>
                        </label>
                      </li>
                    </ul>
                  </div>
                  <div className="content-block-title">Radio buttons group</div>
                  <div className="list-block">
                    <ul>
                      <li>
                        <label className="label-radio item-content">
                          <input type="radio" name="ks-radio" defaultValue="Books" defaultChecked/>
                          <div className="item-inner">
                            <div className="item-title">Books</div>
                          </div>
                        </label>
                      </li>
                      <li>
                        <label className="label-radio item-content">
                          <input type="radio" name="ks-radio" defaultValue="Movies"/>
                          <div className="item-inner">
                            <div className="item-title">Movies</div>
                          </div>
                        </label>
                      </li>
                      <li>
                        <label className="label-radio item-content">
                          <input type="radio" name="ks-radio" defaultValue="Food"/>
                          <div className="item-inner">
                            <div className="item-title">Food</div>
                          </div>
                        </label>
                      </li>
                      <li>
                        <label className="label-radio item-content">
                          <input type="radio" name="ks-radio" defaultValue="Drinks"/>
                          <div className="item-inner">
                            <div className="item-title">Drinks</div>
                          </div>
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* Bottom Toolbar*/}
            <div className="toolbar">
              <div className="toolbar-inner"><a href="#" data-panel="left" className="link open-panel">Info</a><a
                href="#" data-panel="right" className="link open-panel">Options</a></div>
            </div>
          </div>
        </div>
        <LoginScreen user={this.user()} loggingIn={this.loggingIn()} f7={this.state.f7}/>
			</span>
    );
  }
}
