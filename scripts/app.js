function initStorage() {
  const tasks = localStorage.getItem('tasks');
  const users = localStorage.getItem('users');

  if (!tasks) {
    localStorage.setItem('tasks', JSON.stringify(mockTasks));
  }

  if (!users) {
    localStorage.setItem('users', JSON.stringify(mockUsers));
  }
}

initStorage();

//

const appParams = {
  // tasksArr: mockTasks,
  // usersArr: mockUsers,
  headerRoot: 'header-nav',
  filterRoot: 'filterAssignee',
  toDoRoot: 'toDoList',
  inProgressRoot: 'inProgressList',
  completeRoot: 'completeList',
  fullTaskRoot: 'main',
  profileRoot: 'main',
  authRoot: 'main',
};

const app = new TasksController(appParams);
