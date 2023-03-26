// думаю, что для независимой работы пагинации
// внутри колумнов будет использоваться что-то типа ф-ций ниже
// TODO придумать как это переписать по DRY при использовании с ивентами

function getToDoFeed(skip = 0, top = 10, filterConfig = null) {
  toDoTaskFeed.display({
    user: tasks.user,
    tasks: tasks.getPage(skip, top, filterConfig, TASK_STATUS.toDo),
  });
  console.log(`Render column ${TASK_STATUS.toDo}`);
}

function getInProgressTaskFeed(skip = 0, top = 10, filterConfig = null) {
  inProgressTaskFeed.display({
    user: tasks.user,
    tasks: tasks.getPage(skip, top, filterConfig, TASK_STATUS.inProgress),
  });
  console.log(`Render column ${TASK_STATUS.inProgress}`);
}

function getCompleteTaskFeed(skip = 0, top = 10, filterConfig = null) {
  completeTaskFeed.display({
    user: tasks.user,
    tasks: tasks.getPage(skip, top, filterConfig, TASK_STATUS.complete),
  });
  console.log(`Render column ${TASK_STATUS.complete}`);
}

// этот метод требует доработки, т.к. не могу придумать как нормально юзать TaskCollection.getPage,
// чтобы пагинация работала независимо в колонках.
// Вообще можно обойтись без него, написал потому что требуется в ДЗ

function getFeed(skip = 0, top = 10, filterConfig = null) {
  try {
    getToDoFeed(skip, top, filterConfig);
    getInProgressTaskFeed(skip, top, filterConfig);
    getCompleteTaskFeed(skip, top, filterConfig);
  } catch (err) {
    console.error(err.message);
  }
}

function setCurrentUser(user) {
  try {
    if (!checkIsLoginValid(user)) {
      throw new Error(getCustomError.invalidLogin('setCurrentUser'));
    }

    // имхо tasks и headerView правильнее передавать параметрами во все ф-ции, но в ТЗ так
    // TODO придумать как переделать на единый источник истины по поводу user (мб localStorage)

    tasks.user = user;
    headerView.display({ user });
    filterView.display({ user, assignees: tasks.assignees });

    getFeed();
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
    filterView.display({ assignees: tasks.assignees });

    getFeed();
  } catch (err) {
    console.error(err.message);
  }
}

function addTask(task) {
  try {
    if (!checkIsObj(task)) {
      throw new Error(getCustomError.invalidObjParam('task', 'addTask'));
    }

    const {
      name, description, status, priority, isPrivate,
    } = task;

    if (!tasks.add(name, description, status, priority, isPrivate)) {
      throw new Error('Task wasn`t added.');
    }

    DomHelper.reRenderTaskColumn(status);
  } catch (err) {
    console.error(err.message);
  }
}

function editTask(id, task) {
  try {
    if (!checkStr(id)) {
      throw new Error(getCustomError.invalidId('editTask'));
    }

    if (!checkIsObj(task)) {
      throw new Error(getCustomError.invalidObjParam('task', 'addTask'));
    }

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
