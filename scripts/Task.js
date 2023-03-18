import taskSchema from './utils/taskSchema.js';
import { validateObjBySchema } from './utils/utils.js';

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
    console.error(`Property "id" is protected. You can't change "${this._id}" to "${value}"`);
  }

  get createdAt() {
    return this._createdAt;
  }

  set createdAt(value) {
    console.error(
      `Property "createdAt" is protected. You can't change "${this._createdAt}" to "${value}"`,
    );
  }

  static validate(task) {
    try {
      if (!(task instanceof Task)) {
        throw new Error('Parameter should be an instance of Task class.');
      }

      const error = validateObjBySchema(task, taskSchema, 'validateTask');

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
