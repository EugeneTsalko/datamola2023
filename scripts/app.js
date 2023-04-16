const appParams = {
  headerRoot: 'header-nav',
  filterRoot: 'filterAssignee',
  toDoRoot: 'toDoList',
  inProgressRoot: 'inProgressList',
  completeRoot: 'completeList',
  fullTaskRoot: 'main',
  profileRoot: 'main',
  authRoot: 'main',
  errorRoot: 'main',
  taskFormRoot: 'overlay',
  apiUrl: 'http://169.60.206.50:7777',
};

const app = new TasksController(appParams);
