class FilterView {
  constructor(parentId) {
    this.root = document.getElementById(parentId);
    this.node = DomHelper.createNode('div', ['menu'], { id: 'menu' });
  }

  display(params) {
    try {
      const addTaskBtn = DomHelper.createNode('button', [
        'btn',
        'secondary-btn',
        'add-task-btn',
        'hidden',
      ]);
      addTaskBtn.innerHTML = '<img src="./assets/svg/add.svg" alt="add"><span>ADD TASK</span>';

      const filterContent = `
      <nav>
        <div class="filter-container">
          <button class="btn secondary-btn icon-btn filter-btn"></button>
          <div class="filter-bar">
            <div class="checkbox-dropdown">
              <span>Assignee</span>
            </div>
            <div class="checkbox-dropdown">
              <span>Date</span>
            </div>
            <div class="checkbox-dropdown">
              <span>Privacy</span>
            </div>
            <div class="checkbox-dropdown">
              <span>Priority</span>
            </div>
          </div>
          <form class="search-form">
            <input type="text" class="search" placeholder="Search...">
            <button type="submit" class="search-btn"></button>
          </form>
        </div>
        <div class="view-container">
          <span>View:</span>
          <button class="btn secondary-btn kanban-btn active"></button>
          <button class="btn secondary-btn table-btn"></button>
        </div>
      </nav>`;

      if (checkIsObj(params)) {
        const { isAuth } = params;

        if (isAuth) {
          addTaskBtn.classList.remove('hidden');
        }
      }
      this.node.innerHTML = addTaskBtn.outerHTML + filterContent;

      this.root.prepend(this.node);
    } catch (err) {
      console.err(err.message);
    }
  }
}
