import React, { Component } from 'react';

import Form from './Form.js';

export default class UpdateCourse extends Component {

  // Call initial state of course properties
  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    userName: '',
    errors: []
  }

  async componentDidMount() {
    const { context } = this.props;
    await context.data.getCourse(this.props.match.params.id)
  
      .then(course => {
        const {
          title,
          description,
          estimatedTime,
          materialsNeeded,
          imagePic
        } = course;

        const userName = `${course.User.firstName} ${course.User.lastName}`

        this.setState({
          title,
          description,
          estimatedTime,
          materialsNeeded,
          imagePic,
          userName,
          course
        })
      });

      if (this.state.course.User.id !== context.authenticatedUser.id) {
        this.props.history.push('/forbidden');
      }
  }

  // Render course details to page
  render() {
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userName,
      errors
    } = this.state;

    return (
      <div className="bounds course--detail">
        <h1>Update Course</h1>
        <div>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Update Course"
            elements={() => (
              <React.Fragment>
              <div className="grid-66">
                <div className="course--header">
                  <input
                    id="title"
                    name="title"
                    className="input-title course--title--input"
                    type="text"
                    value={title}
                    onChange={this.change}
                    placeholder="Course Title..." />
                  <p>by {userName}</p>
                </div>
                <div className="course--description">
                  <textarea
                    id="description"
                    name="description"
                    type="text"
                    value={description}
                    onChange={this.change}
                    placeholder="Course Description..."
                  />
                </div>
                <div className="course--img">
                  <label for="imagePic">Upload Url Image</label>
                  <br/>
                  <br/>
                   <input
                    width="100%" 
                    height="600px"
                    id="image"
                    alt="courseImg"
                    name="imagePic"
                    type="text"
                    onChange={this.change}
                  />
                </div>
           </div>
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                        <input
                        id="estimatedTime"
                        name="estimatedTime"
                        type="text"
                        value={estimatedTime}
                        onChange={this.change}
                        placeholder="Hours"
                        />
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                        <textarea
                          id="materialsNeeded"
                          name="materialsNeeded"
                          type="text"
                          value={materialsNeeded}
                          onChange={this.change}
                          placeholder="Materials Needed..."
                        />
                    </li>
                  </ul>
                </div>
              </div>
              </React.Fragment>
            )}
          />
        </div>
      </div>
    )
  }

  // Update changes to course details
  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  // On submit, verify authenticated user, save unchanged data and render new changed data
  submit = () => {
    const { context } = this.props;
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      imagePic
    } = this.state;
    const {id} = this.state.course;
    const {emailAddress} = context.authenticatedUser;
    const password = context.authenticatedUserPassword;
    const courseInfo = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      imagePic
    }

    context.data.updateCourse(courseInfo, id, {emailAddress, password})
      .then(response => {
        if (Array.isArray(response)) {
          this.setState({errors: response[1].error})
        } else {
          this.props.history.push(`/courses/${id}`);
        }
      }).catch(err =>{
        console.log(err);
      });
  }

  cancel = () => {
    const {id} = this.state.course;
    this.props.history.push(`/courses/${id}`);
  }
}
