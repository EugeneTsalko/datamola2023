class DomHelper {
  static createNode(tag, classNames = [], attributes = {}, textContent = '') {
    const node = document.createElement(tag);

    if (classNames.length) {
      node.classList.add(...classNames);
    }

    if (Object.keys(attributes).length) {
      Object.keys(attributes).forEach((key) => node.setAttribute(key, attributes[key]));
    }

    if (textContent) {
      node.textContent = textContent;
    }

    return node;
  }

  static createTaskCard(task, isAuth) {
    const li = document.createElement('li');
    const { _id, name, description, _createdAt, assignee, status, priority, isPrivate, comments } =
      task;

    li.innerHTML = `
    <div class="task-card" id="task-${_id}">
      <div class="task-header">
        <h4>${name}</h4>
        <div class="task-buttons">
          <button class="btn secondary-btn edit-btn ${isAuth ? '' : 'hidden'}"></button>
          <button class="btn secondary-btn delete-btn ${isAuth ? '' : 'hidden'}"></button>
        </div>
        <div class="task-priority ${priority.toLowerCase()}">${priority}</div>
      </div>
      <div class="task-description">${description}</div>
      <div class="task-footer">
        <div class="task-info-container">
          <div class="task-date-container">
            <span class="task-time">${_createdAt.getUTCHours()}:${_createdAt.getUTCMinutes()}</span>
            <span class="task-date">Feb 15</span>
          </div>
          <div class="task-info">
            <span class="task-status">${status}</span>
            <span class="task-privacy">${isPrivate ? 'Private' : 'Public'}</span>
            <div class="task-comments">
              <img src="./assets/svg/comment.svg" alt="comment">
              <span class="task-comment-number">${comments.length}</span>
            </div>
          </div>
        </div>
        <div class="task-assignee">
          <span class="assignee-name">${assignee}</span>
          <img class="assignee-img" src="./assets/png/user-img-4.png" alt="assignee image">
        </div>
      </div>
    </div>
  `;

    return li;
  }

  static createAddMoreBtn() {
    const btn = DomHelper.createNode('button', ['btn', 'secondary-btn', 'load-more-btn']);
    btn.innerHTML = '<img src="./assets/svg/refresh.svg" alt="refresh"><span>Load more</span>';

    return btn;
  }
}
