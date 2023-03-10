import { tasks } from './mockData/mockTasks.mjs';
import { taskSchema } from './utils/taskSchema.mjs';
import { commentSchema } from './utils/commentSchema.mjs';
import {
  checkStr,
  findTaskById,
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
        throw new Error(getCustomError.invalidTaskObj('validateTask'));
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
        throw new Error(getCustomError.notEnoughRightsToAddTask(user, assignee));
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
    // TODO если передан только ид то выдать сообщение.
    try {
      if (!checkStr(id)) {
        throw new Error(
          `Error in addTask. Parameter "id" is required and should be a non-empty string.`,
        );
      }

      const task = findTaskById(id, tasks);

      if (!task) {
        throw new Error(`Error in getTask. Task with id: "${id}" is not found".`);
      }

      const index = tasks.findIndex((el) => el.id === id);

      if (user !== tasks[index].assignee) {
        throw new Error(
          `Error in editTask. User ${user} have no rights to edit ${tasks[index].assignee}'s task with id: "${id}".`,
        );
      }

      const editedTask = {
        id: task.id,
        name: name || task.name,
        description: description || task.description,
        createdAt: task.createdAt,
        assignee: assignee || task.assignee,
        status: status || task.status,
        priority: priority || task.priority,
        isPrivate: isPrivate || task.isPrivate,
        comments: task.comments,
      };

      const errorMessages = Object.keys(taskSchema)
        .filter((key) => !taskSchema[key](task[key]))
        .map((key) => `Error in editTask. Property "${key}" in task is not valid.`);

      if (errorMessages.length > 0) {
        const error = new Error();
        for (const message of errorMessages) {
          error.message += `${message} \n`;
        }
        throw error;
      }

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
        throw new Error(
          `Error in removeTask. Parameter "id" is required and should be a non-empty string.`,
        );
      }

      if (!findTaskById(id, tasks)) {
        throw new Error(`Error in removeTask. Task with id: "${id}" is not found".`);
      }

      const index = tasks.findIndex((el) => el.id === id);

      if (user !== tasks[index].assignee) {
        throw new Error(
          `Error in removeTask. User ${user} have no rights to remove ${tasks[index].assignee}'s task with id: "${id}".`,
        );
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
      if (typeof com !== 'object' || Array.isArray(com) || com === null) {
        throw new Error(
          `Error in validateComment. Parameter "comment" is required and should be an object.`,
        );
      }

      const errorMessages = Object.keys(commentSchema)
        .filter((key) => !commentSchema[key](com[key]))
        .map((key) => `Error in validateComment. Property "${key}" in comment is not valid.`);

      if (errorMessages.length > 0) {
        const error = new Error();
        for (const message of errorMessages) {
          error.message += `${message} \n`;
        }
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
        throw new Error(
          `Error in addComment. Parameter "id" is required and should be a non-empty string.`,
        );
      }

      if (!findTaskById(id, tasks)) {
        throw new Error(`Error in addComment. Task with id: "${id}" is not found".`);
      }

      const newComment = {
        id: generateId(),
        text,
        createdAt: new Date(),
        author: user,
      };

      const errorMessages = Object.keys(commentSchema)
        .filter((key) => !commentSchema[key](newComment[key]))
        .map((key) => `Error in addComment. Property "${key}" in comment is not valid.`);

      if (errorMessages.length > 0) {
        const error = new Error();
        for (const message of errorMessages) {
          error.message += `${message} \n`;
        }
        throw error;
      }

      const index = tasks.findIndex((el) => el.id === id);
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
