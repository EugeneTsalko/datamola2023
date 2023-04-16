class TaskFeedApiService {
  constructor(url) {
    this.url = url;
  }

  async auth(login, password) {
    try {
      const response = await fetch(`${this.url}/${ENDPOINTS.auth}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      });

      const result = await response.json();

      console.log(response);

      if (!response.ok) {
        return new CustomError(result.status, result.message);
      }

      return result;
    } catch (err) {
      console.error(err.message);

      return err;
    }
  }

  async getTasks(from = 0, to = 10, status = API_STATUS.all) {
    try {
      const response = await fetch(
        `${this.url}/${ENDPOINTS.tasks}?skip=${from}&top=${to}&status=${status}`,
      );

      const result = await response.json();

      if (!response.ok) {
        return new CustomError(result.status, result.message);
      }

      return result;
    } catch (err) {
      console.error(err.message);

      return err;
    }
  }

  async addTask(name, description, assignee, status, priority, isPrivate) {
    try {
      const task = {
        name,
        description,
        assignee,
        status,
        priority,
        isPrivate,
      };
      const response = await fetch(`${this.url}/${ENDPOINTS.tasks}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(task),
      });

      const result = await response.json();

      if (!response.ok) {
        return new CustomError(result.status, result.message);
      }

      return result;
    } catch (err) {
      console.error(err.message);

      return err;
    }
  }

  async editTask(taskId, name, description, assignee, status, priority, isPrivate) {
    try {
      const task = {
        name,
        description,
        assignee,
        status,
        priority,
        isPrivate,
      };
      const response = await fetch(`${this.url}/${ENDPOINTS.editTask(taskId)}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(task),
      });

      const result = await response.json();

      if (!response.ok) {
        return new CustomError(result.status, result.message);
      }

      return result;
    } catch (err) {
      console.error(err.message);

      return err;
    }
  }

  async deleteTask(taskId) {
    try {
      const response = await fetch(`${this.url}/${ENDPOINTS.editTask(taskId)}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        return new CustomError(result.status, result.message);
      }

      return result;
    } catch (err) {
      console.error(err.message);

      return err;
    }
  }

  async getFullTask(taskId) {
    try {
      const response = await fetch(`${this.url}/${ENDPOINTS.editTask(taskId)}`);
      const result = await response.json();

      if (!response.ok) {
        return new CustomError(result.status, result.message);
      }

      return result;
    } catch (err) {
      console.error(err.message);

      return err;
    }
  }

  async getСomments(taskId) {
    try {
      const response = await fetch(`${this.url}/${ENDPOINTS.comments(taskId)}`);
      const result = await response.json();

      if (!response.ok) {
        return new CustomError(result.status, result.message);
      }

      return result;
    } catch (err) {
      console.error(err.message);

      return err;
    }
  }

  async addComment(taskId, text) {
    try {
      const response = await fetch(`${this.url}/${ENDPOINTS.comments(taskId)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ text }),
      });

      const result = await response.json();

      if (!response.ok) {
        return new CustomError(result.status, result.message);
      }

      return result;
    } catch (err) {
      console.error(err.message);

      return err;
    }
  }

  async getAllUsers() {
    try {
      const response = await fetch(`${this.url}/${ENDPOINTS.allUsers}`);
      const result = await response.json();

      if (!response.ok) {
        return new CustomError(result.status, result.message);
      }

      return result;
    } catch (err) {
      console.error(err.message);

      return err;
    }
  }

  async getMyProfile() {
    try {
      const response = await fetch(`${this.url}/${ENDPOINTS.myProfile}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const result = await response.json();

      if (!response.ok) {
        return new CustomError(result.status, result.message);
      }

      return result;
    } catch (err) {
      console.error(err.message);

      return err;
    }
  }

  async register(login, userName, password, retypedPassword, photo) {
    try {
      const user = {
        login,
        userName,
        password,
        retypedPassword,
        photo,
      };
      const response = await fetch(`${this.url}/${ENDPOINTS.register}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const result = await response.json();

      if (!response.ok) {
        return new CustomError(result.status, result.message);
      }

      return result;
    } catch (err) {
      console.error(err.message);

      return err;
    }
  }

  async editUser(userId, userName, password, retypedPassword, photo) {
    try {
      const user = {
        userName,
        password,
        retypedPassword,
        photo,
      };
      const response = await fetch(`${this.url}/${ENDPOINTS.editUser(userId)}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(user),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(`Oops... ${result.message}.`);
      }

      return result;
    } catch (err) {
      console.error(err.message);

      return err;
    }
  }

  async deleteUser(userId) {
    try {
      const response = await fetch(`${this.url}/${ENDPOINTS.editUser(userId)}`, {
        method: 'Delete',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        return new CustomError(result.status, result.message);
      }

      return result;
    } catch (err) {
      console.error(err.message);

      return err;
    }
  }
}
