import { tasks } from './mockTasks.mjs';

const tasksModule = (function () {
  let user = 'IvanovIvan';

  const checkId = (id, funcName) => {
    let result = true;

    if (typeof id !== 'string') {
      console.log(`Fail in ${funcName}. Parameter "id" is required and should be a string.`);
      result = false;

      return result;
    }

    const isIdExists = !!tasks.find((el) => el.id === id);

    if (!isIdExists) {
      console.log(`Fail in ${funcName}. Task object with "id": ${id} doesn't exist in the array.`);
      result = false;
    }

    return result;
  };

  // function getTasks(skip?, top?, filterConfig?) {
  //   // console.log(user);
  //   return arr;
  // }

  function getTask(id) {
    let result = null;
    const isId = checkId(id, 'getTask');

    if (isId) {
      result = tasks.find((el) => el.id === id);
      console.log(`Task found! Result:`, result);
    }

    return result;
  }

  // function validateTask(task) {
  //   return boolean;
  // }

  // function addTask(name, description,assignee,status,priority, isPrivate) {
  //   return boolean;
  // }

  // function editTask(name, description?,assignee?,status?,priority?, isPrivate = false) {
  //   return boolean;
  // }

  function removeTask(id) {
    let result = false;
    const isId = checkId(id, 'removeTask');

    if (isId) {
      const index = tasks.findIndex((el) => el.id === id);
      console.log(index);

      if (user === tasks[index].assignee) {
        tasks.splice(index, 1);
        result = true;
        console.log(`Task with "id": ${id} was successfully removed!`);
      } else {
        console.log(
          `Fail in removeTask. User ${user} have no rights to remove task with id: ${id}.`,
        );
      }
    }

    return result;
  }

  // function validateComment(com) {
  //   return boolean;
  // }

  // function addComment(id, text) {
  //   return boolean;
  // }

  function changeUser(usr) {
    if (usr.match(/^[a-zA-Z]+$/)) {
      user = usr;
      console.log(`User was changed! New user is ${user}.`);
    } else {
      console.log(
        'Fail in changeUser. Parameter "user login" is required and should contain latin letters only.',
      );
    }
  }

  return {
    // getTasks,
    getTask,
    // validateTask,
    // addTask,
    // editTask,
    removeTask,
    // validateComment,
    // addComment,
    changeUser,
  };
})();

//
