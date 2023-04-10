class TaskFeedApiService {
  constructor(url) {
    this.url = url;
  }

  async auth(login, password) {
    try {
      const response = await fetch(this.url + ENDPOINTS.auth, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      });

      const result = await response.json();

      return result;
    } catch (err) {
      console.error(err.message);

      return err;
    }
  }

  async getTasks(from = 0, to = 10, status = 0) {
    try {
      const response = await fetch(`${this.url}${ENDPOINTS.tasks}`);

      const result = await response.json();

      return result;
    } catch (err) {
      console.error(err.message);

      return err;
    }
  }

  async getAllUsers() {
    try {
      const response = await fetch(this.url + ENDPOINTS.allUsers);
      const result = await response.json();

      console.log('result: ', result);

      return result;
    } catch (err) {
      console.error(err.message);

      return err;
    }
  }
}
