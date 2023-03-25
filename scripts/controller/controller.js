function setCurrentUser(user) {
  try {
    if (!checkIsLoginValid(user)) {
      throw new Error(getCustomError.invalidLogin('setCurrentUser'));
    }

    // имхо tasks и headerView правильнее передавать параметрами во все ф-ции, но в ТЗ так
    // придумать как переделать на единый источник истины
    tasks.user = user;
    headerView.display({ user });
  } catch (err) {
    console.error(err.message);
  }
}

function reRenderTaskColumn(status) {
  let taskFeed = null;
  switch (status) {
    case 'To Do':
      taskFeed = toDoTaskFeed;
      break;
    case 'In progress':
      taskFeed = inProgressTaskFeed;
      break;

    case 'Complete':
      taskFeed = completeTaskFeed;
      break;

    default:
      break;
  }

  taskFeed.display({
    isAuth: true,
    tasks: tasks.getPage(0, tasks.tasks.length, { status }),
  });
}

function addTask(task) {
  try {
    const {
      name, description, status, priority, isPrivate,
    } = task;
    if (!tasks.add(name, description, status, priority, isPrivate)) {
      throw new Error('Task wasn`t added.');
    }

    reRenderTaskColumn(task.status);
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
      reRenderTaskColumn(status);
    } else {
      reRenderTaskColumn(oldTask.status);
      reRenderTaskColumn(status);
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

    reRenderTaskColumn(task.status);
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

    taskPage.display(task);
  } catch (err) {
    console.error(err.message);
  }
}

function closeTask() {
  try {
    document.getElementById('fullTask')?.remove();
    document.getElementById('menu').classList.remove('undisplayed');
    document.getElementById('board').classList.remove('undisplayed');
  } catch (err) {
    console.error(err.message);
  }
}
