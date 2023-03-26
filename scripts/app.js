// init

const tasks = new TaskCollection(mockTasks);

const headerView = new HeaderView('header-nav');
headerView.display();

const filterView = new FilterView('filter-assignee');

const toDoTaskFeed = new TaskFeedView('toDoList');

const inProgressTaskFeed = new TaskFeedView('inProgressList');

const completeTaskFeed = new TaskFeedView('completeList');

const taskPage = new TaskView('main');

// test

// setCurrentUser('IvanovIvan');

// addTask({
//   name: 'test addtask',
//   description: 'addtask descr',
//   status: 'Complete',
//   priority: 'Low',
// });

// addTask({
//   name: 'THIS TASK WILL BE REMOVED',
//   description: 'THIS TASK WILL BE REMOVED',
//   status: 'To Do',
//   priority: 'Low',
// });

// removeTask('24');

// editTask('23', {
//   name: 'Edited test Addtask',
//   description: 'Edited addtask descr',
//   assignee: 'EditedAssignee',
//   status: 'In progress',
//   priority: 'High',
//   isPrivate: true,
// });

// showTask('3');
// closeTask();

// getFeed(10, 20);
