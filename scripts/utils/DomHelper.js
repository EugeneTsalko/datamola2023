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
      // console.log(event.target);
      console.log('CLICK ON TASK CARD');
      app.showTask(event.currentTarget.id.split('-').at(-1));
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

  static createAssigneeFilter(assignee) {
    const container = document.createElement('li');

    container.innerHTML = `
      <label>
        <input type="checkbox" value="${assignee}" name="assignee" />
        ${assignee}
      </label>`;

    return container;
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

    const addCommentForm = DomHelper.createNode('form', ['add-comment-form']);
    addCommentForm.innerHTML = `
      <img class="user-img" src="${getUser(user, mockUsers)?.img}" alt="author image">
      <textarea name="comment" id="new-comment" class="comment-textarea" maxlength="280" placeholder="Add new comment..."></textarea>
      <button class="btn secondary-btn add-comment-btn" type="submit">
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

  static createProfilePage(user) {
    const { _login, name, image } = user;
    const container = DomHelper.createNode('section', ['user-container'], { id: 'profilePage' });

    container.innerHTML = `
      <div class="profile-info">
        <div class="profile-header">
          <h3>Hi, ${_login}!</h3>
          <button class="btn secondary-btn close-btn" id="closeProfileBtn"></button>
        </div>

        <form class="user-form active">
          <div class="avatar-container">
            <div class="avatar active">
              <img class="avatar-img" src="${image}" alt="user-img">
            </div>
            <button class="icon-btn avatar-btn-male"></button>
            <button class="icon-btn avatar-btn-female"></button>
            <label class="input-file-label">
              <input type="file" name="input-file">
            </label>
          </div>

          <label for="name" class="text-input">
            <input type="text" id="name" placeholder="&nbsp;">
            <span class="label">New name</span>
            <span class="focus-bg"></span>
          </label>

          <label for="login" class="text-input hidden">
            <input type="text" id="login" placeholder="&nbsp;">
            <span class="label">Username</span>
            <span class="focus-bg"></span>
          </label>

          <label for="old-password" class="text-input">
            <input type="password" id="old-password" placeholder="&nbsp;">
            <span class="label">Old password</span>
            <span class="focus-bg"></span>
          </label>

          <label for="new-password" class="text-input">
            <input type="password" id="new-password" placeholder="&nbsp;">
            <span class="label">New password</span>
            <span class="focus-bg"></span>
          </label>

          <label for="confirm-password" class="text-input">
            <input type="password" id="confirm-password" placeholder="&nbsp;">
            <span class="label">Confirm new password</span>
            <span class="focus-bg"></span>
          </label>

          <div class="user-form-btns">
            <button class="btn secondary-btn cancel-btn">CANCEL</button>
            <button class="btn secondary-btn save-btn">SAVE</button>
          </div>
        </form>
      </div>
      
    <img class="profile-cover" src="./assets/png/profile-cover.png" alt="profile cover">
    `;

    return container;
  }

  static createAuthPage(type) {
    const container = DomHelper.createNode('section', ['auth'], { id: 'auth' });

    container.innerHTML = `
      <div class="auth-header">
        <h2>Welcome!</h2>
        <span>${type} to continue.</span>
      </div>

      <form class="auth-form" id="authForm">
        <label for="name" class="text-input ${type === AUTH_TYPE.signUp ? '' : 'undisplayed'}">
          <input type="text" id="name" maxlength="100" placeholder="&nbsp;">
          <span class="label">Name*</span>
          <span class="focus-bg"></span>
        </label>
        <label for="login" class="text-input">
          <input type="text" id="login" placeholder="&nbsp;">
          <span class="label">Login*</span>
          <span class="focus-bg"></span>
        </label>
        <label for="password" class="text-input">
          <input type="password" id="password" placeholder="&nbsp;">
          <span class="label">Password*</span>
          <span class="focus-bg"></span>
        </label>
        <label for="passwordConfirm" class="text-input ${
  type === AUTH_TYPE.signUp ? '' : 'undisplayed'
}">
          <input type="password" id="passwordConfirm" placeholder="&nbsp;">
          <span class="label">Confirm password*</span>
          <span class="focus-bg"></span>
        </label>

        <div class="avatar-wrapper ${type === AUTH_TYPE.signUp ? '' : 'undisplayed'}">
          <p>Choose avatar:</p>
          <div class="avatar-container">
            <button class="icon-btn avatar-btn-male"></button>
            <button class="icon-btn avatar-btn-female"></button>
            <label class="input-file-label">
              <input type="file" name="input-file">
            </label>
          </div>
        </div>
      </form>

      <button type="submit" form="auth-form" class="btn" id="${
  type === AUTH_TYPE.signUp ? 'authSignUp' : 'authSignIn'
}">${type.toUpperCase()}</button>
      <div class="auth-footer">
        <span>${type === AUTH_TYPE.signUp ? 'Already' : 'Don`t'} have an account?</span>
        <button>${type === AUTH_TYPE.signUp ? 'Sign in' : 'Sign up'}</button>
      </div>
    `;

    return container;
  }

  static createTaskForm(type, taskId, assignees) {
    const container = DomHelper.createNode('form', ['task-form'], { id: 'taskForm' });

    container.innerHTML = `
    <div class="form-header">
      <h2>New Task</h2>
      <button class="btn icon-btn close-btn"></button>
    </div>

    <label for="setTitle" class="text-input">
      <input type="text" id="setTitle" maxlength="100" placeholder="&nbsp;">
      <span class="label">Title*</span>
      <span class="focus-bg"></span>
    </label>
  
    <label for="setDescription">
      Description*
      <textarea class="description-area" name="description" id="setDescription" cols="30" rows="10"
        maxlength="280"></textarea>
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
      <button class="btn" type="submit" id="createTaskBtn">CREATE</button>
    </div>`;

    return container;
  }
}
