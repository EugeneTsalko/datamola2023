class TaskView {
  constructor(parentId, task) {
    this.root = document.getElementById(parentId);
    this.node = DomHelper.createNode('section', ['full-task-container']);
    const {
      id, name, description, createdAt, assignee, status, priority, isPrivate, comments,
    } = task;
    this.node.innerHTML = `
      <div class="full-task-card">

        <div class="full-task-header">
          <h2 class="title">
            ${name}
          </h2>
          <div class="full-task-buttons">
            <button class="btn secondary-btn edit-btn"></button>
            <button class="btn secondary-btn delete-btn"></button>
          </div>
          <div class="task-priority ${priority.toLowerCase()}">${priority}</div>
        </div>

        <div class="full-task-description">
          <h3>Description</h3>
          <p>
            ${description}
          </p>
        </div>

        <div class="full-task-footer">
          <div class="full-task-info">
            <span class="full-task-info-title">date</span>
            <div class="full-task-date">
              <span>${createdAt.getUTCHours()}:${createdAt.getUTCMinutes()}</span>
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
      </div>
    </div>
    <div class="comments-container">
      <h3>Comments</h3>
      <div class="comments">
        <ul>
          <li>
            <div class="comment">
              <p class="comment-text">
                This description contains 280 symbols. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Veniam voluptatum minus neque perspiciatis natus beatae magnam
                mollitia pariatur. Libero deserunt consectetur quam voluptatibus debitis illum
                error maiores perspicia?
              </p>
              <div class="comment-footer">
                <div class="comment-author">
                  <img class="author-img" src="./assets/png/user-img-5.png" alt="author image">
                  <span class="author-name">This name contains 100 symbols. Lorem ipsum dolor sit amet consectetur
                    adipisicin?</span>
                </div>
                <div class="comment-date-container">
                  <span class="comment-date">Feb 15</span>
                  <span class="comment-time">12:00</span>
                </div>
              </div>
            </div>
          </li>
          
        </ul>
      </div>
      <form class="add-comment-form">
        <img class="user-img" src="./assets/png/user-img-5.png" alt="author image">
        <textarea name="comment" id="new-comment" class="comment-textarea" maxlength="280"
          placeholder="Add new comment..."></textarea>
        <button class="btn secondary-btn add-comment-btn" type="submit">
          <span>ADD COMMENT</span>
        </button>
      </form>
    </div>
      `;
  }

  display() {
    this.root.append(this.node);
  }
}
