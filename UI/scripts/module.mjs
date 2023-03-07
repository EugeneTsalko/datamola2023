import { tasks } from './mockTasks.mjs';

const tasksModule = (function () {
  let user = 'EugeneTsalko';

  // function getName() {
  //   console.log(user);
  // }

  // function getTasks(skip?, top?, filterConfig?) {
  //   // console.log(user);
  //   return arr;
  // }

  function getTask(id) {
    if (typeof id !== 'string') {
      console.log('Fail in getTask. Parameter "id" is required and should be a string.');
      return null;
    }

    const result = tasks.find((el) => el.id === id);

    if (!result) {
      console.log(`Task not found. Task object with "id": ${id} doesn't exist in the array.`);
      return null;
    }

    console.log(`Task found! Result:`, result);

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

  // function removeTask(id) {
  //   return boolean;
  // }

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
    // removeTask,
    // validateComment,
    // addComment,
    changeUser,
  };
})();

//
