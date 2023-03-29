class TaskFeedView {
  constructor(parentId) {
    this.root = document.getElementById(parentId);
  }

  display(params) {
    try {
      if (!checkIsObj(params)) {
        throw new Error('Params should be an object {user?: string, tasks: Task[]}.');
      }

      const { user, tasks } = params;

      if (tasks) {
        this.root.innerHTML = '';
        tasks.forEach((task) => {
          if (task.assignee !== user && task.isPrivate) {
            return;
          }
          this.root.append(DomHelper.createTaskCard(task, user));
        });

        if (tasks.length >= 10) {
          this.root.append(DomHelper.createAddMoreBtn());
        }
      }
    } catch (err) {
      console.error(err.message);
    }
  }
}
