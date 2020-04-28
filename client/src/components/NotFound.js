import React from 'react';

// Render not found 404 error page
export default () => (
  <div className="bounds">
    <h1 className="not-found">Not Found</h1>
    <br/>
    <p>Sorry! We couldn't find the page you're looking for.</p>
    <br/>
    <img src="https://media.giphy.com/media/YyKPbc5OOTSQE/giphy.gif" alt="not-found" className="notfound-image"></img>
  </div>
);
