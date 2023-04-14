window.onload = async function () {
  console.log('Page is loaded!');

  // setInterval(() => {
  //   console.log('short polling');
  // }, 1000); // mock short polling

  // постараюсь избавится от этого файла, разнести логику по классам.

  await app.start();

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

    if (event.target.id === 'loadMoreBtn') {
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

    if (event.target.id === 'saveProfileBtn') {
      event.preventDefault();
      try {
        const { user } = app;
        const name = document.getElementById('name').value;
        // const oldPassword = document.getElementById('oldPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const retypedPassword = document.getElementById('confirmPassword').value;
        const photo = document.querySelector('input[name="avatar"]:checked')?.value || user.photo;

        // if (user.userName === name) {
        //   throw new Error('New name must not be the same as the old one.', { cause: 'name' });
        // }

        // if (newPassword === oldPassword) {
        //   throw new Error('Password must not be the same as the old one.', {
        //     cause: 'newPassword',
        //   });
        // }

        // if (app.editUser(name, image, newPassword)) {
        //   app.showProfile();
        // }

        const response = await app.api.editUser(user.id, name, newPassword, retypedPassword, photo);
        console.log(response);

        if (response.message) {
          throw new Error(response.message);
        }

        app.user = response;
        localStorage.setItem('user', JSON.stringify(response));
        app.showProfile();
      } catch (err) {
        const nameError = document.getElementById('nameError');
        nameError.textContent = err.message;
      }
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
      const overlay = document.getElementById('overlay');
      const name = document.getElementById('setTitle').value;
      const description = document.getElementById('setDescription').value;
      const assignee = app.getUserByUserName(document.getElementById('setAssignee').value);
      const priority = document.querySelector('input[name="setPriority"]:checked')?.value;
      const isPrivate = document.querySelector('input[name="setPrivacy"]:checked')?.value === TASK_PRIVACY.private;
      const status = document.querySelector('input[name="setStatus"]:checked')?.value || TASK_STATUS.toDo;
      const response = await app.api.addTask(
        name,
        description,
        assignee.id,
        status,
        priority,
        isPrivate,
      );

      console.log(response);
      if (!response.error) {
        await app.backToMain();
        overlay.classList.remove('active');
        overlay.innerHTML = '';
      }
    }

    if (event.target.id === 'overlay') {
      const overlay = document.getElementById('overlay');
      overlay.classList.remove('active');
    }

    if (event.target.id === 'deleteTaskBtn') {
      const taskId = event.target.closest('.task-card')?.id.split('-').at(-1)
        || event.target.closest('.full-task-card')?.id.split('-').at(-1);
      const modal = DomHelper.showModal();
      document.body.append(modal);

      document.getElementById('modalConfirm').addEventListener('click', async () => {
        const response = await app.api.deleteTask(taskId);
        console.log(response);
        if (!response.error) {
          await app.backToMain();
          modal.remove();
        }
      });

      document.getElementById('modalCancel').addEventListener('click', () => {
        modal.remove();
      });
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
      const assignee = app.getUserByUserName(document.getElementById('setAssignee').value);
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

      const response = await app.api.editTask(
        taskId,
        name,
        description,
        assignee.id,
        status,
        priority,
        isPrivate,
      );

      console.log(response);
      if (!response.error) {
        if (document.getElementById('fullTask')) {
          await app.showTask(taskId);
          overlay.classList.remove('active');
          overlay.innerHTML = '';
        } else {
          await app.backToMain();
          overlay.classList.remove('active');
          overlay.innerHTML = '';
        }
      }
    }
  });

  document.getElementById('addTaskBtn').addEventListener('click', () => {
    app.showTaskForm('add', null);
  });
};

document.addEventListener('error', (event) => {
  console.log('popup ', eevnt.message);
});
