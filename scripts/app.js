// init

// const testTasks = tasks.map((task) => new Task(...Object.values(task)));
const tasks = new TaskCollection(mockTasks);
tasks.user = 'IvanovIvan';

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

// const taskPage = new TaskView('main');
// taskPage.display(taskCollection.get('3'));

// funcs

function setCurrentUser(user) {
  try {
    if (!checkIsLoginValid(user)) {
      throw new Error(getCustomError.invalidLogin('setCurrentUser'));
    }

    // имхо taskCollection и headerView правильнее передавать параметрами, но в ТЗ так
    tasks.user = user;
    headerView.display({ user });
  } catch (err) {
    console.error(err.message);
  }
}
setCurrentUser('JEKA');
