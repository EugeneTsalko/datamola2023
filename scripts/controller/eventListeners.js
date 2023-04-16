window.onload = async () => {
  console.log('Page is loaded!');

  await app.start();

  setInterval(async () => {
    await app.fetchTasks();

    app.makeTasks(app.data, app.user);
    app.getFeed();
  }, SHORT_POLLING_TIME); // short polling

  document.addEventListener('click', async (event) => {
    if (event.target.id === 'toMainBtn') {
      await app.backToMain();
    }

    if (event.target.id === 'signUpBtn') {
      app.showSignUp();
    }

    if (event.target.id === 'authSignUp') {
      event.preventDefault();

      const user = await app.signUp();

      if (user) {
        await app.fetchUsers();
        setTimeout(() => {
          document.getElementById('auth')?.remove();
          document.getElementById('menu').classList.remove('undisplayed');
          document.getElementById('board').classList.remove('undisplayed');
          app.showSignIn();
        }, 1500);
      }
    }

    if (event.target.id === 'signInBtn') {
      app.showSignIn();
    }

    if (event.target.id === 'authSignIn') {
      event.preventDefault();

      const user = await app.signIn();

      if (user) {
        setTimeout(() => {
          document.getElementById('auth')?.remove();
          document.getElementById('menu').classList.remove('undisplayed');
          document.getElementById('board').classList.remove('undisplayed');
        }, 1500);
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
      app.showProfile();
    }

    if (event.target.id === 'passwordBtn') {
      event.preventDefault();
      event.target.classList.toggle('active');
      const input = event.target.nextElementSibling;

      if (input.type === 'password') {
        input.type = 'text';
      } else {
        input.type = 'password';
      }
    }

    if (event.target.id === 'saveProfileBtn') {
      event.preventDefault();
      await app.editUser();
    }

    if (event.target.id === 'logOutBtn') {
      app.logOut();
    }

    if (event.target.id === 'closeTaskFormBtn') {
      event.preventDefault();
      const overlay = document.getElementById('overlay');
      overlay.innerHTML = '';
      overlay.classList.remove('active');
    }

    if (event.target.id === 'createTaskBtn') {
      event.preventDefault();
      await app.addTask();
    }

    if (event.target.id === 'overlay') {
      const overlay = document.getElementById('overlay');
      overlay.classList.remove('active');
    }

    if (event.target.id === 'deleteTaskBtn') {
      const taskId = event.target.closest('.task-card')?.id.split('-').at(-1)
        || event.target.closest('.full-task-card')?.id.split('-').at(-1);

      await app.deleteTask(taskId);
    }

    if (event.target.id === 'editTaskBtn') {
      const taskId = event.target.closest('.task-card')?.id.split('-').at(-1)
        || event.target.closest('.full-task-card')?.id.split('-').at(-1);

      app.showTaskForm('edit', taskId);
    }

    if (event.target.id === 'editTaskFormBtn') {
      event.preventDefault();
      await app.editTask();
    }

    if (event.target.id === 'showFilterBtn') {
      event.preventDefault();
      const filter = event.target.nextElementSibling;
      filter.classList.toggle('active');
    }

    if (event.target.id === 'errorBtn') {
      app.backToMain();
    }
  });

  document.getElementById('addTaskBtn').addEventListener('click', () => {
    app.showTaskForm('add', null);
  });
};
