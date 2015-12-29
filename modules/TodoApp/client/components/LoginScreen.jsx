import { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

export default class LoginScreen extends Component {
  static propTypes = {
    user: PropTypes.object,
    loggingIn: PropTypes.bool
  }

  constructor(props, context) {
    super(props);
    this.state = {
      status: this.props.user ? "You are Signed-In" : "Please Sign-In",
      createAccount: false
    }
  }

  handleAuth(e) {
    if(e) {
      e.preventDefault();
    }

    const username = this.refs["username"].value;
    const password = this.refs["password"].value;

    if(this.props.user) {
      // When logged in, log out
      Meteor.logout();
      this.setState({isError: false, status: "You are Signed-Out!"});
    } else {

      if(this.state.createAccount) {
        const passwordConfirm = this.refs["passwordConfirm"].value;

        if(password != passwordConfirm) {
          this.setState({isError: true, status: "Your passwords don't match!"});
        } else {
          Accounts.createUser({username: username, password: password}, (err) => {
            if(err) {
              this.setState({isError: true, status: err.reason});
            } else {
              this.setState({isError: false, createAccount: false, status: "Welcome! You are Signed-In!"});
            }
          });
        }
        ReactDOM.findDOMNode(this.refs["passwordConfirm"]).value = "";

      } else {
        // When logged out, try log in
        Meteor.loginWithPassword(username, password, (err) => {
          if(err) {
            this.setState({isError: true, status: err.reason});
          } else {
            this.setState({isError: false, createAccount: false, status: "Welcome! You are Signed-In!"});
            ReactDOM.findDOMNode(this.refs["username"]).value = "";
            this.props.f7.closeModal();
          }
        });
      }
    }

    ReactDOM.findDOMNode(this.refs["password"]).value = "";
  }

  handleCreateAccount() {
    this.setState({createAccount: !this.state.createAccount});
  }

  render() {
    // Manage sign in button
    let dialog = null;
    if(this.state.createAccount) {
      dialog = this.props.user ? "Sign Out" : "Create & Sign In";
    } else {
      dialog = this.props.user ? "Sign Out" : "Sign In";
    }

    // Reactive loading indicator
    let loading = null;
    if(this.props.loggingIn) {
      loading = (
        <span className="preloader" />
      );
    } else {
      loading = null;
    }

    // Disable login switch when already logged in
    let loginSwitch = null;
    if(this.props.user) {
      loginSwitch = null;
    } else {
      loginSwitch = (
        <a href="#" className=""
           onClick={this.handleCreateAccount.bind(this)}>
          {this.state.createAccount ? "Switch to Login" : "Create Account"}
        </a>
      )
    }

    // Add password confirmation field
    let createAccount = null;
    if(this.state.createAccount){
      createAccount = (
        <li className="item-content">
          <div className="item-inner">
            <div className="item-title label">Confirm</div>
            <div className="item-input">
              <input type="password" ref="passwordConfirm"
                     name="passwordConfirm" placeholder="Please confirm your password" />
            </div>
          </div>
        </li>
      )
    } else {
      createAccount = null;
    }

    // Hide login form when we are signed in
    let loginForm = null;
    if(this.props.user) {
      loginForm = null;
    } else {
      loginForm = (
        <ul>
          <li className="item-content">
            <div className="item-inner">
              <div className="item-title label">Username</div>
              <div className="item-input">
                <input type="text" ref="username"
                       name="username" placeholder="Your username" />
              </div>
            </div>
          </li>
          <li className="item-content">
            <div className="item-inner">
              <div className="item-title label">Password</div>
              <div className="item-input">
                <input type="password" ref="password"
                       name="password" placeholder="Your password" />
              </div>
            </div>
          </li>
          {createAccount}
        </ul>
      )
    }

    return (
      <div className="login-screen" style={{}}>
        <div className="view">
          <div className="page">
            <div className="page-content login-screen-content">
              <div className="login-screen-title">Mobile Kickstart</div>
              <form onSubmit={this.handleAuth.bind(this)} >
                <div className="list-block">
                  {loginForm}
                </div>
                <input type="submit" ref="submit" style={{visibility: "hidden"}} value="Submit" />
                <div className="list-block">
                  <ul>
                    <li style={{padding: "0px 10px 0px 15px"}}>
                      <a href="#"
                         onClick={this.handleAuth.bind(this)}
                         className={"button " + (this.props.user ? "active" : "")}
                      >{dialog}</a>
                    </li>
                  </ul>
                  <div className="list-block-label" style={{color: this.state.isError ? "red" : "" }}>
                    {this.state.status} <br/>
                    {loading} <br/>
                    {loginSwitch}
                  </div>
                  <a href="#" className="item-link list-button close-login-screen">Close</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}