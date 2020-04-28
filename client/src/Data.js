import config from './config';

export default class Data {

  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };
    if (body !== null) {
      options.body = JSON.stringify(body);
    }
    if (requiresAuth) {
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }

  async getUser(emailAddress, password) {
    const response = await this.api('/users', 'GET', null, true, {emailAddress, password});
    if (response.status === 200) {
      return response.json().then(data => data);
    } else if (response.status === 401) {
      return null;
    } else if (response.status === 500) {
      window.location.href = '/error';
    } else {
      window.location.href = '/error';
    }
  }

  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return null;
    } else if (response.status === 400) {
      const errors = await response.json();
      return [response.status, errors];
    } else if (response.status === 500) {
      window.location.href = '/error';
    } else {
      window.location.href = '/error';
    }
  }

  async getCourses(){
    const response = await this.api('/courses', 'GET', null);
    if (response.status === 200) {
      return response.json().then(data => data);
    } else if (response.status === 500) {
      window.location.href = '/error';
    } else {
      window.location.href = '/error';
    }
  }

  async getCourse(id) {
    const response = await this.api(`/courses/${id}`, 'GET', null);
    if (response.status === 200) {
      return response.json();
    } else if (response.status === 404) {
      window.location.href = '/notfound';
    } else if (response.status === 500) {
      window.location.href = '/error';
    } else {
      window.location.href = '/error';
    }
  }

  async createCourse(course, {emailAddress, password}) {
    const response = await this.api('/courses/', 'POST', course, true, {emailAddress, password});
    if (response.status === 201) {
      return null;
    } else if (response.status === 400) {
      const errors = await response.json();
      return [response.status, errors];
    } else if (response.status === 500) {
      window.location.href = '/error';
    } else {
      window.location.href = '/error';
    }
  }

  async updateCourse(course, id, {emailAddress, password}) {
    const response = await this.api(`/courses/${id}`, 'PUT', course, true, {emailAddress, password});
    if (response.status === 204) {
      return null;
    } else if (response.status === 400) {
      const errors = await response.json();
      return [response.status, errors];
    } else if (response.status === 500) {
      window.location.href = '/error';
    } else {
      window.location.href = '/error';
    }
  }

  async deleteCourse(id, {emailAddress, password}) {
    const response = await this.api(`/courses/${id}`, 'DELETE', null, true, {emailAddress, password});
    if (response.status === 204) {
      return null;
    } else if (response.status === 500) {
      window.location.href = '/error';
    } else {
      window.location.href = '/error';
    }
  }
}
