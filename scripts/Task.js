import tasks from './mockData/mockTasks.js';
import taskSchema from './utils/taskSchema.js';
import {
  checkIsObj, generateId, getCustomError, validateObjBySchema,
} from './utils/utils.js';

class Task {
  constructor(name, description, assignee, status, priority, isPrivate, comments) {
    this._id = generateId(tasks);
    this.name = name;
    this.description = description;
    this._createdAt = new Date();
    this.assignee = assignee;
    this.status = status;
    this.priority = priority;
    this.isPrivate = isPrivate || false;
    this.comments = comments || [];
  }

  get id() {
    return this._id;
  }

  get createdAt() {
    return this._createdAt;
  }

  static validate(task) {
    try {
      if (!checkIsObj(task)) {
        throw new Error(getCustomError.invalidObjParam('task', 'validateTask'));
      }

      const error = validateObjBySchema(task, taskSchema, 'validateTask');

      if (error) {
        throw error;
      }

      console.log('Task is valid!');

      return true;
    } catch (err) {
      console.error(err.message);

      return false;
    }
  }
}

// const task = new Task();

// console.log(task);

// console.log(Task.validate(task));

// // task.id = 1;
// console.log(task.id);
// console.log(task._id);
