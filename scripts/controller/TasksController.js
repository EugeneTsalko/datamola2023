class TasksController {
  constructor(params) {
    const {
      tasksArr,
      usersArr,
      headerRoot,
      filterRoot,
      toDoRoot,
      inProgressRoot,
      completeRoot,
      fullTaskRoot,
    } = params;
    this.tasks = new TaskCollection(tasksArr);
    this.users = new UserCollection(usersArr);
    this.header = new HeaderView(headerRoot);
    this.filter = new FilterView(filterRoot);
    this.toDoFeed = new TaskFeedView(toDoRoot);
    this.inProgressFeed = new TaskFeedView(inProgressRoot);
    this.completeFeed = new TaskFeedView(completeRoot);
    this.fullTask = new TaskView(fullTaskRoot);
  }

  login(user) {
    try {
      if (!checkIsLoginValid(user)) {
        throw new Error(getCustomError.invalidLogin('setCurrentUser'));
      }

      this.tasks.user = user;
      this.header.display({ user });
      this.filter.display({ user, assignees: this.tasks.assignees });

      this.getFeed();
    } catch (err) {
      console.error(err.message);
    }
  }

  logOut() {
    try {
      if (!this.tasks.user) {
        throw new Error('Before log out you need to Sign In.');
      }

      document.getElementById('fullTask')?.remove();
      document.getElementById('menu').classList.remove('undisplayed');
      document.getElementById('board').classList.remove('undisplayed');

      this.tasks.logOut();

      this.header.display();
      this.filter.display({ assignees: this.assignees });

      this.getFeed();
    } catch (err) {
      console.error(err.message);
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
}
