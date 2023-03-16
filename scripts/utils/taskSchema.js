import { checkStr, checkIsLoginValid } from './utils.js';
import { TASK_MAX_LENGTH, TASK_PRIORITY, TASK_STATUS } from '../constants/constants.js';

const taskSchema = {
  _id: (value) => checkStr(value),
  name: (value) => checkStr(value, TASK_MAX_LENGTH.name),
  description: (value) => checkStr(value, TASK_MAX_LENGTH.description),
  _createdAt: (value) => value instanceof Date,
  assignee: (value) => checkIsLoginValid(value),
  status: (value) => Object.values(TASK_STATUS).includes(value),
  priority: (value) => Object.values(TASK_PRIORITY).includes(value),
  isPrivate: (value) => typeof value === 'boolean',
  comments: (value) => Array.isArray(value),
};

export default taskSchema;
