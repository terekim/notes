import React from 'react';
import {Link} from 'react-router';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }

  onSubmit(e) {
    e.preventDefault();
    let email = this.refs.email.value;
    let password = this.refs.password.value;
    this.props.loginWithPassword({email}, password, (err) => {
      if (err) {
        this.setState({error: 'Unable to login. Verify your credentials.'});
      }
      else {
        this.setState({error: ''});
      }
    })
  }

  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Login</h1>
          {this.state.error? <p>{this.state.error}</p> : undefined}
          <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)}>
            <input type="email" ref="email" name="email" placeholder="Email"/>
            <input type="password" ref="password" name="password" placeholder="Password"/>
            <button className="button">Login</button>
          </form>

          <Link to="/signup">Need an account?</Link>
        </div>
      </div>
    )
  }
}


Login.propTypes = {
  loginWithPassword: PropTypes.func.isRequired
};

export default createContainer(() => {
  return {
    loginWithPassword: Meteor.loginWithPassword
  };
}, Login)
