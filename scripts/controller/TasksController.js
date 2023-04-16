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
      errorRoot,
      taskFormRoot,
      apiUrl,
    } = params;
    this.data = [];
    this.tasks = [];
    this.users = [];
    this.user = null;
    this.token = null;
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
    this.errorPage = new ErrorView(errorRoot);
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
      const response = await this.api.getTasks();

      if (response.error) {
        throw new Error(response.message);
      }

      this.data = response;

      // this.data = dataTasks;
    } catch (err) {
      this.showErrorPage(err.message);
      console.error(err.message);
    }
  }

  makeTasks(data, user) {
    try {
      this.tasks = user
        ? data.filter(
          (task) => !task.isPrivate
              || user.login === task.assignee.login
              || user.login === task.creator.login,
        )
        : data.filter((task) => !task.isPrivate);

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
      // this.users = dataUsers;
    } catch (err) {
      console.error(err.message);
    }
  }

  initUser() {
    try {
      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      if (user && token && user !== 'undefined' && token !== 'undefined') {
        this.user = JSON.parse(user);
        this.token = token;
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  async start() {
    try {
      await this.fetchUsers();
      await this.fetchTasks();
      this.initUser();

      if (this.user) {
        this.makeTasks(this.data, this.user);
        this.login(this.user, this.token);
        return;
      }

      this.filter.display({ assignees: this.users });
      this.makeTasks(this.data, null);
      this.getFeed();
    } catch (err) {
      console.error(err.message);
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
      this.auth.listenSignUp();
    } catch (err) {
      console.error(err.message);
    }
  }

  async signUp() {
    try {
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

      this.users.push(user); // костыль для работы без бэка

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
      this.auth.listenSignIn();
    } catch (err) {
      console.error(err.message);
    }
  }

  async signIn() {
    try {
      const form = document.getElementById('authForm');
      const { login, password } = form;

      const response = await this.api.auth(login.value, password.value);

      console.log('response: ', response);

      if (response.error) {
        throw new Error(response.message);
      }

      const user = this.getUser(login.value);
      this.login(user, response.token);

      DomHelper.toast('Successful sign in! Please, wait...');

      // formError.classList.add('success');
      // formError.textContent = 'Successful sign in! Please, wait...';
      document.getElementById('authSignIn')?.setAttribute('disabled', '');

      return user;
    } catch (err) {
      const formError = document.getElementById('formError');
      formError.textContent = err.message;

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

      // await this.fetchTasks(this.user);
      this.makeTasks(this.data, this.user);

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
      this.token = null;

      this.header.display();
      this.filter.display({ assignees: this.users });

      DomHelper.toast('Bye!');

      this.makeTasks(this.data, null);

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

  async editUser() {
    try {
      const name = document.getElementById('name').value;
      const newPassword = document.getElementById('newPassword').value;
      const retypedPassword = document.getElementById('confirmPassword').value;
      const defaultPhoto = document.querySelector('input[name="avatar"]:checked');
      const file = document.querySelector('input[type="file"]').files[0];
      let base64photo = '';
      if (file && Object.keys(BASE64_TYPE).some((ext) => file.name.includes(`.${ext}`))) {
        base64photo = await blobToBase64(file);
        console.log('!!!', base64photo);
      }

      const response = await this.api.editUser(
        this.user.id,
        name,
        newPassword,
        retypedPassword,
        base64photo || defaultPhoto?.value || this.user.photo,
      );

      console.log(response);

      if (response.error) {
        throw new Error(response.message);
      }

      DomHelper.toast('Profile was successfully edited!');

      this.user = response;
      localStorage.setItem('user', JSON.stringify(response));
      this.showProfile();
    } catch (err) {
      const error = document.getElementById('confirmPasswordError');
      error.textContent = err.message;
      console.error(err.message);
    }
  }

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

  // feed

  getToDoFeed(
    skip = 0,
    top = this.pagination.toDoTop,
    filterConfig = this.filterController.filterConfig,
  ) {
    const data = this.getPage(skip, top, filterConfig, TASK_STATUS.toDo);
    this.toDoFeed.display({
      user: this.user,
      tasks: data,
    });
    if (data.length >= 10 && data.length < this.toDoTasks.length) {
      this.toDoFeed.root.append(DomHelper.createAddMoreBtn());
    }
    console.log(`Render column ${TASK_STATUS.toDo}`);
  }

  getInProgressFeed(
    skip = 0,
    top = this.pagination.inProgressTop,
    filterConfig = this.filterController.filterConfig,
  ) {
    const data = this.getPage(skip, top, filterConfig, TASK_STATUS.inProgress);
    this.inProgressFeed.display({
      user: this.user,
      tasks: data,
    });
    if (data.length >= 10 && data.length < this.inProgressTasks.length) {
      this.inProgressFeed.root.append(DomHelper.createAddMoreBtn());
    }
    console.log(`Render column ${TASK_STATUS.inProgress}`);
  }

  getCompleteFeed(
    skip = 0,
    top = this.pagination.completeTop,
    filterConfig = this.filterController.filterConfig,
  ) {
    const data = this.getPage(skip, top, filterConfig, TASK_STATUS.complete);
    this.completeFeed.display({
      user: this.user,
      tasks: data,
    });
    if (data.length >= 10 && data.length < this.completeTasks.length) {
      this.completeFeed.root.append(DomHelper.createAddMoreBtn());
    }
    console.log(`Render column ${TASK_STATUS.complete}`);
  }

  getFeed(skip = 0, top = 10, filterConfig = this.filterController.filterConfig) {
    try {
      this.getToDoFeed(skip, top, filterConfig);
      this.getInProgressFeed(skip, top, filterConfig);
      this.getCompleteFeed(skip, top, filterConfig);
    } catch (err) {
      console.error(err.message);
    }
  }

  paginate(btn) {
    try {
      const column = btn.closest('.task-list');

      if (column.id === 'toDoList') {
        app.pagination.toDoTop += 10;
        app.getToDoFeed();
      }

      if (column.id === 'inProgressList') {
        app.pagination.inProgressTop += 10;
        app.getInProgressFeed();
      }

      if (column.id === 'completeList') {
        app.pagination.completeTop += 10;
        app.getCompleteFeed();
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  // task

  async showTask(id) {
    try {
      const task = await this.api.getFullTask(id);
      console.log(task);

      if (task.error) {
        throw new Error(task.message);
      }

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
    try {
      const overlay = this.taskForm.root;
      const { users } = this;

      let task = null;
      if (taskId) {
        task = await this.api.getFullTask(taskId);

        if (task.error) {
          throw new Error(task.message);
        }
      }

      overlay.innerHTML = '';
      overlay.classList.add('active');
      this.taskForm.display(type, task, users);
      this.taskForm.listen();
    } catch (err) {
      console.error(err.message);
    }
  }

  async addTask() {
    try {
      const overlay = document.getElementById('overlay');
      const name = document.getElementById('setTitle').value;
      const description = document.getElementById('setDescription').value;
      const assignee = app.getUserByUserName(document.getElementById('setAssignee').value);
      const priority = document.querySelector('input[name="setPriority"]:checked')?.value;
      const isPrivate = document.querySelector('input[name="setPrivacy"]:checked')?.value === TASK_PRIVACY.private;
      const status = document.querySelector('input[name="setStatus"]:checked')?.value || TASK_STATUS.toDo;
      const errorMessage = document.getElementById('taskFormMsg');

      const response = await app.api.addTask(
        name,
        description,
        assignee.id,
        status,
        priority,
        isPrivate,
      );

      console.log(response);

      if (response.error) {
        throw new Error(response.message);
      }

      DomHelper.toast('Task was successfully added!');

      await this.backToMain();
      overlay.classList.remove('active');
      overlay.innerHTML = '';
    } catch (err) {
      errorMessage.textContent = err.message;
      console.error(err.message);
    }
  }

  async editTask() {
    try {
      const name = document.getElementById('setTitle').value;
      const description = document.getElementById('setDescription').value;
      const assignee = app.getUserByUserName(document.getElementById('setAssignee').value);
      const priority = document.querySelector('input[name="setPriority"]:checked')?.value;
      const isPrivate = document.querySelector('input[name="setPrivacy"]:checked')?.value === TASK_PRIVACY.private;
      const status = document.querySelector('input[name="setStatus"]:checked')?.value || TASK_STATUS.toDo;
      const errorMessage = document.getElementById('taskFormMsg');

      const task = {
        name,
        description,
        assignee,
        status,
        priority,
        isPrivate,
      };

      const taskId = document.getElementById('taskFormHeader').textContent.split(' ').at(-1);

      const response = await app.api.editTask(
        taskId,
        name,
        description,
        assignee.id,
        status,
        priority,
        isPrivate,
      );

      console.log(response);

      if (response.error) {
        throw new Error(response.message);
      }

      DomHelper.toast('Task was successfully edited!');

      if (document.getElementById('fullTask')) {
        await this.showTask(taskId);
        overlay.classList.remove('active');
        overlay.innerHTML = '';
      } else {
        await this.backToMain();
        overlay.classList.remove('active');
        overlay.innerHTML = '';
      }
    } catch (err) {
      errorMessage.textContent = err.message;
      console.error(err.message);
    }
  }

  async deleteTask(id) {
    try {
      const modal = DomHelper.showModal();
      document.body.append(modal);

      document.getElementById('modalConfirm').addEventListener('click', async () => {
        const response = await this.api.deleteTask(id);

        console.log(response);
        if (response.error) {
          throw new Error(response.message);
        }

        await app.backToMain();
        modal.remove();
      });

      document.getElementById('modalCancel').addEventListener('click', () => {
        modal.remove();
      });
    } catch (err) {
      DomHelper.toast(err.message, 'error');
      console.error(err.message);
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

  // other

  async backToMain() {
    try {
      document.getElementById('fullTask')?.remove();
      document.getElementById('profilePage')?.remove();
      document.getElementById('auth')?.remove();
      document.getElementById('menu').classList.remove('undisplayed');
      document.getElementById('board').classList.remove('undisplayed');
      document.getElementById('errorPage')?.remove();

      const user = this.user || null;

      await this.fetchTasks();
      this.getFeed();

      this.header.display({ user });
    } catch (err) {
      console.error(err.message);
    }
  }

  showErrorPage(message) {
    try {
      document.getElementById('fullTask')?.remove();
      document.getElementById('profilePage')?.remove();
      document.getElementById('auth')?.remove();
      document.getElementById('overlay')?.remove();
      document.getElementById('modalOverlay')?.remove();
      document.getElementById('menu')?.classList.add('undisplayed');
      document.getElementById('board')?.classList.add('undisplayed');

      this.header.display({ isErrorPage: true });
      this.errorPage.display(message);
    } catch (err) {
      console.error(err.message);
    }
  }
}
