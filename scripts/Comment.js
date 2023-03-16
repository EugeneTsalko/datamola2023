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
  constructor(text, author) {
    this._id = generateId(getComments(tasks));
    this.text = text;
    this._createdAt = new Date();
    this.author = author;
  }

  get id() {
    return this._id;
  }

  get createdAt() {
    return this._createdAt;
  }

  static validate(comment) {
    try {
      if (!checkIsObj(comment)) {
        throw new Error(getCustomError.invalidObjParam('comment', 'validateComment'));
      }

      const error = validateObjBySchema(comment, commentSchema, 'validateComment');

      if (error) {
        throw error;
      }

      console.log('Comment is valid!');

      return true;
    } catch (err) {
      console.error(err.message);

      return false;
    }
  }
}

// const comment = new Comment();

// console.log(comment);

// console.log(Comment.validate(comment));

// comment.id = 1;
// console.log(comment.id);
// console.log(comment._id);
