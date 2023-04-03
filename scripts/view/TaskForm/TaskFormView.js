class TaskFormView {
  constructor(parentId) {
    this.root = document.getElementById(parentId);
  }

  display(type, taskId) {
    try {
      // if (!checkIsObj(user)) {
      //   throw new Error('Parameter user should be obj User.');
      // }

      this.root.append(DomHelper.createTaskForm(type, taskId));

      console.log('Render TaskForm!');
    } catch (err) {
      console.error(err.message);
    }
  }
}
