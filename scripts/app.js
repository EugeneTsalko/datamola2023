const testTasks = tasks.map((task) => new Task(...Object.values(task)));
const taskCollection = new TaskCollection(testTasks);
taskCollection.user = 'IvanovIvan';

const headerView = new HeaderView('root');
headerView.display();

const main = DomHelper.createNode('main', ['main'], { id: 'main' });
document.body.append(main);

// const filterView = new FilterView('main');
// filterView.display();
