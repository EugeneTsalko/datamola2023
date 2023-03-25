class TaskFeedView {
  constructor(parentId) {
    this.root = document.getElementById(parentId);
  }

  display(params) {
    try {
      if (checkIsObj(params)) {
        const { user, tasks } = params;

        if (tasks) {
          this.root.innerHTML = '';
          // TODO убрать этот слайс, сделать что-то поумнее
          tasks
            .slice(0, 10)
            .forEach((task) => this.root.append(DomHelper.createTaskCard(task, user)));

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
