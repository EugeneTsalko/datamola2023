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
  apiUrl: 'http://169.60.206.50:7777',
};

const app = new TasksController(appParams);

// await app.start();
// const tasks = app.api.getTasks();
// console.log(await tasks);

//
