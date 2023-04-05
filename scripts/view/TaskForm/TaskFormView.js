class TaskFormView {
  constructor(parentId) {
    this.root = document.getElementById(parentId);
  }

  createTaskForm(type, task, assignees) {
    const container = DomHelper.createNode('form', ['task-form'], { id: 'taskForm' });
    const isEdit = type === 'edit';

    let assigneesOptions = '';

    assignees.forEach((assignee) => {
      assigneesOptions += `<option value="${assignee}">${assignee}</option>`;
    });

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
        ${assigneesOptions}
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

  display(type, task, assignees) {
    try {
      // if (!checkIsObj(user)) {
      //   throw new Error('Parameter user should be obj User.');
      // }

      this.root.append(this.createTaskForm(type, task, assignees));

      console.log('Render taskForm view!');
    } catch (err) {
      console.error(err.message);
    }
  }
}
