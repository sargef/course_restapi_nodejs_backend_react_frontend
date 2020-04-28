import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";

import Form from './Form';

// Create validation for usersign in attributes
export default class UserSignIn extends Component {
  state = {
    emailAddress: '',
    password: '',
    errors: []
  }

  render() {
    const {
      emailAddress,
      password,
      errors
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign In"
            elements={() => (
              <React.Fragment>
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="text"
                  value={emailAddress}
                  onChange={this.change}
                  placeholder="Email" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={this.change}
                  placeholder="Password" />
              </React.Fragment>
            )} />
          <p>
            Don't have a user account? <Link to="/signup">Click here</Link> to sign up!
          </p>
        </div>
      </div>
    );
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  // Check authentication and render appropriate success attributes
  submit = () => {
    const { context } = this.props;
    const { emailAddress, password } = this.state;

    context.actions.signIn(emailAddress, password)
      .then((user) => {
        if (user === null) {
          this.setState(() => {
            return { errors: [ 'Sign-in was unsuccessful' ] };
          });
        } else {
          Swal.fire({
            title: 'Welcome back',
            text: 'You can now create new courses!',
            imageUrl: 'https://media.giphy.com/media/l1J9urAfGd3grKV6E/giphy.gif',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
          })
          window.history.back();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  cancel = () => {
    this.props.history.push('/');
  }
}
