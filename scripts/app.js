const testTasks = tasks.map((task) => new Task(...Object.values(task)));
const taskCollection = new TaskCollection(testTasks);
taskCollection.user = 'IvanovIvan';

const headerView = new HeaderView('root', taskCollection.user);
headerView.display();
