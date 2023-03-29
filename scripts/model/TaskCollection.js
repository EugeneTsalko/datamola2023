class TaskCollection {
  constructor(tasksArr) {
    this._user = null;
    this._collection = tasksArr.map((task) => {
      const collectionTask = new Task(...Object.values(structuredClone(task)));
      if (collectionTask.comments.length) {
        collectionTask.comments = collectionTask.comments.map(
          (comment) => new Comment(...Object.values(comment)),
        );
      }

      return collectionTask;
    }) || [];
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

  logOut() {
    this._user = null;
  }

  get collection() {
    return this._collection;
  }

  set collection(value) {
    console.error(getCustomError.protectedProp('tasks', this.collection, value));
  }

  get toDoTasks() {
    return this.collection.filter((task) => task.status === TASK_STATUS.toDo);
  }

  get inProgressTasks() {
    return this.collection.filter((task) => task.status === TASK_STATUS.inProgress);
  }

  get completeTasks() {
    return this.collection.filter((task) => task.status === TASK_STATUS.complete);
  }

  get assignees() {
    return Array.from(new Set(this.collection.map((task) => task.assignee)));
  }

  get(id) {
    try {
      if (!checkStr(id)) {
        throw new Error(getCustomError.invalidId('TaskCollection.get'));
      }

      const task = findTaskById(id, this.collection);

      if (!task) {
        throw new Error(getCustomError.taskNotFound(id, 'TaskCollection.get'));
      }

      console.log(`Task with id: "${id}" was found!`);

      return task;
    } catch (err) {
      console.error(err.message);

      return null;
    }
  }

  add(name, description, status, priority, isPrivate) {
    try {
      const task = new Task(
        generateId(this.collection),
        name,
        description,
        new Date(),
        this.user,
        status,
        priority,
        isPrivate,
      );

      if (!Task.validate(task)) {
        throw new Error("Can't add invalid task.");
      }

      this._collection.push(task);
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
        if (Task.validate(task)) {
          this._collection.push(task);
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
        throw new Error(getCustomError.invalidId('TaskCollection.edit'));
      }

      const task = findTaskById(id, this.collection);
      console.log(task);

      if (!task) {
        throw new Error(getCustomError.invalidId('TaskCollection.edit'));
      }

      if (this.user !== task.assignee) {
        throw new Error(
          getCustomError.notEnoughRights(this.user, task.assignee, 'TaskCollection.edit'),
        );
      }

      if (arguments.length === 1) {
        throw new Error(getCustomError.notEnoughParams('TaskCollection.edit'));
      }

      const editedTask = new Task(
        id,
        name || task.name,
        description || task.description,
        task._createdAt,
        assignee || task.assignee,
        status || task.status,
        priority || task.priority,
        isPrivate || task.isPrivate,
        task.comments,
      );

      if (!Task.validate(editedTask)) {
        throw new Error('Edited task is not valid');
      }

      const index = findTaskIndexById(id, this.collection);
      this._collection[index] = editedTask;

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
        throw new Error(getCustomError.invalidId('TaskCollection.remove'));
      }

      if (!findTaskById(id, this.collection)) {
        throw new Error(getCustomError.taskNotFound(id, 'TaskCollection.remove'));
      }

      const index = this.collection.findIndex((task) => task.id === id);

      if (this.user !== this.collection[index].assignee) {
        throw new Error(
          getCustomError.notEnoughRights(
            this.user,
            this.collection[index].assignee,
            'TaskCollection.remove',
          ),
        );
      }

      this._collection.splice(index, 1);
      console.log(`Task with "id": ${id} was successfully removed!`);

      return true;
    } catch (err) {
      console.error(err.message);

      return false;
    }
  }

  getPage(skip = 0, top = 10, filterConfig = null, type = null) {
    try {
      if (skip < 0 || top < 0 || !Number.isInteger(skip) || !Number.isInteger(top)) {
        throw new Error(
          getCustomError.invalidIntegerParam('skip and top', 'TaskCollection.getPage'),
        );
      }

      if (filterConfig && !checkIsObj(filterConfig)) {
        throw new Error(getCustomError.invalidObjParam('filterConfig', 'TaskCollection.getPage'));
      }

      let result = structuredClone(this.collection);

      if (type) {
        switch (type) {
          case TASK_STATUS.toDo:
            result = structuredClone(this.toDoTasks);
            break;
          case TASK_STATUS.inProgress:
            result = structuredClone(this.inProgressTasks);
            break;

          case TASK_STATUS.complete:
            result = structuredClone(this.completeTasks);
            break;

          default:
            break;
        }
      }

      result.sort((a, b) => Date.parse(b._createdAt) - Date.parse(a._createdAt));

      if (filterConfig) {
        const keys = Object.keys(filterConfig);
        keys.forEach((key) => {
          result = result.filter((task) => {
            if (key === 'dateFrom') {
              return Date.parse(task._createdAt) >= Date.parse(filterConfig[key]);
            }
            if (key === 'dateTo') {
              return Date.parse(task._createdAt) <= Date.parse(filterConfig[key]);
            }
            if (key === 'isPrivate') {
              return filterConfig[key].includes(task.isPrivate);
            }
            if (key === 'description') {
              return (
                task.description.toLowerCase().includes(filterConfig[key].toLowerCase())
                || task.name.toLowerCase().includes(filterConfig[key].toLowerCase())
              );
            }
            return filterConfig[key].includes(task[key]);
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

  clear() {
    this._collection = [];
    console.log('Task collection was cleared.');
  }

  addComment(id, text) {
    try {
      if (!checkStr(id)) {
        throw new Error(getCustomError.invalidId('TaskCollection.addComment'));
      }

      if (!findTaskById(id, this.collection)) {
        throw new Error(getCustomError.taskNotFound(id, 'TaskCollection.addComment'));
      }

      const comments = getComments(this.collection);
      const newComment = new Comment(generateId(comments), text, new Date(), this.user);

      if (!Comment.validate(newComment)) {
        throw new Error("Can't add invalid comment.");
      }

      const index = findTaskIndexById(id, this.collection);
      this._collection[index].comments.push(newComment);
      console.log(`New comment has been added to task with id: "${id}"!`);

      return true;
    } catch (err) {
      console.error(err.message);

      return false;
    }
  }
}

// export default TaskCollection;

// // ниже различные тест-кейсы для методов:

// const test = new TaskCollection(mockTasks);
// test.user = 'IvanovIvan';
// console.log(test);

// // get

// console.log('get invalid id: ', test.get(1));
// console.log('get valid id: ', test.get('1'));

// // add

// console.log('add invalid task: ', test.add());
// console.log('add valid task: ', test.add('title', 'description', 'To Do', 'High'));
// console.log(test.tasks);

// // addAll

// console.log('addAll invalid parameter: ', test.addAll({}));
// console.log('addAll not Task instances: ', test.addAll([{}, {}]));
// console.log('addAll invalid Task instances: ', test.addAll([new Task('id1'), new Task('id2')]));
// console.log(
//   'addAll mixed valid/invalid: ',
//   test.addAll([
//     new Task(generateId(test.tasks), 'title', 'descr', new Date(), 'bad login', 'To Do', 'High'),
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
// console.log(test.get('1'));

// // remove

// console.log('remove invalid id: ', test.remove());
// console.log('remove not found id: ', test.remove('111'));
// console.log('remove no rights: ', test.remove('3'));
// console.log('remove valid: ', test.remove('1'));
// console.log(test.mockTasks[0]);

// // getPage

// console.log('getPage without parameters (first 10): ', test.getPage());
// console.log('getPage skip/top should be nums: ', test.getPage('10', '10'));
// console.log('getPage invalid filterCondig: ', test.getPage(0, 10, 'sarahgreen'));
// console.log('getPage nothing found: ', test.getPage(0, 10, { dateTo: '1999-01-01' }));
// console.log(
//   'getPage smth found: ',
//   test.getPage(0, 20, { status: ['To Do', 'Complete'], priority: ['High', 'Medium'] }),
// );
// const filter = {
//   assignee: ['IvanovIvan', 'StevenKing'],
//   dateFrom: new Date('01 01 2023'),
//   dateTo: new Date('04 09 2023'),
//   status: ['To Do', 'In progress'],
//   priority: ['Low', 'High'],
//   isPrivate: [false, true],
//   description: 'localStorage',
// };
// console.log('getPage smth found with full filterConfig: ', test.getPage(0, 10, filter));

// // clear

// console.log('before clear: ', test.tasks);
// console.log('clear test collection: ', test.clear());

// // addComment

// console.log('addComment no parameters: ', test.addComment());
// console.log('addComment not found: ', test.addComment('111'));
// console.log('addComment no text: ', test.addComment('1'));
// console.log('addComment no text: ', test.addComment('1', 'new comment text!'));
// console.log(test.get('1'));
