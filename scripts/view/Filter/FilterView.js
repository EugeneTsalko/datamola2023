class FilterView {
  constructor(parentId) {
    this.root = document.getElementById(parentId);
  }

  createAssigneeFilter(assignee) {
    const container = document.createElement('li');

    container.innerHTML = `
      <label>
        <input type="checkbox" value="${assignee}" name="assignee" />
        ${assignee}
      </label>`;

    return container;
  }

  display(params) {
    try {
      document.getElementById('filterAssigneeList')?.remove();
      const addTaskBtn = document.getElementById('addTaskBtn');

      if (checkIsObj(params)) {
        const { user, assignees } = params;

        if (user) {
          addTaskBtn.classList.remove('hidden');
        }

        if (!user && !addTaskBtn.classList.contains('hidden')) {
          addTaskBtn.classList.add('hidden');
        }

        if (assignees) {
          const ul = DomHelper.createNode('ul', ['checkbox-dropdown-list'], {
            id: 'filterAssigneeList',
          });
          assignees.forEach((assignee) => ul.append(this.createAssigneeFilter(assignee.userName)));

          this.root.append(ul);
        }
      }

      console.log('Render Filter');
    } catch (err) {
      console.error(err.message);
    }
  }
}
