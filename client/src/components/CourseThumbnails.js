import React from 'react';
import { Link } from 'react-router-dom';

// Prepare course thumbnails content
const CourseThumbnails = (props) => {
  return(
    <div className="grid-33">
      <Link className="course--module course--link" to={`/courses/${props.id}`}>
        <h3 className="course--label">Course</h3>
        <h3 className="course--title">{props.title}</h3>
        <br/>
        {/* eslint-disable-next-line react/jsx-no-target-blank */}
        <button href="#" id="neon">
        {/* eslint-enable react/jsx-no-target-blank */}
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Click to find out more... 
        </button>
        <br/>
        <br/>
          <img src={props.imagePic || 'https://alexadreamachiever.s3-eu-west-1.amazonaws.com/website/learntocode.jpeg'}
              width="100%" 
              height="170px"
              position="center"
              alt="courseImg"
              className="imagePic"
              overflow="no-overflow"
              />
      </Link>
    </div>
  );
}

export default CourseThumbnails;

