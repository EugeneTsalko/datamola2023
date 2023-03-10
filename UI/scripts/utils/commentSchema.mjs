import { checkStr, checkIsLoginValid } from './utils.mjs';
import { TASK_MAX_LENGTH } from '../constants/constants.mjs';

export const commentSchema = {
  id: (value) => checkStr(value),
  text: (value) => checkStr(value, TASK_MAX_LENGTH.comment),
  createdAt: (value) => value instanceof Date,
  author: (value) => checkIsLoginValid(value),
};
