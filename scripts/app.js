const testTasks = tasks.map((task) => new Task(...Object.values(task)));
const taskCollection = new TaskCollection(testTasks);
taskCollection.user = 'IvanovIvan';

const headerView = new HeaderView('header-nav');
headerView.display({ user: 'IvanovIvan' });

const main = DomHelper.createNode('main', ['main'], { id: 'main' });
document.body.append(main);

const footerView = new FooterView('root');
footerView.display();

const filterView = new FilterView('main');
filterView.display({ isAuth: true });

const taskFeed = new TaskFeedView('main');
taskFeed.display();

const task = new TaskCardView('todo-list', taskCollection.get('1'));
task.display();

// const taskPage = new TaskView('main', taskCollection.get('1'));
// taskPage.display();
