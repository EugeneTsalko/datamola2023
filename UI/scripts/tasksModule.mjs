import { tasks } from './mockData/mockTasks.mjs';
import { taskSchema } from './utils/taskSchema.mjs';
import { commentSchema } from './utils/commentSchema.mjs';
import {
  checkStr,
  findTaskById,
  findTaskIndexById,
  checkIsObj,
  checkIsLoginValid,
  generateId,
  getCustomError,
  validateObjBySchema,
} from './utils/utils.mjs';

const tasksModule = (function () {
  let user = 'IvanovIvan';

  // function getTasks(skip?, top?, filterConfig?) {
  //   // console.log(user);
  //   return arr;
  // }

  function getTask(id) {
    try {
      if (!checkStr(id)) {
        throw new Error(getCustomError.invalidId('getTask'));
      }

      const task = findTaskById(id, tasks);

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

  function validateTask(task) {
    try {
      if (!checkIsObj(task)) {
        throw new Error(getCustomError.invalidObjParam('validateTask'));
      }

      const error = validateObjBySchema(task, taskSchema, 'validateTask');

      if (error) {
        throw error;
      }

      console.log('Task is valid!');

      return true;
    } catch (err) {
      console.error(err.message);

      return false;
    }
  }

  function addTask(name, description, assignee, status, priority, isPrivate = false) {
    // если мы не можем создать таск с assignee отличным от user, то почему в ТЗ assignee: string, а не assignee: string = user?
    try {
      const task = {
        id: generateId(),
        name,
        description,
        createdAt: new Date(),
        assignee,
        status,
        priority,
        isPrivate,
        comments: [],
      };

      const error = validateObjBySchema(task, taskSchema, 'addTask');

      if (error) {
        throw error;
      }

      if (assignee !== user) {
        throw new Error(getCustomError.notEnoughRights(user, assignee, 'addTask'));
      }

      tasks.push(task);
      console.log(`Task has been added with id: "${task.id}"!`);

      return true;
    } catch (err) {
      console.error(err.message);

      return false;
    }
  }

  function editTask(id, name, description, assignee, status, priority, isPrivate) {
    try {
      if (!checkStr(id)) {
        throw new Error(getCustomError.invalidId('editTask'));
      }

      const task = findTaskById(id, tasks);

      if (!task) {
        throw new Error(getCustomError.invalidId('editTask'));
      }

      if (user !== task.assignee) {
        throw new Error(getCustomError.notEnoughRights(user, task.assignee, 'editTask'));
      }

      if (arguments.length === 1) {
        throw new Error(getCustomError.notEnoughParams('editTask'));
      }

      const editedTask = {
        id,
        name: name || task.name,
        description: description || task.description,
        createdAt: task.createdAt,
        assignee: assignee || task.assignee,
        status: status || task.status,
        priority: priority || task.priority,
        isPrivate: isPrivate || task.isPrivate,
        comments: task.comments,
      };

      const error = validateObjBySchema(editedTask, taskSchema, 'editTask');

      if (error) {
        throw error;
      }

      const index = findTaskIndexById(id, tasks);
      tasks[index] = editedTask;

      console.log(`Task with id: "${id} has been edited!"`);

      return true;
    } catch (err) {
      console.error(err.message);

      return false;
    }
  }

  function removeTask(id) {
    try {
      if (!checkStr(id)) {
        throw new Error(getCustomError.invalidId('removeTask'));
      }

      if (!findTaskById(id, tasks)) {
        throw new Error(getCustomError.taskNotFound(id, 'removeTask'));
      }

      const index = tasks.findIndex((el) => el.id === id);

      if (user !== tasks[index].assignee) {
        throw new Error(getCustomError.notEnoughRights(user, tasks[index].assignee, 'removeTask'));
      }

      tasks.splice(index, 1);
      console.log(`Task with "id": ${id} was successfully removed!`);

      return true;
    } catch (err) {
      console.error(err.message);

      return false;
    }
  }

  function validateComment(com) {
    try {
      if (!checkIsObj(com)) {
        throw new Error(getCustomError.invalidObjParam('validateComment'));
      }

      const error = validateObjBySchema(com, commentSchema, 'validateComment');

      if (error) {
        throw error;
      }

      console.log('Comment is valid!');

      return true;
    } catch (err) {
      console.error(err.message);

      return false;
    }
  }

  function addComment(id, text) {
    try {
      if (!checkStr(id)) {
        throw new Error(getCustomError.invalidId('addComment'));
      }

      if (!findTaskById(id, tasks)) {
        throw new Error(getCustomError.taskNotFound(id, 'addComment'));
      }

      const newComment = {
        id: generateId(),
        text,
        createdAt: new Date(),
        author: user,
      };

      const error = validateObjBySchema(newComment, commentSchema, 'addComment');

      if (error) {
        throw error;
      }

      const index = findTaskIndexById(id, tasks);
      tasks[index].comments.push(newComment);
      console.log(`New comment has been added to task with id: "${id}"!`);

      return true;
    } catch (err) {
      console.error(err.message);

      return false;
    }
  }

  function changeUser(newUser) {
    try {
      if (!checkIsLoginValid(newUser)) {
        throw new Error(
          'Error in changeUser. Parameter "user login" is required and should contain latin letters only.',
        );
      }

      user = newUser;
      console.log(`User was changed! New user is ${user}.`);

      return true;
    } catch (err) {
      console.error(err.message);

      return false;
    }
  }

  return {
    // getTasks,
    getTask,
    validateTask,
    addTask,
    editTask,
    removeTask,
    validateComment,
    addComment,
    changeUser,
  };
})();

// ниже различные тест-кейсы для методов:

// getTask:
// console.log(tasksModule.getTask());
// console.log(tasksModule.getTask(''));
// console.log(tasksModule.getTask(' '));
// console.log(tasksModule.getTask(1));
// console.log(tasksModule.getTask('nonExistingId'));
// console.log(tasksModule.getTask('1'));

// validateTask:
// console.log(tasksModule.validateTask());
// console.log(tasksModule.validateTask([]));
// console.log(tasksModule.validateTask(null));
// const invalidTask = {
//   id: 1,
//   name: { invalidName: true },
//   description: ['invalid description'],
//   createdAt: new Date().toLocaleTimeString(),
//   assignee: 'invalidLogin with spaces and integers 42',
//   status: 'invalid status',
//   priority: 'invalid priority',
//   isPrivate: 'true',
//   comments: {},
// };
// console.log(tasksModule.validateTask(invalidTask));
// const validTask = {
//   id: '1',
//   name: 'Task name.',
//   description: 'Task description',
//   createdAt: new Date(),
//   assignee: 'validLogin',
//   status: 'To Do',
//   priority: 'High',
//   isPrivate: true,
//   comments: [],
// };
// console.log(tasksModule.validateTask(validTask));

// addTask:
// console.log(tasksModule.addTask());
// const invalidTaskToAdd = {
//   name: { invalidName: true },
//   description: ['invalid description'],
//   assignee: 'invalidLogin with spaces and integers 42',
//   status: 'invalid status',
//   priority: 'invalid priority',
//   isPrivate: 'true',
// };
// console.log(tasksModule.addTask(...Object.values(invalidTaskToAdd)));
// const noRightsToAddTask = {
//   name: 'Task name.',
//   description: 'Task description',
//   assignee: 'validLogin',
//   status: 'To Do',
//   priority: 'High',
//   isPrivate: true,
// };
// console.log(tasksModule.addTask(...Object.values(noRightsToAddTask)));
// const validTaskToAdd = {
//   name: 'Task name.',
//   description: 'Task description',
//   assignee: 'IvanovIvan',
//   status: 'To Do',
//   priority: 'High',
//   isPrivate: true,
// };
// console.log(tasksModule.addTask(...Object.values(validTaskToAdd)));

// editTask:
// console.log(tasksModule.editTask());
// console.log(tasksModule.editTask('1'));
// console.log(tasksModule.editTask('3', 'New Task Title'));
// const invalidTaskToEdit = {
//   id: '1',
//   name: { invalidName: true },
//   description: ['invalid description'],
//   assignee: 'invalidLogin with spaces and integers 42',
//   status: 'invalid status',
//   priority: 'invalid priority',
//   isPrivate: 'true',
// };
// console.log(tasksModule.editTask(...Object.values(invalidTaskToEdit)));
// const validTaskToEdit = {
//   id: '1',
//   name: 'New Task name.',
//   description: 'New Task description',
//   assignee: 'NewAssignee',
//   status: 'To Do',
//   priority: 'High',
//   isPrivate: true,
// };
// console.log('old task', findTaskById('1', tasks));
// console.log(tasksModule.editTask(...Object.values(validTaskToEdit)));
// console.log('edited task', findTaskById('1', tasks));

// removeTask
// console.log(tasksModule.removeTask());
// console.log(tasksModule.removeTask('111'));
// console.log(tasksModule.removeTask('3'));
// console.log(tasks.length, tasks[0]);
// console.log(tasksModule.removeTask('1'));
// console.log(tasks.length, tasks[0]);

// validateComment
// console.log(tasksModule.validateComment());
// console.log(tasksModule.validateComment({}));
// const validComment = {
//   id: generateId(),
//   text: 'Awesome comment.',
//   createdAt: new Date(),
//   author: 'validLogin',
// };
// console.log(tasksModule.validateComment(validComment));

// addComment
// console.log(tasksModule.addComment());
// console.log(tasksModule.addComment('111'));
// console.log(tasksModule.addComment('1'));
// console.log(tasksModule.addComment('1', 'New Comment text'));
// console.log(tasks[0]);
