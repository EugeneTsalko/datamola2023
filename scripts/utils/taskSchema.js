const taskSchema = {
  id: (value) => checkStr(value),
  name: (value) => checkStr(value, TASK_MAX_LENGTH.name),
  description: (value) => checkStr(value, TASK_MAX_LENGTH.description),
  createdAt: (value) => value instanceof Date,
  assignee: (value) => checkIsLoginValid(value),
  status: (value) => Object.values(TASK_STATUS).includes(value),
  priority: (value) => Object.values(TASK_PRIORITY).includes(value),
  isPrivate: (value) => typeof value === 'boolean',
  comments: (value) => Array.isArray(value),
};
