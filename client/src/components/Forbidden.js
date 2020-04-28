import React from 'react';

// Create forbidden page when unathorized access page aquired
export default () => (
  <div className="bounds">
    <h1 className="forbidden">Forbidden</h1>
    <br/>
    <p>Oh oh! You can't access this page.</p>
  </div>
);
