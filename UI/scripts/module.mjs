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

  // function getTask(id) {
  //   return obj;
  // }

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
      console.log(`Success! New user is ${user}.`);
    } else {
      console.log('Fail. Invalid user login (latin letters only).');
    }
  }

  return {
    // getTasks,
    // getTask,
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
