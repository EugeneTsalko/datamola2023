import { checkStr, checkIsLoginValid } from './utils.js';
import { TASK_MAX_LENGTH } from '../constants/constants.js';

const commentSchema = {
  _id: (value) => checkStr(value),
  text: (value) => checkStr(value, TASK_MAX_LENGTH.comment),
  _createdAt: (value) => value instanceof Date,
  author: (value) => checkIsLoginValid(value),
};

export default commentSchema;
