class TasksController {
  constructor(params) {
    const {
      tasksArr,
      headerRoot,
      filterRoot,
      toDoRoot,
      inProgressRoot,
      completeRoot,
      fullTaskRoot,
    } = params;
    this.tasks = new TaskCollection(tasksArr);
    this.header = new HeaderView(headerRoot);
    this.filter = new FilterView(filterRoot);
    this.toDoFeed = new TaskFeedView(toDoRoot);
    this.inProgressFeed = new TaskFeedView(inProgressRoot);
    this.completeFeed = new TaskFeedView(completeRoot);
    this.fullTask = new TaskView(fullTaskRoot);
  }
}
