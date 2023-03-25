function setCurrentUser(user) {
  try {
    if (!checkIsLoginValid(user)) {
      throw new Error(getCustomError.invalidLogin('setCurrentUser'));
    }

    // имхо tasks и headerView правильнее передавать параметрами во все ф-ции, но в ТЗ так
    // придумать как переделать на единый источник истины
    tasks.user = user;
    headerView.display({ user });
    filterView.display({ user });

    DomHelper.reRenderTaskColumn('To Do', user);
    DomHelper.reRenderTaskColumn('In progress', user);
    DomHelper.reRenderTaskColumn('Complete', user);
  } catch (err) {
    console.error(err.message);
  }
}

function logOutUser() {
  try {
    if (!tasks.user) {
      throw new Error('Before log out you need to Sign In.');
    }

    document.getElementById('fullTask')?.remove();
    document.getElementById('menu').classList.remove('undisplayed');
    document.getElementById('board').classList.remove('undisplayed');

    tasks.logOut();
    headerView.display();
    filterView.display();

    DomHelper.reRenderTaskColumn('To Do');
    DomHelper.reRenderTaskColumn('In progress');
    DomHelper.reRenderTaskColumn('Complete');
  } catch (err) {
    console.error(err.message);
  }
}

function addTask(task) {
  try {
    const {
      name, description, status, priority, isPrivate,
    } = task;
    if (!tasks.add(name, description, status, priority, isPrivate)) {
      throw new Error('Task wasn`t added.');
    }

    DomHelper.reRenderTaskColumn(task.status);
  } catch (err) {
    console.error(err.message);
  }
}

function editTask(id, task) {
  try {
    const {
      name, description, assignee, status, priority, isPrivate,
    } = task;
    const oldTask = tasks.get(id);

    if (!tasks.edit(id, name, description, assignee, status, priority, isPrivate)) {
      throw new Error('Task wasn`t edited.');
    }

    if (oldTask.status === status) {
      DomHelper.reRenderTaskColumn(status);
    } else {
      DomHelper.reRenderTaskColumn(oldTask.status);
      DomHelper.reRenderTaskColumn(status);
    }
  } catch (err) {
    console.error(err.message);
  }
}

function removeTask(id) {
  try {
    const task = tasks.get(id);

    if (!tasks.remove(id)) {
      throw new Error('Task wasn`t removed.');
    }

    DomHelper.reRenderTaskColumn(task.status);
  } catch (err) {
    console.error(err.message);
  }
}

function showTask(id) {
  try {
    const task = tasks.get(id);

    if (!task || !tasks.user) {
      throw new Error('Task page can`t be shown.');
    }

    document.getElementById('fullTask')?.remove();
    document.getElementById('menu').classList.add('undisplayed');
    document.getElementById('board').classList.add('undisplayed');

    headerView.display({ user: tasks.user, isTaskPage: true });
    taskPage.display(task);
  } catch (err) {
    console.error(err.message);
  }
}

function closeTask() {
  try {
    if (!tasks.user) {
      throw new Error('You need to be authorized for this.');
    }

    document.getElementById('fullTask')?.remove();
    document.getElementById('menu').classList.remove('undisplayed');
    document.getElementById('board').classList.remove('undisplayed');

    headerView.display({ user: tasks.user });
  } catch (err) {
    console.error(err.message);
  }
}
