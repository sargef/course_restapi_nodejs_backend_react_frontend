import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import CourseThumbnails from './CourseThumbnails';

// Set state of courses
export default class Courses extends Component {

  constructor() {
    super();
    this.state = {
      courses: [],
      search: ""
    };
  }

  // Search function for filtering results via search bar
  onSearchChange = e => {
    this.setState({ search: e.target.value.substr(0, 20)});
}

  componentDidMount(){
    const { context } = this.props;
    context.data.getCourses()
    .then(courses => {
      this.setState({
        courses
      })
    })
  };

// Render Search function to page
  render(){
    let filteredCourses = this.state.courses.filter(
      (course) => {
        return course.title.toLowerCase().indexOf(
          this.state.search.toLowerCase()) !== -1;
      }
    );
    if(filteredCourses.length !== 0) {
      return(
        <div className="bounds">
        <div>
        <input type="text"
        value={this.state.search}
        placeholder="Search Courses....."
        className="search"
        onChange={this.onSearchChange.bind(this)}/>
          </div>
          <br/>
          <br/>
          <ul>
          {filteredCourses.map((course)=>
            <CourseThumbnails
              title={course.title}
              imagePic={course.imagePic}
              key={course.id}
              id={course.id}
            />
          )}
        </ul>
          <div className="grid-33">
            <Link className="course--module course--add--module" to="/courses/create">
              <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 13 13" className="add">
                  <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                </svg>New Course</h3>
            </Link>
          </div>
        </div>
      )
    } else {
      return(
        <div className="bounds">
        <div>
        <input type="text"
        value={this.state.search}
        placeholder="Search Courses....."
        className="search"
        onChange={this.onSearchChange.bind(this)}/>
          </div>
          <br/>
          <div className="noResults">No Results</div>
          <br/>
          <br/>
          <ul>
          {filteredCourses.map((course)=>
            <CourseThumbnails
              title={course.title}
              imagePic={course.imagePic}
              key={course.id}
              id={course.id}
            />
          )}
        </ul>
          <div className="grid-33">
            <Link className="course--module course--add--module" to="/courses/create">
              <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 13 13" className="add">
                  <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                </svg>New Course</h3>
            </Link>
          </div>
        </div>
      )
    }
  }
}
