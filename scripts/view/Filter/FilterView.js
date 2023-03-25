class FilterView {
  constructor(parentId) {
    this.root = document.getElementById(parentId);
  }

  display(params) {
    try {
      const addTaskBtn = document.getElementById('addTaskBtn');

      if (checkIsObj(params)) {
        const { user, assignees } = params;

        if (user) {
          addTaskBtn.classList.remove('hidden');
        }

        if (assignees) {
          // TODO сделать прием ассайни из массива тасок
          this.root.append();
        }
      }

      if (!params && !addTaskBtn.classList.contains('hidden')) {
        addTaskBtn.classList.add('hidden');
      }

      console.log('Render Filter');
    } catch (err) {
      console.error(err.message);
    }
  }
}
