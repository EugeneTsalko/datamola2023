class TaskView {
  constructor(parentId) {
    this.root = document.getElementById(parentId);
  }

  display(task) {
    try {
      if (!checkIsObj(task)) {
        throw new Error('Params should be a Task object.');
      }

      document.getElementById('menu').classList.add('undisplayed');
      document.getElementById('board').classList.add('undisplayed');

      this.root.append(DomHelper.createFullTask(task));
    } catch (err) {
      console.error(err.message);
    }
  }
}
