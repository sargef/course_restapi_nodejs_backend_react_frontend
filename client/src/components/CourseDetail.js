import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import StarRating from './StarRating';

// Create initial state of course details page
export default class CourseDetail extends Component {
  state = {
    course: [],
    userName: '',
    authorizedUser: false
  }

  // Authenticate user to determine if this user can update or delete course assets. If authenticed, show authenticated user buttons.
  async componentDidMount() {
    const { context } = this.props;

    await context.data.getCourse(this.props.match.params.id)
    .then(response => {
      if (context.authenticatedUser != null) {
        if (context.authenticatedUser.id  === response.User.id) {
          this.setState({
            authorizedUser: true
          });
        } else {
          this.setState({
            authorizedUser: false
          });
        }
      }

      this.setState({
        course: response,
        userName: `${response.User.firstName} ${response.User.lastName}`
      })
    })
  }

  render() {

    const { context } = this.props;
    let { course, userName, authorizedUser } = this.state;
    let emailAddress;
    let password;

    if (authorizedUser) {
      emailAddress = context.authenticatedUser.emailAddress
      password = context.authenticatedUserPassword
    }
    return (
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
              {authorizedUser ?
                <span>
                  <Link
                    className="button"
                    to={`/courses/${this.props.match.params.id}/update`}
                  >
                    Update Course
                  </Link>
                  <button
                    className="button"
                    onClick={()=>context.data.deleteCourse(course.id, {emailAddress, password})
                      .then(()=> this.props.history.push('/'))}>
                    Delete Course
                  </button>
                </span>
              :
                <span></span>
              }
               <Link
                 className="button button-secondary"
                 to="/">Return to List
               </Link>
            </div>
          </div>
      </div>
      <div className="bounds course--detail">
        <div className="grid-66">
          <div className="course--header">
            <h3 className="course--title">{course.title}</h3>
            <p>By {userName}</p>
          </div>
          <div className="course--img">
          <img src={course.imagePic || 'https://alexadreamachiever.s3-eu-west-1.amazonaws.com/website/learntocode.jpeg'} 
              width="70%" 
              height="50%"
              alt="courseImg"
              className="course--img--imagePic"
              overflow="no-overflow"
              />
              <br/>
            <br/>
          </div>
          <br/>
        <div className="course--description">
          <ReactMarkdown source={course.description} />
        </div>
      </div>
      <div className="grid-25 grid-right">
        <div className="course--stats">
          <ul className="course--stats--list">
          <li className="course--stats--list--item">
            <StarRating totalStars={5}/>
          </li>
            <li className="course--stats--list--item">
              <h4>Estimated Time</h4>
              <h3>{course.estimatedTime}</h3>
            </li>
            <li className="course--stats--list--item">
              <h4>Materials Needed</h4>
           <ul>
             <ReactMarkdown source={course.materialsNeeded} />
           </ul>
            </li>
           </ul>
          </div>
         </div>
        </div>
      </div>
    );
  }
}


