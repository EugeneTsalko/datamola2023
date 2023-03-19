import taskSchema from './utils/taskSchema.js';
import { validateObjBySchema, getCustomError } from './utils/utils.js';

class Task {
  constructor(id, name, description, createdAt, assignee, status, priority, isPrivate, comments) {
    this._id = id;
    this.name = name;
    this.description = description;
    this._createdAt = createdAt;
    this.assignee = assignee;
    this.status = status;
    this.priority = priority;
    this.isPrivate = isPrivate || false;
    this.comments = comments || [];
  }

  get id() {
    return this._id;
  }

  set id(value) {
    console.error(getCustomError.protectedProp('id', this.id, value));
  }

  get createdAt() {
    return this._createdAt;
  }

  set createdAt(value) {
    console.error(getCustomError.protectedProp('createdAt', this.createdAt, value));
  }

  static validate(task) {
    try {
      if (!(task instanceof Task)) {
        throw new Error(getCustomError.notClassInstance('Task'));
      }

      const error = validateObjBySchema(task, taskSchema, 'Task.validate');

      if (error) {
        throw error;
      }

      console.log(`Task with id: "${task.id}" is valid!`);

      return true;
    } catch (err) {
      console.error(err.message);

      return false;
    }
  }
}

export default Task;

// // test-cases

// const emptyTask = new Task();
// console.log('Task.validate not Task instance: ', Task.validate({}));
// console.log('Task.validate empty task: ', Task.validate(emptyTask));

// const validTask = new Task('42', 'title', 'descr', new Date(), 'login', 'To Do', 'Low', true);
// console.log('Task.validate valid task: ', Task.validate(validTask));
