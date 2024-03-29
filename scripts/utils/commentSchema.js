const commentSchema = {
  id: (value) => checkStr(value),
  text: (value) => checkStr(value, TASK_MAX_LENGTH.comment),
  createdAt: (value) => value instanceof Date,
  author: (value) => checkIsLoginValid(value),
};
