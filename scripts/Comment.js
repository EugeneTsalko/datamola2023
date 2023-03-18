import {
  generateId,
  getComments,
  checkIsObj,
  getCustomError,
  validateObjBySchema,
} from './utils/utils.js';
import tasks from './mockData/mockTasks.js';
import commentSchema from './utils/commentSchema.js';

class Comment {
  constructor(id, text, createdAt, author) {
    this._id = id;
    this.text = text;
    this._createdAt = createdAt;
    this.author = author;
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

  static validate(comment) {
    try {
      if (!(comment instanceof Comment)) {
        throw new Error('Parameter should be an instance of Comment class.');
      }

      const error = validateObjBySchema(comment, commentSchema, 'validateComment');

      if (error) {
        throw error;
      }

      console.log(`Comment with id: "${comment.id}" is valid!`);

      return true;
    } catch (err) {
      console.error(err.message);

      return false;
    }
  }
}

// // test-cases

// const emptyComment = new Comment();
// console.log('Comment.validate not Comment instance: ', Comment.validate({}));
// console.log('Comment.validate empty comment: ', Comment.validate(emptyComment));

// const validComment = new Comment('42', 'text', new Date(), 'login');
// console.log('Comment.validate valid comment: ', Comment.validate(validComment));
