class FilterView extends Component {
  constructor(parentId) {
    super(parentId, 'div', ['menu']);

    const filterContent = `
    <button class="btn secondary-btn add-task-btn">
      <img src="./assets/svg/add.svg" alt="add">
      <span>ADD TASK</span>
    </button>
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

    this.node.innerHTML = filterContent;
  }
}
