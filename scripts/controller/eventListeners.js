window.onload = function () {
  console.log('Page is loaded!');

  if (localStorage.getItem('user')) {
    app.login(localStorage.getItem('user'));
  } else {
    app.getFeed();
  }

  document.addEventListener('click', (event) => {
    if (event.target.id === 'toMainBtn') {
      app.backToMain();
    }

    if (event.target.id === 'signUpBtn') {
      app.showSignUp();
      app.auth.listen();
    }

    if (event.target.id === 'authSignUp') {
      event.preventDefault();
      const user = app.signUp();
      if (user) {
        document.getElementById('auth')?.remove();
        document.getElementById('menu').classList.remove('undisplayed');
        document.getElementById('board').classList.remove('undisplayed');
        app.showSignIn();
      }
    }

    if (event.target.id === 'signInBtn') {
      app.showSignIn();
    }

    if (event.target.id === 'authSignIn') {
      event.preventDefault();
      const user = app.signIn();
      if (user) {
        document.getElementById('auth')?.remove();
        document.getElementById('menu').classList.remove('undisplayed');
        document.getElementById('board').classList.remove('undisplayed');
      }
    }

    if (event.target.id === 'authSignUpRedirBtn') {
      app.showSignIn();
    }

    if (event.target.id === 'authSignInRedirBtn') {
      app.showSignUp();
    }

    if (event.target.id === 'profileBtn') {
      app.showProfile();
    }

    if (event.target.id === 'editProfileBtn') {
      event.preventDefault();
      app.showProfile('edit');
      app.profile.listen();
    }

    if (event.target.id === 'closeProfileBtn') {
      event.preventDefault();
    }

    if (event.target.id === 'loadMoreBtn') {
      console.log('click');
      const column = event.target.closest('.column').id;
      if (column === 'toDoColumn') {
        app.pagination.toDoTop += 10;
        app.getToDoFeed();
      }
      if (column === 'inProgressColumn') {
        app.pagination.inProgressTop += 10;
        app.getInProgressFeed();
      }
      if (column === 'completeColumn') {
        app.pagination.completeTop += 10;
        app.getCompleteFeed();
      }
    }

    //

    if (event.target.id === 'saveProfileBtn') {
      event.preventDefault();
      try {
        const user = app.users.get(localStorage.getItem('user'));
        const name = document.getElementById('name').value;
        const oldPassword = document.getElementById('oldPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const image = document.querySelector('input[name="avatar"]:checked')?.value || user.image;

        if (user.name === name) {
          throw new Error('New name must not be the same as the old one.', { cause: 'name' });
        }

        if (newPassword === oldPassword) {
          throw new Error('Password must not be the same as the old one.', {
            cause: 'newPassword',
          });
        }

        if (app.editUser(name, image, newPassword)) {
          app.showProfile();
        }
      } catch (err) {
        if (err.cause === 'oldPassword') {
          document.getElementById('oldPasswordError').textContent = err.message;
        }
        if (err.cause === 'name') {
          document.getElementById('nameError').textContent = err.message;
        }
        if (err.cause === 'newPassword') {
          document.getElementById('newPasswordError').textContent = err.message;
        }
      }
    }

    if (event.target.id === 'logOutBtn') {
      app.logOut();
    }

    //

    if (event.target.id === 'closeTaskFormBtn') {
      event.preventDefault();
      const overlay = document.getElementById('overlay');
      overlay.innerHTML = '';
      overlay.classList.remove('active');
    }

    if (event.target.id === 'createTaskBtn') {
      event.preventDefault();
      const overlay = document.getElementById('overlay');
      const name = document.getElementById('setTitle').value;
      const description = document.getElementById('setDescription').value;
      const assignee = document.getElementById('setAssignee').value;
      const priority = document.querySelector('input[name="setPriority"]:checked')?.value;
      const isPrivate = document.querySelector('input[name="setPrivacy"]:checked')?.value === TASK_PRIVACY.private;
      const status = document.querySelector('input[name="setStatus"]:checked')?.value || TASK_STATUS.toDo;

      if (
        app.addTask({
          name,
          description,
          status,
          priority,
          isPrivate,
        })
      ) {
        overlay.classList.remove('active');
        overlay.innerHTML = '';
      }
    }

    if (event.target.id === 'overlay') {
      const overlay = document.getElementById('overlay');
      console.log('OVERLAY');
      overlay.classList.remove('active');
    }

    if (event.target.id === 'deleteTaskBtn') {
      let taskId = event.target.closest('.task-card')?.id.split('-').at(-1);
      if (taskId) {
        app.removeTask(taskId);
      } else {
        taskId = event.target.closest('.full-task-card')?.id.split('-').at(-1);
        app.removeTask(taskId);
        app.backToMain();
      }
      console.log('delete task');
    }

    if (event.target.id === 'editTaskBtn') {
      const taskId = event.target.closest('.task-card')?.id.split('-').at(-1)
        || event.target.closest('.full-task-card')?.id.split('-').at(-1);
      app.showTaskForm('edit', taskId);
    }

    if (event.target.id === 'editTaskFormBtn') {
      event.preventDefault();

      const name = document.getElementById('setTitle').value;
      const description = document.getElementById('setDescription').value;
      const assignee = document.getElementById('setAssignee').value;
      const priority = document.querySelector('input[name="setPriority"]:checked')?.value;
      const isPrivate = document.querySelector('input[name="setPrivacy"]:checked')?.value === TASK_PRIVACY.private;
      const status = document.querySelector('input[name="setStatus"]:checked')?.value || TASK_STATUS.toDo;

      const task = {
        name,
        description,
        assignee,
        status,
        priority,
        isPrivate,
      };

      const taskId = document.getElementById('taskFormHeader').textContent.split(' ').at(-1);

      if (app.editTask(taskId, task)) {
        overlay.classList.remove('active');
        overlay.innerHTML = '';

        if (document.getElementById('fullTask')) {
          app.showTask(taskId);
        }
      }
    }
  });

  document.getElementById('addTaskBtn').addEventListener('click', () => {
    app.showTaskForm('add', null);
  });
};
