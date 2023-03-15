import { checkStr, checkIsLoginValid } from './utils.js';
import { TASK_MAX_LENGTH } from '../constants/constants.js';

export const commentSchema = {
  id: (value) => checkStr(value),
  text: (value) => checkStr(value, TASK_MAX_LENGTH.comment),
  createdAt: (value) => value instanceof Date,
  author: (value) => checkIsLoginValid(value),
};
