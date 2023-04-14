class TaskFormView {
  constructor(parentId) {
    this.root = document.getElementById(parentId);
  }

  createTaskForm(type, task, assignees) {
    const container = DomHelper.createNode('form', ['task-form'], { id: 'taskForm' });
    const isEdit = type === 'edit';

    let assigneesOptions = '';

    assignees.forEach((assignee) => {
      const isSelected = isEdit
        ? assignee.login === task.assignee.login
        : assignee.login === app.user.login;
      assigneesOptions += `<option value="${assignee.userName}" ${isSelected ? 'selected' : ''}
      >${assignee.userName}</option>`;
    });

    container.innerHTML = `
    <div class="form-header">
      <h2 id="taskFormHeader">${isEdit ? `Edit Task with id: ${task.id}` : 'New Task'}</h2>
      <button class="btn icon-btn close-btn" id="closeTaskFormBtn"></button>
    </div>

    <label for="setTitle" class="text-input">
      <input type="text" id="setTitle" maxlength="100" placeholder="&nbsp;" value="${
  isEdit ? task.name : ''
}">
      <span class="label">Title*</span>
      <span class="focus-bg"></span>
    </label>
        
    <textarea class="description-area" name="description" id="setDescription" cols="30" rows="5" placeholder="Description*"
      maxlength="280">${isEdit ? task.description : ''}</textarea>
  
    <label for="setAssignee">
      Assignee
      <select id="setAssignee">
        ${assigneesOptions}
      </select>
    </label>
  
    <div>
      <p>Priority*</p>
      <div class="form-inputs">
        <input type="radio" id="low" value="Low" name="setPriority"  ${
  isEdit && TASK_PRIORITY.low === task.priority ? 'checked' : ''
}>
        <label for="low" class="task-priority low">Low</label>
        <input type="radio" id="medium" value="Medium" name="setPriority" ${
  isEdit && TASK_PRIORITY.medium === task.priority ? 'checked' : ''
}>
        <label for="medium" class="task-priority medium">Medium</label>
        <input type="radio" id="high" value="High" name="setPriority" ${
  isEdit && TASK_PRIORITY.high === task.priority ? 'checked' : ''
}>
        <label for="high" class="task-priority high">High</label>
      </div>
    </div>
  
    <div>
      <p>Privacy</p>
      <div class="form-inputs">
      <input type="radio" id="public" value="Public" name="setPrivacy" ${
  isEdit && !task.isPrivate ? 'checked' : ''
} >
      <label for="public">Public</label>
      <input type="radio" id="private" value="Private" name="setPrivacy"  ${
  isEdit && task.isPrivate ? 'checked' : ''
}>
      <label for="private">Private</label>
      </div>
    </div>
  
    <div>
      <p>Status</p>
      <div class="form-inputs">
      <input type="radio" id="toDo" value="To Do" ${
  isEdit && TASK_STATUS.toDo === task.status ? 'checked' : ''
} name="setStatus">
      <label for="toDo">To Do</label>
      <input type="radio" id="inProgress" value="In progress" ${
  isEdit && TASK_STATUS.inProgress === task.status ? 'checked' : ''
} name="setStatus">
      <label for="inProgress">In progress</label>
      <input type="radio" id="complete" value="Complete" ${
  isEdit && TASK_STATUS.complete === task.status ? 'checked' : ''
} name="setStatus">
      <label for="complete">Complete</label>
      </div>
    </div>

    <div class="form-btns">
      <button class="btn secondary-btn" type="reset">RESET</button>
      <button class="btn" type="submit" id="${isEdit ? 'editTaskFormBtn' : 'createTaskBtn'}">${
  isEdit ? 'EDIT' : 'CREATE'
}</button>
    </div>`;

    return container;
  }

  display(type, task, assignees) {
    try {
      this.root.append(this.createTaskForm(type, task, assignees));

      console.log('Render taskForm view!');
    } catch (err) {
      console.error(err.message);
    }
  }
}
