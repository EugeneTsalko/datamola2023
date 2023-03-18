import tasks from './mockData/mockTasks.js';
import Task from './Task.js';
// import taskSchema from './utils/taskSchema.js';
// import commentSchema from './utils/commentSchema.js';
import {
  checkStr,
  findTaskById,
  findTaskIndexById,
  checkIsObj,
  checkIsLoginValid,
  generateId,
  getCustomError,
  // validateObjBySchema,
  // getComments,
} from './utils/utils.js';

class TaskCollection {
  constructor(tasksArr) {
    this._user = '';
    this._tasks = tasksArr || [];
  }

  get user() {
    return this._user;
  }

  set user(newUser) {
    try {
      if (!checkIsLoginValid(newUser)) {
        throw new Error(getCustomError.invalidLogin('changeUser'));
      }

      this._user = newUser;
      console.log(`User was changed! New user is ${this._user}.`);
    } catch (err) {
      console.error(err.message);
    }
  }

  get tasks() {
    return this._tasks;
  }

  get(id) {
    try {
      if (!checkStr(id)) {
        throw new Error(getCustomError.invalidId('getTask'));
      }

      const task = findTaskById(id, this.tasks);

      if (!task) {
        throw new Error(getCustomError.taskNotFound(id, 'getTask'));
      }

      console.log(`Task with id: "${id}" was found!`);

      return task;
    } catch (err) {
      console.error(err.message);

      return null;
    }
  }

  add(name, description, assignee, status, priority, isPrivate) {
    try {
      const task = new Task(
        generateId(this.tasks),
        name,
        description,
        new Date(),
        assignee,
        status,
        priority,
        isPrivate,
      );

      const isTaskValid = Task.validate(task);

      if (!isTaskValid) {
        throw new Error("Can't add invalid task.");
      }

      if (assignee !== this.user) {
        throw new Error(getCustomError.notEnoughRights(this.user, assignee, 'addTask'));
      }

      this._tasks.push(task);
      console.log(`Task has been added with id: "${task.id}"!`);

      return true;
    } catch (err) {
      console.error(err.message);

      return false;
    }
  }

  addAll(tasksArr) {
    try {
      if (!Array.isArray(tasksArr) || !tasksArr.length) {
        throw new Error(
          'Parameter is required and should be non-empty array of Task class instances.',
        );
      }

      const inValidTasks = [];

      tasksArr.forEach((task) => {
        const isTaskValid = Task.validate(task) && task.assignee === this.user;
        if (isTaskValid) {
          this._tasks.push(task);
        } else {
          inValidTasks.push(task);
        }
      });

      return inValidTasks;
    } catch (err) {
      console.error(err.message);

      return null;
    }
  }

  edit(id, name, description, assignee, status, priority, isPrivate) {
    try {
      if (!checkStr(id)) {
        throw new Error(getCustomError.invalidId('editTask'));
      }

      const task = findTaskById(id, this.tasks);

      if (!task) {
        throw new Error(getCustomError.invalidId('editTask'));
      }

      if (this.user !== task.assignee) {
        throw new Error(getCustomError.notEnoughRights(this.user, task.assignee, 'editTask'));
      }

      if (arguments.length === 1) {
        throw new Error(getCustomError.notEnoughParams('editTask'));
      }

      const editedTask = new Task(
        id,
        name || task.name,
        description || task.description,
        task.createdAt,
        assignee || task.assignee,
        status || task.status,
        priority || task.priority,
        isPrivate || task.isPrivate,
        task.comments,
      );

      const isEditedTaskValid = Task.validate(editedTask);

      if (!isEditedTaskValid) {
        throw new Error('Edited task is not valid');
      }

      const index = findTaskIndexById(id, this.tasks);
      this._tasks[index] = editedTask;

      console.log(`Task with id: "${id} has been edited!"`);

      return true;
    } catch (err) {
      console.error(err.message);

      return false;
    }
  }

  remove(id) {
    try {
      if (!checkStr(id)) {
        throw new Error(getCustomError.invalidId('removeTask'));
      }

      if (!findTaskById(id, this.tasks)) {
        throw new Error(getCustomError.taskNotFound(id, 'removeTask'));
      }

      const index = this.tasks.findIndex((task) => task.id === id);

      if (this.user !== this.tasks[index].assignee) {
        throw new Error(
          getCustomError.notEnoughRights(this.user, this.tasks[index].assignee, 'removeTask'),
        );
      }

      this._tasks.splice(index, 1);
      console.log(`Task with "id": ${id} was successfully removed!`);

      return true;
    } catch (err) {
      console.error(err.message);

      return false;
    }
  }

  getPage(skip = 0, top = 10, filterConfig = null) {
    try {
      if (skip < 0 || top < 0 || !Number.isInteger(skip) || !Number.isInteger(top)) {
        throw new Error(getCustomError.invalidIntegerParam('skip and top', 'getTasks'));
      }

      if (filterConfig && !checkIsObj(filterConfig)) {
        throw new Error(getCustomError.invalidObjParam('filterConfig', 'getTasks'));
      }

      let result = structuredClone(this.tasks).sort(
        (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt),
      );

      if (filterConfig) {
        const keys = Object.keys(filterConfig);
        keys.forEach((key) => {
          result = result.filter((task) => {
            if (key === 'dateFrom') {
              return Date.parse(task.createdAt) >= Date.parse(filterConfig[key]);
            }
            if (key === 'dateTo') {
              return Date.parse(task.createdAt) <= Date.parse(filterConfig[key]);
            }
            if (key === 'isPrivate') {
              return task.isPrivate === filterConfig[key];
            }
            if (key === 'description') {
              return (
                task.description.toLowerCase().includes(filterConfig[key].toLowerCase())
                || task.name.toLowerCase().includes(filterConfig[key].toLowerCase())
              );
            }
            return task[key].toLowerCase() === filterConfig[key].toLowerCase();
          });
        });
      }

      result = result.splice(skip, top);

      if (!result.length) {
        console.log('Nothing was found for your request.');
      }

      return result;
    } catch (err) {
      console.error(err.message);

      return null;
    }
  }

  // addComment(id, text) {}

  clear() {
    this._tasks = [];
  }
}

// // ниже различные тест-кейсы для методов:

const test = new TaskCollection(tasks);
// console.log(test);

// // user

// console.log('before user change: ', test.user);
test.user = 'IvanovIvan';
// console.log('after user change: ', test.user);

// // get

// console.log('get invalid id: ', test.get(1));
// console.log('get valid id: ', test.get('1'));

// // add

// console.log('add invalid task: ', test.add());
// console.log(
//   'add task without rights: ',
//   test.add('title', 'description', 'validAssignee', 'To Do', 'High'),
// );
// console.log('add valid task: ', test.add('title', 'description', 'IvanovIvan', 'To Do', 'High'));
// console.log(test.tasks);

// // addAll

// console.log('addAll invalid parameter: ', test.addAll({}));
// console.log('addAll not Task instances: ', test.addAll([{}, {}]));
// console.log('addAll invalid Task instances: ', test.addAll([new Task('id1'), new Task('id2')]));
// console.log(
//   'addAll mixed valid/invalid: ',
//   test.addAll([
//     new Task(generateId(test.tasks), 'title', 'descr', new Date(), 'noRights', 'To Do', 'High'),
//     new Task(generateId(test.tasks), 'title', 'desc', new Date(), 'IvanovIvan', 'To Do', 'High'),
//   ]),
// );
// console.log(test);

// // edit

// console.log('edit invalid id: ', test.edit());
// console.log('edit need more parameters: ', test.edit('1'));
// console.log('edit valid id invalid parameter: ', test.edit('1', ['invalidParameter']));
// console.log('edit no rights: ', test.edit('3'));
// console.log('edit title: ', test.edit('1', 'editedTitle', 'editedDescr', 'newAssignee'));
// console.log(findTaskById('1', tasks));

// // remove

// console.log('remove invalid id: ', test.remove());
// console.log('remove not found id: ', test.remove('111'));
// console.log('remove no rights: ', test.remove('3'));
// console.log('remove valid: ', test.remove('1'));
// console.log(tasks[0]);

// // getPage

// console.log('getPage without parameters (first 10): ', test.getPage());
// console.log('getPage skip/top should be nums: ', test.getPage('10', '10'));
// console.log('getPage invalid filterCondig: ', test.getPage(0, 10, 'sarahgreen'));
// console.log('getPage nothing found: ', test.getPage(0, 10, { dateTo: '1999-01-01' }));
// console.log('getPage smth found: ', test.getPage(0, 20, { status: 'To Do', priority: 'High' }));
// const filter = {
//   assignee: 'SarahGreen',
//   dateFrom: new Date(2023, 1, 21),
//   dateTo: '2023-03-02',
//   status: 'To Do',
//   priority: 'Low',
//   isPrivate: false,
//   description: 'офис',
// };
// console.log('getPage smth found with full filterConfig: ', test.getPage(0, 10, filter));

// // clear

// console.log('before clear: ', test.tasks);
// console.log('clear test collection: ', test.clear());
