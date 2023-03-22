import TaskCollection from './model/TaskCollection.js';
import tasks from './mockData/mockTasks.js';

const mockTasks = new TaskCollection(tasks);

console.log(mockTasks);
