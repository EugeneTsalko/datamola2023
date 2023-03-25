// init

const tasks = new TaskCollection(mockTasks);
tasks.user = 'SarahGreen';

const headerView = new HeaderView('header-nav');
headerView.display({ user: 'SarahGreen' });

const footerView = new FooterView('root');
footerView.display();

const filterView = new FilterView('menu');
filterView.display({ isAuth: true });

const toDoTaskFeed = new TaskFeedView('toDoList');
toDoTaskFeed.display({
  isAuth: true,
  tasks: tasks.getPage(0, tasks.tasks.length, { status: 'To Do' }),
});

const inProgressTaskFeed = new TaskFeedView('inProgressList');
inProgressTaskFeed.display({
  isAuth: true,
  tasks: tasks.getPage(0, tasks.tasks.length, { status: 'In progress' }),
});

const completeTaskFeed = new TaskFeedView('completeList');
completeTaskFeed.display({
  isAuth: true,
  tasks: tasks.getPage(0, tasks.tasks.length, { status: 'Complete' }),
});

const taskPage = new TaskView('main');

// test

setCurrentUser('IvanovIvan');

addTask({
  name: 'test addtask',
  description: 'addtask descr',
  status: 'Complete',
  priority: 'Low',
});

addTask({
  name: 'THIS TASK WILL BE REMOVED',
  description: 'THIS TASK WILL BE REMOVED',
  status: 'To Do',
  priority: 'Low',
});

removeTask('24');

editTask('23', {
  name: 'Edited test Addtask',
  description: 'Edited addtask descr',
  assignee: 'EditedAssignee',
  status: 'In progress',
  priority: 'High',
  isPrivate: true,
});

// showTask('3');
// closeTask();
