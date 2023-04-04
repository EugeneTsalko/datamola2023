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
    } = params;
    this.tasks = new TaskCollection();
    this.users = new UserCollection();
    this.header = new HeaderView(headerRoot);
    this.filter = new FilterView(filterRoot);
    this.toDoFeed = new TaskFeedView(toDoRoot);
    this.inProgressFeed = new TaskFeedView(inProgressRoot);
    this.completeFeed = new TaskFeedView(completeRoot);
    this.fullTask = new TaskView(fullTaskRoot);
    this.profile = new ProfileView(profileRoot);
    this.auth = new AuthorizationView(authRoot);
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

  signUp() {
    try {
      const user = this.auth.validateSignUp();

      if (!user) {
        throw new Error('Something went wrong in Sign Up.');
      }

      return user;
    } catch (err) {
      console.error(err.message);

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

  signIn() {
    try {
      const user = this.auth.validateSignIn();

      if (!user) {
        throw new Error('Something went wrong in Sign In.');
      }

      this.login(user.login);

      return user;
    } catch (err) {
      console.error(err.message);

      return null;
    }
  }

  login(login) {
    localStorage.setItem('user', login);

    this.tasks.user = login;
    this.header.display({ user: login });
    this.filter.display({ user: this.tasks.user, assignees: this.tasks.assignees });

    this.getFeed();
  }

  logOut() {
    try {
      if (!this.tasks.user) {
        throw new Error('Before log out you need to Sign In.');
      }

      document.getElementById('fullTask')?.remove();
      document.getElementById('profilePage')?.remove();
      document.getElementById('menu').classList.remove('undisplayed');
      document.getElementById('board').classList.remove('undisplayed');
      localStorage.removeItem('user');

      this.tasks.logOut();

      this.header.display();
      this.filter.display({ assignees: this.assignees });

      this.getFeed();
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

  //

  getToDoFeed(skip = 0, top = 10, filterConfig = null) {
    this.toDoFeed.display({
      user: this.tasks.user,
      tasks: this.tasks.getPage(skip, top, filterConfig, TASK_STATUS.toDo),
    });
    console.log(`Render column ${TASK_STATUS.toDo}`);
  }

  getInProgressTaskFeed(skip = 0, top = 10, filterConfig = null) {
    this.inProgressFeed.display({
      user: this.tasks.user,
      tasks: this.tasks.getPage(skip, top, filterConfig, TASK_STATUS.inProgress),
    });
    console.log(`Render column ${TASK_STATUS.inProgress}`);
  }

  getCompleteTaskFeed(skip = 0, top = 10, filterConfig = null) {
    this.completeFeed.display({
      user: this.tasks.user,
      tasks: this.tasks.getPage(skip, top, filterConfig, TASK_STATUS.complete),
    });
    console.log(`Render column ${TASK_STATUS.complete}`);
  }

  getFeed(skip = 0, top = 10, filterConfig = null) {
    try {
      this.getToDoFeed(skip, top, filterConfig);
      this.getInProgressTaskFeed(skip, top, filterConfig);
      this.getCompleteTaskFeed(skip, top, filterConfig);
    } catch (err) {
      console.error(err.message);
    }
  }

  //

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

  showTask(id) {
    try {
      const task = this.tasks.get(id);

      if (!task || !this.tasks.user) {
        throw new Error('Task page can`t be shown.');
      }

      document.getElementById('fullTask')?.remove();
      document.getElementById('menu').classList.add('undisplayed');
      document.getElementById('board').classList.add('undisplayed');

      this.header.display({ user: this.tasks.user, isTaskPage: true });
      this.fullTask.display(task, this.tasks.user);
    } catch (err) {
      console.error(err.message);
    }
  }

  backToMain() {
    try {
      document.getElementById('fullTask')?.remove();
      document.getElementById('profilePage')?.remove();
      document.getElementById('auth')?.remove();
      document.getElementById('menu').classList.remove('undisplayed');
      document.getElementById('board').classList.remove('undisplayed');

      this.header.display({ user: this.tasks.user });
    } catch (err) {
      console.error(err.message);
    }
  }

  showProfile(type) {
    try {
      const user = this.users.get(this.tasks.user);

      if (!user) {
        throw new Error('Profile page can`t be shown.');
      }

      document.getElementById('profilePage')?.remove();
      document.getElementById('menu').classList.add('undisplayed');
      document.getElementById('board').classList.add('undisplayed');

      this.header.display({ user: this.tasks.user, isProfilePage: true });
      this.profile.display(user, type);
    } catch (err) {
      console.error(err.message);
    }
  }
  //

  // addComment() {
  //   try {
  //     const form = document.getElementById('commentForm');
  //     const text = document.getElementById('newComment').value;
  //     const id = document.querySelector('.full-task-card').id.split('-').at(-1);

  //     form.addEventListener('submit', (event) => {
  //       event.preventDefault();
  //       if (text) {
  //         this.tasks.addComment(id, text);
  //       }
  //     });
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // }
}
