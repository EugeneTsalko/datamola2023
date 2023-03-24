class TaskFeedView {
  constructor(parentId) {
    this.root = document.getElementById(parentId);
  }

  display(params) {
    try {
      if (checkIsObj(params)) {
        const { isAuth, tasks } = params;

        if (tasks) {
          tasks.forEach((task) => this.root.append(DomHelper.createTaskCard(task, isAuth)));

          if (tasks.length > 10) {
            this.root.append(DomHelper.createAddMoreBtn());
          }
        }
      }
    } catch (err) {
      console.error(err.message);
    }
  }
}
