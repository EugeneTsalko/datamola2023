// init

const testTasks = tasks.map((task) => new Task(...Object.values(task)));
const taskCollection = new TaskCollection(testTasks);
taskCollection.user = 'IvanovIvan';

const headerView = new HeaderView('header-nav');
headerView.display({ user: 'IvanovIvan' });

const main = DomHelper.createNode('main', ['main'], { id: 'main' });
document.body.append(main);

const footerView = new FooterView('root');
footerView.display();

const filterView = new FilterView('menu');
filterView.display({ isAuth: true });

const toDoTaskFeed = new TaskFeedView('toDoList');
toDoTaskFeed.display({
  isAuth: true,
  tasks: taskCollection.getPage(0, taskCollection.tasks.length, { status: 'To Do' }),
});

const inProgressTaskFeed = new TaskFeedView('inProgressList');
inProgressTaskFeed.display({
  isAuth: true,
  tasks: taskCollection.getPage(0, taskCollection.tasks.length, { status: 'In progress' }),
});

const completeTaskFeed = new TaskFeedView('completeList');
completeTaskFeed.display({
  isAuth: true,
  tasks: taskCollection.getPage(0, taskCollection.tasks.length, { status: 'Complete' }),
});

// const taskPage = new TaskView('main');
// taskPage.display(taskCollection.get('3'));

// funcs

function setCurrentUser(user) {
  try {
    if (!checkIsLoginValid(user)) {
      throw new Error(getCustomError.invalidLogin('setCurrentUser'));
    }

    // имхо taskCollection и headerView правильнее передавать параметрами, но в ТЗ так
    taskCollection.user = user;
    headerView.display({ user });
  } catch (err) {
    console.error(err.message);
  }
}
setCurrentUser('JEKA');
