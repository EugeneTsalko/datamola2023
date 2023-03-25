function setCurrentUser(user) {
  try {
    if (!checkIsLoginValid(user)) {
      throw new Error(getCustomError.invalidLogin('setCurrentUser'));
    }

    // имхо taskCollection и headerView правильнее передавать параметрами, но в ТЗ так
    tasks.user = user;
    headerView.display({ user });
  } catch (err) {
    console.error(err.message);
  }
}

function reRenderTaskColumn(status) {
  // это можно улучшить через выбор коллекции по статусу. и filterConfig {status: status}
  switch (status) {
    case 'To Do':
      toDoTaskFeed.display({
        isAuth: true,
        tasks: tasks.getPage(0, tasks.tasks.length, { status: 'To Do' }),
      });
      break;
    case 'In progress':
      inProgressTaskFeed.display({
        isAuth: true,
        tasks: tasks.getPage(0, tasks.tasks.length, { status: 'In progress' }),
      });
      break;

    case 'Complete':
      completeTaskFeed.display({
        isAuth: true,
        tasks: tasks.getPage(0, tasks.tasks.length, { status: 'Complete' }),
      });
      break;

    default:
      break;
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
