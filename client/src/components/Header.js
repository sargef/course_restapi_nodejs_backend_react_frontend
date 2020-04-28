import React from 'react';
import { NavLink } from 'react-router-dom';

// Retrieve authentication for user and create login, logout and signup states within nav bar.
const Header = (props) => {

  const { context } = props;
  const authUser = context.authenticatedUser;

  return (
    <div className="header">
      <div className="bounds">
        <h1 className="header--logo"><NavLink to="/">Courses Menu</NavLink></h1>
        <nav>
          {authUser ? (
            <React.Fragment>
              <span>Welcome, {authUser.firstName} {authUser.lastName}!</span>
              <NavLink className="signout" to="/signout">Sign Out</NavLink>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <NavLink className="signup" to={{
                pathname:'/signup',
                state: { from: props.location }
              }}>Sign Up</NavLink>
              <NavLink className="signin" to={{
                pathname:'/signin',
                state: { from: props.location }
              }}>Sign In</NavLink>
            </React.Fragment>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Header;
