class DomHelper {
  // постараюсь перенести большую часть логики отсюда по классам, уже частично сделал
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

  static createTaskCard(task, user) {
    try {
      const {
        id,
        name,
        description,
        createdAt,
        assignee,
        creator,
        status,
        priority,
        isPrivate,
        comments,
      } = task;
      const container = DomHelper.createNode('li', [], { id: `task-${id}` });

      container.addEventListener('click', async (event) => {
        if (event.target.id === 'deleteTaskBtn' || event.target.id === 'editTaskBtn') {
          return;
        }
        await app.showTask(event.currentTarget.id.split('-').at(-1));
        // app.fullTask.listen();
      });

      const isHidden = creator?.login === user?.login;

      container.innerHTML = `
      <div class="task-card" id="task-${id}">
        <div class="task-header">
          <h4>${name}</h4>
          <div class="task-buttons ${isHidden ? '' : 'hidden'}">
            <button class="btn secondary-btn edit-btn" id="editTaskBtn"></button>
            <button class="btn secondary-btn delete-btn" id="deleteTaskBtn"></button>
          </div>
          <div class="task-priority ${priority.toLowerCase()}">${priority}</div>
        </div>
        <div class="task-description">${description}</div>
        <div class="task-footer">
          <div class="task-info-container">
            <div class="task-date-container">
              <span class="task-time">${getHumanTime(createdAt)}</span>
              <span class="task-date">${getHumanDate(createdAt)}</span>
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
            <span class="assignee-name">${assignee?.userName}</span>
            <img class="assignee-img" src="${getSrcBase64(assignee.photo)}" alt="assignee img">
          </div>
        </div>
      </div>`;

      return container;
    } catch (err) {
      console.error(err.message);

      return null;
    }
  }

  static createAddMoreBtn() {
    const btn = DomHelper.createNode('button', ['btn', 'secondary-btn', 'load-more-btn'], {
      id: 'loadMoreBtn',
    });
    btn.innerHTML = '<img src="./assets/svg/refresh.svg" alt="refresh"><span>Load more</span>';

    return btn;
  }

  static createComment(comment) {
    const container = document.createElement('li');
    const {
      id, text, createdAt, creator,
    } = comment;

    container.innerHTML = `
      <div class="comment" id="comment-${id}">
        <p class="comment-text">
          ${text}
        </p>
        <div class="comment-footer">
          <div class="comment-author">
            <img class="author-img" src="${getSrcBase64(creator.photo)}" alt="author image">
            <span class="author-name">${creator.userName}</span>
          </div>
          <div class="comment-date-container">
            <span class="comment-date">${getHumanDate(createdAt)}</span>
            <span class="comment-time">${getHumanTime(createdAt)}</span>
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

    comments
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      .forEach((comment) => commentsList.append(DomHelper.createComment(comment)));
    commentsContainer.append(commentsList);

    const addCommentForm = DomHelper.createNode('form', ['add-comment-form'], {
      id: 'commentForm',
    });
    addCommentForm.innerHTML = `
      <img class="user-img" src="${getSrcBase64(user.photo)}" alt="author image">
      <textarea name="comment" id="newComment" class="comment-textarea" maxlength="280" placeholder="Add new comment..."></textarea>
      <button class="btn secondary-btn add-comment-btn" id="addCommentBtn">
        <span>ADD COMMENT</span>
      </button>`;

    container.append(h3, commentsContainer, addCommentForm);

    return container;
  }

  static createFullTask(task, user) {
    const {
      id,
      name,
      description,
      createdAt,
      assignee,
      creator,
      status,
      priority,
      isPrivate,
      comments,
    } = task;
    const container = DomHelper.createNode('section', ['full-task-container'], { id: 'fullTask' });

    const fullTask = DomHelper.createNode('div', ['full-task-card'], { id: `task-${id}` });

    const isHidden = creator.login === user.login;

    fullTask.innerHTML = `
      <div class="full-task-header">
        <h2 class="title">${name}</h2>
        <div class="full-task-buttons ${isHidden ? '' : 'hidden'}">
          <button class="btn secondary-btn edit-btn" id="editTaskBtn"></button>
          <button class="btn secondary-btn delete-btn" id="deleteTaskBtn"></button>
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
            <span>${getHumanTime(createdAt)}</span>
            <span>${getHumanDate(createdAt)}</span>
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
            <span class="full-assignee-name">${assignee.userName}</span>
            <img class="full-task-assignee-img" 
            src="${getSrcBase64(assignee.photo)}" alt="assignee image">
          </div>
        </div>
      </div>`;

    container.append(fullTask, DomHelper.createCommentsSection(comments, user));

    return container;
  }

  static reRenderTaskColumn(status, user = null) {
    switch (status) {
      case TASK_STATUS.toDo:
        app.getToDoFeed();
        break;

      case TASK_STATUS.inProgress:
        app.getInProgressTaskFeed();
        break;

      case TASK_STATUS.complete:
        app.getCompleteTaskFeed();
        break;

      default:
        break;
    }
  }

  static showModal(type) {
    const modalOverlay = DomHelper.createNode('div', ['overlay', 'active'], { id: 'modalOverlay' });
    const isForm = type === 'form';
    modalOverlay.innerHTML = `
    <section class="modal">
    <div class="modal-header">
      <h3 class="modal-title">${isForm ? 'Reset form?' : 'Delete task?'}</h3>
    </div>
    <p class="modal-text">
    Are you sure?
    ${isForm ? ' This will clear all fields.' : ' This will delete task permanently.'}
    </p>
    <div class="modal-btns">
      <button class="btn secondary-btn" id="modalCancel">CANCEL</button>
      <button class="btn modal-btn" id="modalConfirm">${isForm ? 'RESET' : 'DELETE'}</button>
    </div>
  </section>
    `;

    return modalOverlay;
  }

  static toast(text, type) {
    const className = type === 'error' ? ['toast', 'error'] : ['toast'];
    const content = type === 'error' ? `Ooops... ${text}` : text;
    const toast = DomHelper.createNode('div', className, {}, content);
    document.body.append(toast);
    setTimeout(() => {
      toast.remove();
    }, 3000);
  }
}
