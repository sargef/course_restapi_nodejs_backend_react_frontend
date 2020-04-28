import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";

import Form from './Form';

// Create initial new user state
export default class UserSignUp extends Component {
  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
    errors: []
  }

  // Render new user details to save
  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
      errors
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            elements={() => (
              <React.Fragment>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={firstName}
                  onChange={this.change}
                  placeholder="First Name" 
                  />
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={lastName}
                  onChange={this.change}
                  placeholder="Last Name" />
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="text"
                  value={emailAddress}
                  onChange={this.change}
                  placeholder="Email Address" />
             
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={this.change}
                  placeholder="Password" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={this.change}
                  placeholder="Confirm Password" />
              </React.Fragment>
            )} />
          <p>
            Already have a user account? <Link to="/signin">Click here</Link> to sign in!
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

  submit = () => {

    const { context } = this.props;
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword
    } = this.state;


    if (password !== confirmPassword) {
      return this.setState({ errors: ['Please confirm your password again.']})
    }

    const user = {
      firstName,
      lastName,
      emailAddress,
      password
    };

    context.data.createUser(user)
       .then(response => {
          if (Array.isArray(response)) {
            this.setState({errors: response[1].error})
          } else {
            context.actions.signIn(emailAddress, password)
              .then(() => {
                Swal.fire({
                  title: 'Welcome',
                  text: 'You can now create new courses! Scroll to the bottom of course page',
                  imageUrl: 'https://media.giphy.com/media/OkJat1YNdoD3W/giphy.gif',
                  imageWidth: 400,
                  imageHeight: 200,
                  imageAlt: 'Custom image',
                })
                this.props.history.push('/');
            });
          }
       })
       .catch((err) => {
         console.log(err);
       });

    }

    cancel = () => {
      this.props.history.push('/');
    }
}