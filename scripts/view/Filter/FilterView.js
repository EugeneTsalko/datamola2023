class FilterView {
  constructor(parentId) {
    this.root = document.getElementById(parentId);
  }

  display(params) {
    try {
      if (checkIsObj(params)) {
        const { isAuth, assignees } = params;

        if (isAuth) {
          document.getElementById('addTaskBtn').classList.remove('hidden');
        }

        if (assignees) {
          // TODO сделать прием ассайни из массива тасок
          this.root.append();
        }
      }
    } catch (err) {
      console.error(err.message);
    }
  }
}
