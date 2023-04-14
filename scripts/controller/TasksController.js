class TasksController {
  constructor(params) {
    const {
      headerRoot,
      filterRoot,
      toDoRoot,
      inProgressRoot,
      completeRoot,
      fullTaskRoot,
      profileRoot,
      authRoot,
      taskFormRoot,
      apiUrl,
    } = params;
    this.tasks = [];
    this.users = [];
    this.user = null;
    this.header = new HeaderView(headerRoot);
    this.filter = new FilterView(filterRoot);
    this.filterController = new FilterController();
    this.filterController.listen();
    this.toDoFeed = new TaskFeedView(toDoRoot);
    this.inProgressFeed = new TaskFeedView(inProgressRoot);
    this.completeFeed = new TaskFeedView(completeRoot);
    this.fullTask = new TaskView(fullTaskRoot);
    this.profile = new ProfileView(profileRoot);
    this.auth = new AuthorizationView(authRoot);
    this.taskForm = new TaskFormView(taskFormRoot);
    this.api = new TaskFeedApiService(apiUrl);
    this.pagination = {
      toDoTop: 10,
      inProgressTop: 10,
      completeTop: 10,
    };
  }

  // start

  async fetchTasks() {
    try {
      this.tasks = await this.api.getTasks();

      this.toDoTasks = this.tasks.filter((task) => task.status === TASK_STATUS.toDo);
      this.inProgressTasks = this.tasks.filter((task) => task.status === TASK_STATUS.inProgress);
      this.completeTasks = this.tasks.filter((task) => task.status === TASK_STATUS.complete);
    } catch (err) {
      console.error(err.message);
    }
  }

  async fetchUsers() {
    try {
      this.users = await this.api.getAllUsers();
    } catch (err) {
      console.error(err.message);
    }
  }

  async start() {
    await this.fetchUsers();
    await this.fetchTasks();

    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (user && token) {
      this.user = JSON.parse(user);
      this.login(this.user, token);
    } else {
      this.filter.display({ assignees: this.users });
      this.getFeed();
    }
  }

  // auth

  showSignUp() {
    try {
      document.getElementById('menu').classList.add('undisplayed');
      document.getElementById('board').classList.add('undisplayed');
      document.getElementById('auth')?.remove();
      document.getElementById('profilePage')?.remove();

      this.header.display({ isAuth: true });
      this.auth.display(AUTH_TYPE.signUp);
    } catch (err) {
      console.error(err.message);
    }
  }

  async signUp() {
    try {
      // const user = this.auth.validateSignUp();

      // if (!user) {
      //   throw new Error('Something went wrong in Sign Up.');
      // }

      // return user;

      this.auth.listen();
      const form = document.getElementById('authForm');
      const {
        name, login, password, passwordConfirm,
      } = form;
      const photo = document.querySelector('input[name="avatar"]:checked')?.value || STANDARD_IMG.anon;
      const formError = document.getElementById('formError');

      const user = await this.api.register(
        login.value,
        name.value,
        password.value,
        passwordConfirm.value,
        photo,
      );

      if (user.error) {
        throw new Error(user.message);
      }

      formError.classList.add('success');
      formError.textContent = 'Successful registration! Please, wait...';
      document.getElementById('authSignUp')?.setAttribute('disabled', '');

      return user;
    } catch (err) {
      formError.textContent = err.message;

      return null;
    }
  }

  showSignIn() {
    try {
      document.getElementById('menu').classList.add('undisplayed');
      document.getElementById('board').classList.add('undisplayed');
      document.getElementById('auth')?.remove();
      document.getElementById('profilePage')?.remove();

      this.header.display({ isAuth: true });
      this.auth.display(AUTH_TYPE.signIn);
    } catch (err) {
      console.error(err.message);
    }
  }

  async signIn() {
    try {
      const user = this.auth.validateSignIn();
      console.log(user);

      if (!user) {
        throw new Error('Something went wrong in Sign In.');
      }

      const form = document.getElementById('authForm');
      const { login, password } = form;

      const response = await this.api.auth(login.value, password.value);
      console.log(response);

      if (response?.statusCode) {
        throw new Error(response?.message);
      }

      this.login(user, response.token);

      return user;
    } catch (err) {
      const passwordError = document.getElementById('passwordError');
      passwordError.textContent = err.message;
      console.error(err.message);

      return null;
    }
  }

  login(user, token) {
    try {
      this.user = user;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);

      this.header.display({ user: this.user });
      this.filter.display({ user: this.user, assignees: this.users });

      this.getFeed();
    } catch (err) {
      console.log(err.message);
    }
  }

  logOut() {
    try {
      if (!this.user) {
        throw new Error('Before log out you need to Sign In.');
      }

      document.getElementById('fullTask')?.remove();
      document.getElementById('profilePage')?.remove();
      document.getElementById('menu').classList.remove('undisplayed');
      document.getElementById('board').classList.remove('undisplayed');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.user = null;

      this.header.display();
      this.filter.display({ assignees: this.users });

      this.getFeed();
    } catch (err) {
      console.error(err.message);
    }
  }

  // user

  showProfile(type) {
    try {
      const { user } = this;

      if (!user) {
        throw new Error('Profile page can`t be shown.');
      }

      document.getElementById('profilePage')?.remove();
      document.getElementById('menu').classList.add('undisplayed');
      document.getElementById('board').classList.add('undisplayed');

      this.header.display({ user: this.user, isProfilePage: true });
      this.profile.display(user, type);
    } catch (err) {
      console.error(err.message);
    }
  }

  editUser(name, image, password) {
    try {
      if (!this.users.edit(this.tasks.user, name, image, password)) {
        throw new Error('Can`t edit user.');
      }

      return true;
    } catch (err) {
      console.error(err.message);

      return false;
    }
  }

  // feed

  getToDoFeed(
    skip = 0,
    top = this.pagination.toDoTop,
    filterConfig = this.filterController.filterConfig,
  ) {
    this.toDoFeed.display({
      user: this.user,
      tasks: this.getPage(skip, top, filterConfig, TASK_STATUS.toDo),
    });
    console.log(`Render column ${TASK_STATUS.toDo}`);
  }

  getInProgressFeed(
    skip = 0,
    top = this.pagination.inProgressTop,
    filterConfig = this.filterController.filterConfig,
  ) {
    this.inProgressFeed.display({
      user: this.user,
      tasks: this.getPage(skip, top, filterConfig, TASK_STATUS.inProgress),
    });
    console.log(`Render column ${TASK_STATUS.inProgress}`);
  }

  getCompleteFeed(
    skip = 0,
    top = this.pagination.completeTop,
    filterConfig = this.filterController.filterConfig,
  ) {
    this.completeFeed.display({
      user: this.user,
      tasks: this.getPage(skip, top, filterConfig, TASK_STATUS.complete),
    });
    console.log(`Render column ${TASK_STATUS.complete}`);
  }

  getFeed(skip = 0, top = 10, filterConfig = this.filterController.filterConfig) {
    try {
      this.getToDoFeed(skip, top, filterConfig);
      this.getInProgressFeed(skip, top, filterConfig);
      this.getCompleteFeed(skip, top, filterConfig);

      console.log('getfeed');
    } catch (err) {
      console.error(err.message);
    }
  }

  // task

  async showTask(id) {
    try {
      const task = await this.api.getFullTask(id);
      console.log(task);

      if (!task || !this.user) {
        throw new Error('Task page can`t be shown.');
      }

      document.getElementById('fullTask')?.remove();
      document.getElementById('menu').classList.add('undisplayed');
      document.getElementById('board').classList.add('undisplayed');

      this.header.display({ user: this.user, isTaskPage: true });
      this.fullTask.display(task, this.user);
      this.fullTask.listen();
    } catch (err) {
      console.error(err.message);
    }
  }

  async showTaskForm(type, taskId) {
    const overlay = this.taskForm.root;
    const { users } = this;

    let task = null;
    if (taskId) {
      task = await this.api.getFullTask(taskId);
    }

    overlay.innerHTML = '';
    overlay.classList.add('active');
    this.taskForm.display(type, task, users);
  }

  addTask(task) {
    try {
      if (!checkIsObj(task)) {
        throw new Error(getCustomError.invalidObjParam('task', 'TasksController.addTask'));
      }

      const {
        name, description, status, priority, isPrivate,
      } = task;

      if (!this.tasks.add(name, description, status, priority, isPrivate)) {
        throw new Error('Task wasn`t added.');
      }

      DomHelper.reRenderTaskColumn(status);

      return true;
    } catch (err) {
      console.error(err.message);

      return false;
    }
  }

  editTask(id, task) {
    try {
      if (!checkStr(id)) {
        throw new Error(getCustomError.invalidId('TasksController.editTask'));
      }

      if (!checkIsObj(task)) {
        throw new Error(getCustomError.invalidObjParam('task', 'TasksController.editTask'));
      }

      const {
        name, description, assignee, status, priority, isPrivate,
      } = task;
      const oldTask = this.tasks.get(id);

      if (!this.tasks.edit(id, name, description, assignee, status, priority, isPrivate)) {
        throw new Error('Task wasn`t edited.');
      }

      if (oldTask.status === status) {
        DomHelper.reRenderTaskColumn(status);
      } else {
        DomHelper.reRenderTaskColumn(oldTask.status);
        DomHelper.reRenderTaskColumn(status);
      }

      return true;
    } catch (err) {
      console.error(err.message);

      return false;
    }
  }

  removeTask(id) {
    try {
      const task = this.tasks.get(id);

      if (!this.tasks.remove(id)) {
        throw new Error('Task wasn`t removed.');
      }

      DomHelper.reRenderTaskColumn(task.status);

      return true;
    } catch (err) {
      console.error(err.message);

      return false;
    }
  }

  // other

  async backToMain() {
    try {
      document.getElementById('fullTask')?.remove();
      document.getElementById('profilePage')?.remove();
      document.getElementById('auth')?.remove();
      document.getElementById('menu').classList.remove('undisplayed');
      document.getElementById('board').classList.remove('undisplayed');

      const user = this.user || null;

      await this.fetchTasks();
      this.getFeed();

      this.header.display({ user });
    } catch (err) {
      console.error(err.message);
    }
  }

  // other

  getUser(login) {
    try {
      const user = this.users.find((elem) => elem.login === login);

      return user;
    } catch (err) {
      console.error(err.message);

      return null;
    }
  }

  getUserByUserName(userName) {
    try {
      const user = this.users.find((elem) => elem.userName === userName);

      return user;
    } catch (err) {
      console.error(err.message);

      return null;
    }
  }

  getPage(skip = 0, top = 10, filterConfig = null, type = null) {
    try {
      if (skip < 0 || top < 0 || !Number.isInteger(skip) || !Number.isInteger(top)) {
        throw new Error(
          getCustomError.invalidIntegerParam('skip and top', 'TaskCollection.getPage'),
        );
      }

      if (filterConfig && !checkIsObj(filterConfig)) {
        throw new Error(getCustomError.invalidObjParam('filterConfig', 'TaskCollection.getPage'));
      }

      let result = structuredClone(this.tasks);

      if (type) {
        switch (type) {
          case TASK_STATUS.toDo:
            result = structuredClone(this.toDoTasks);
            break;
          case TASK_STATUS.inProgress:
            result = structuredClone(this.inProgressTasks);
            break;

          case TASK_STATUS.complete:
            result = structuredClone(this.completeTasks);
            break;

          default:
            break;
        }
      }

      result.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));

      if (filterConfig) {
        const keys = Object.keys(filterConfig);
        keys.forEach((key) => {
          result = result.filter((task) => {
            if (key === 'dateFrom') {
              return Date.parse(task.createdAt) >= Date.parse(filterConfig[key]);
            }
            if (key === 'dateTo') {
              return Date.parse(task.createdAt) <= Date.parse(filterConfig[key]) + 86400000;
            }
            if (key === 'isPrivate') {
              return filterConfig[key] === task.isPrivate;
            }
            if (key === 'description') {
              return (
                task.description.toLowerCase().includes(filterConfig[key].toLowerCase())
                || task.name.toLowerCase().includes(filterConfig[key].toLowerCase())
              );
            }
            if (key === 'assignee') {
              return filterConfig[key].includes(task[key].userName);
            }
            return filterConfig[key].includes(task[key]);
          });
        });
      }

      result = result.splice(skip, top);

      if (!result.length) {
        console.log('Nothing was found for your request.');
      }

      return result;
    } catch (err) {
      console.error(err.message);

      return null;
    }
  }
}
