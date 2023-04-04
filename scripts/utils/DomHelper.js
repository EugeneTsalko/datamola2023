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

  static createTaskCard(task, user) {
    const {
      _id, name, description, _createdAt, assignee, status, priority, isPrivate, comments,
    } = task;
    const container = DomHelper.createNode('li', [], { id: `task-${_id}` });

    container.addEventListener('click', (event) => {
      if (event.target.id === 'deleteTaskBtn' || event.target.id === 'editTaskBtn') {
        return;
      }
      console.log('CLICK ON TASK CARD');
      app.showTask(event.currentTarget.id.split('-').at(-1));
      app.fullTask.listen();
    });

    container.innerHTML = `
      <div class="task-card" id="task-${_id}">
        <div class="task-header">
          <h4>${name}</h4>
          <div class="task-buttons ${assignee === user ? '' : 'hidden'}">
            <button class="btn secondary-btn edit-btn" id="editTaskBtn"></button>
            <button class="btn secondary-btn delete-btn" id="deleteTaskBtn"></button>
          </div>
          <div class="task-priority ${priority.toLowerCase()}">${priority}</div>
        </div>
        <div class="task-description">${description}</div>
        <div class="task-footer">
          <div class="task-info-container">
            <div class="task-date-container">
              <span class="task-time">${getHumanTime(_createdAt)}</span>
              <span class="task-date">${getHumanDate(_createdAt)}</span>
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
            <img class="assignee-img" src="${getUser(assignee, mockUsers)?.img}" alt="assignee img">
          </div>
        </div>
      </div>`;

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
            <img class="author-img" src="${getUser(author, mockUsers)?.img}" alt="author image">
            <span class="author-name">${author}</span>
          </div>
          <div class="comment-date-container">
            <span class="comment-date">${getHumanDate(_createdAt)}</span>
            <span class="comment-time">${getHumanTime(_createdAt)}</span>
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

    const addCommentForm = DomHelper.createNode('form', ['add-comment-form'], {
      id: 'commentForm',
    });
    addCommentForm.innerHTML = `
      <img class="user-img" src="${getUser(user, mockUsers)?.img}" alt="author image">
      <textarea name="comment" id="newComment" class="comment-textarea" maxlength="280" placeholder="Add new comment..."></textarea>
      <button class="btn secondary-btn add-comment-btn" type="submit" id="addCommentBtn">
        <span>ADD COMMENT</span>
      </button>`;

    container.append(h3, commentsContainer, addCommentForm);

    return container;
  }

  static createFullTask(task, user) {
    const {
      _id, name, description, _createdAt, assignee, status, priority, isPrivate, comments,
    } = task;
    const container = DomHelper.createNode('section', ['full-task-container'], { id: 'fullTask' });

    const fullTask = DomHelper.createNode('div', ['full-task-card'], { id: `task-${_id}` });

    fullTask.innerHTML = `
      <div class="full-task-header">
        <h2 class="title">${name}</h2>
        <div class="full-task-buttons ${assignee === user ? '' : 'hidden'}">
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
            <span>${getHumanTime(_createdAt)}</span>
            <span>${getHumanDate(_createdAt)}</span>
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
            <img class="full-task-assignee-img" 
            src="${getUser(assignee, mockUsers)?.img}" alt="assignee image">
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

  static createTaskForm(type, task, assignees) {
    const container = DomHelper.createNode('form', ['task-form'], { id: 'taskForm' });
    const isEdit = type === 'edit';

    container.innerHTML = `
    <div class="form-header">
      <h2 id="taskFormHeader">${isEdit ? `Edit Task with id: ${task._id}` : 'New Task'}</h2>
      <button class="btn icon-btn close-btn" id="closeTaskFormBtn"></button>
    </div>

    <label for="setTitle" class="text-input">
      <input type="text" id="setTitle" maxlength="100" placeholder="&nbsp;" value="${
  isEdit ? task.name : ''
}">
      <span class="label">Title*</span>
      <span class="focus-bg"></span>
    </label>
  
    <label for="setDescription">
      Description*
      <textarea class="description-area" name="description" id="setDescription" cols="30" rows="10"
        maxlength="280">${isEdit ? task.description : ''}</textarea>
    </label>
  
    <label for="setAssignee">
      Assignee
      <select id="setAssignee">
        <option value="You">You</option>
        <option value="IvanovIvan">IvanovIvan</option>
      </select>
    </label>
  
    <div>
      <p>Priority*</p>
      <input type="radio" id="low" value="Low" name="setPriority">
      <label for="low">Low</label>
      <input type="radio" id="medium" value="Medium" name="setPriority">
      <label for="medium">Medium</label>
      <input type="radio" id="high" value="High" name="setPriority">
      <label for="high">High</label>
    </div>
  
    <div>
      <p>Privacy</p>
      <input type="radio" id="public" value="Public" name="setPrivacy">
      <label for="public">Public</label>
      <input type="radio" id="private" value="Private" name="setPrivacy">
      <label for="private">Private</label>
    </div>
  
    <div>
      <p>Status</p>
      <input type="radio" id="toDo" value="To Do" name="setStatus">
      <label for="toDo">To Do</label>
      <input type="radio" id="inProgress" value="In progress" name="setStatus">
      <label for="inProgress">In progress</label>
      <input type="radio" id="complete" value="Complete" name="setStatus">
      <label for="complete">Complete</label>
    </div>

    <div>
      <button class="btn secondary-btn" type="reset">RESET</button>
      <button class="btn" type="submit" id="${isEdit ? 'editTaskFormBtn' : 'createTaskBtn'}">${
  isEdit ? 'EDIT' : 'CREATE'
}</button>
    </div>`;

    return container;
  }
}
