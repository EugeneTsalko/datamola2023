class TaskView {
  constructor(parentId) {
    this.root = document.getElementById(parentId);
  }

  display(task, user) {
    try {
      if (!checkIsObj(task)) {
        throw new Error('Params should be a Task object.');
      }

      this.root.append(DomHelper.createFullTask(task, user));

      console.log('Render full Task!');
    } catch (err) {
      console.error(err.message);
    }
  }
}
