import { validateObjBySchema, getCustomError } from '../utils/utils.js';
import commentSchema from '../utils/commentSchema.js';

class Comment {
  constructor(id, text, createdAt, author) {
    this._id = id;
    this.text = text;
    this._createdAt = createdAt;
    this._author = author;
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

  get author() {
    return this._author;
  }

  set author(value) {
    console.error(getCustomError.protectedProp('author', this.author, value));
  }

  static validate(comment) {
    try {
      if (!(comment instanceof Comment)) {
        throw new Error(getCustomError.notClassInstance('Comment'));
      }

      const error = validateObjBySchema(comment, commentSchema, 'Comment.validate');

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

export default Comment;

// // test-cases

// const emptyComment = new Comment();
// console.log('Comment.validate not Comment instance: ', Comment.validate({}));
// console.log('Comment.validate empty comment: ', Comment.validate(emptyComment));

// const validComment = new Comment('42', 'text', new Date(), 'login');
// console.log('Comment.validate valid comment: ', Comment.validate(validComment));
