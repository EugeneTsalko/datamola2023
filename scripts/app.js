// инит стореджа, в задании с АПИ исчезнет
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
  headerRoot: 'header-nav',
  filterRoot: 'filterAssignee',
  toDoRoot: 'toDoList',
  inProgressRoot: 'inProgressList',
  completeRoot: 'completeList',
  fullTaskRoot: 'main',
  profileRoot: 'main',
  authRoot: 'main',
  taskFormRoot: 'overlay',
};

const app = new TasksController(appParams);
