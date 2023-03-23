class TaskFeedView {
  constructor(parentId) {
    this.root = document.getElementById(parentId);
    this.node = DomHelper.createNode('section', ['board']);
    this.node.innerHTML = `
      <div class="column">
        <h3>TO DO</h3>
          <ul class="task-list" id="todo-list">
          </ul>
      </div>

      <div class="column">
      <h3>IN PROGRESS</h3>
        <ul class="task-list" id="inProgress-list">
        </ul>
      </div>
      
      <div class="column">
      <h3>COMPLETE</h3>
        <ul class="task-list" id="complete-list">
        </ul>
      </div>
      `;
  }

  display() {
    try {
      this.root.append(this.node);
    } catch (err) {
      console.err(err.message);
    }
  }
}
