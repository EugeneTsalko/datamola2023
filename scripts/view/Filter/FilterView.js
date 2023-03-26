class FilterView {
  constructor(parentId) {
    this.root = document.getElementById(parentId);
  }

  display(params) {
    try {
      const addTaskBtn = document.getElementById('addTaskBtn');

      if (checkIsObj(params)) {
        const { user, assignees } = params;

        console.log(params);

        if (user) {
          addTaskBtn.classList.remove('hidden');
        }

        if (assignees) {
          const ul = DomHelper.createNode('ul', ['checkbox-dropdown-list', 'undisplayed']);

          assignees.forEach((assignee) => ul.append(DomHelper.createAssigneeFilter(assignee)));

          this.root.append(ul);
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
