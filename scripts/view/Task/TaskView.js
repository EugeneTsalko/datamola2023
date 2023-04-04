class TaskView {
  constructor(parentId) {
    this.root = document.getElementById(parentId);
  }

  listen() {
    document.getElementById('addCommentBtn').addEventListener('click', (event) => {
      event.preventDefault();
      const text = document.getElementById('newComment').value;
      const id = document.querySelector('.full-task-card').id.split('-').at(-1);

      if (text) {
        app.tasks.addComment(id, text);
        document.getElementById('newComment').value = '';
        app.showTask(id);
      }
    });
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
