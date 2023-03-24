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
    const container = document.createElement('li');
    const {
      _id, name, description, _createdAt, assignee, status, priority, isPrivate, comments,
    } = task;

    container.innerHTML = `
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
            <span class="task-time">${_createdAt.getHours()}:${_createdAt.getMinutes()}</span>
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

    return container;
  }

  static createAddMoreBtn() {
    const btn = DomHelper.createNode('button', ['btn', 'secondary-btn', 'load-more-btn']);
    btn.innerHTML = '<img src="./assets/svg/refresh.svg" alt="refresh"><span>Load more</span>';

    return btn;
  }

  static createComment(comment) {
    const container = document.createElement('li');
    const {
      _id, text, _createdAt, author,
    } = comment;

    container.innerHTML = `            
    <div class="comment" id="comment-${_id}">
    <p class="comment-text">
      ${text}
    </p>
    <div class="comment-footer">
      <div class="comment-author">
        <img class="author-img" src="./assets/png/user-img-5.png" alt="author image">
        <span class="author-name">${author}</span>
      </div>
      <div class="comment-date-container">
        <span class="comment-date">Feb 15</span>
        <span class="comment-time">${_createdAt.getHours()}:${_createdAt.getMinutes()}</span>
      </div>
    </div>
  </div>`;

    return container;
  }

  static createCommentsSection(comments, user) {
    const container = DomHelper.createNode('div', ['comments-container']);
    const h3 = DomHelper.createNode('h3', [], {}, 'Comments');
    const commentsContainer = DomHelper.createNode('div', ['comments']);
    const commentsList = DomHelper.createNode('ul');

    comments.forEach((comment) => commentsList.append(DomHelper.createComment(comment)));
    commentsContainer.append(commentsList);

    const addCommentForm = DomHelper.createNode('form', ['add-comment-form']);
    addCommentForm.innerHTML = `
      <img class="user-img" src="./assets/png/user-img-5.png" alt="author image">
      <textarea name="comment" id="new-comment" class="comment-textarea" maxlength="280" placeholder="Add new comment..."></textarea>
      <button class="btn secondary-btn add-comment-btn" type="submit">
        <span>ADD COMMENT</span>
      </button>`;

    container.append(h3, commentsContainer, addCommentForm);

    return container;
  }

  static createFullTask(task) {
    const {
      _id, name, description, _createdAt, assignee, status, priority, isPrivate, comments,
    } = task;
    const container = DomHelper.createNode('section', ['full-task-container']);

    const fullTask = DomHelper.createNode('div', ['full-task-card'], { id: `task-${_id}` });

    fullTask.innerHTML = `
      <div class="full-task-header">
        <h2 class="title">${name}</h2>
        <div class="full-task-buttons">
          <button class="btn secondary-btn edit-btn"></button>
          <button class="btn secondary-btn delete-btn"></button>
        </div>
        <div class="task-priority ${priority.toLowerCase()}">${priority}</div>
      </div>

      <div class="full-task-description">
        <h3>Description</h3>
        <p>${description}</p>
      </div>

      <div class="full-task-footer">

        <div class="full-task-info">
          <span class="full-task-info-title">date</span>
          <div class="full-task-date">
            <span>${_createdAt.getHours()}:${_createdAt.getMinutes()}</span>
            <span>Feb 15!</span>
          </div>
        </div>

        <div class="full-task-info">
          <span class="full-task-info-title">status</span>
          <span>${status}</span>
        </div>

        <div class="full-task-info">
          <span class="full-task-info-title">privacy</span>
          <span>${isPrivate ? 'Private' : 'Public'}</span>
        </div>

        <div class="full-task-info">
          <span class="full-task-info-title">assignee</span>
          <div class="full-task-assignee">
            <span class="full-assignee-name">${assignee}</span>
            <img class="full-task-assignee-img" src="./assets/png/user-img-5.png" alt="assignee image">
          </div>
        </div>

      </div>`;

    container.append(fullTask, DomHelper.createCommentsSection(comments));

    return container;
  }
}
