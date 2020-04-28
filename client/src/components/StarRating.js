import React, { useState } from 'react';

// Create star variable and set initial state
const Star = ({ selected = false, onClick = f => f }) => (
  <div className={selected ? "star selected" : "star"} onClick={onClick} />
);

const StarRating = ({ totalStars }) => {

// Return changed state of star rating based on the amount selected.
  const [starsSelected, selectStar] = useState(0);
  return (
    <div className="star-rating">
      {[...Array(totalStars)].map((n, i) => (
        <Star
          key={i}
          selected={i < starsSelected}
          onClick={() => selectStar(i + 1)}
        />
      ))}
      <p>
      <br/>
        {starsSelected} star rating of {totalStars}
      </p>
    </div>
  );
};

export default StarRating;