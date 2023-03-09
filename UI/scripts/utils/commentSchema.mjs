export const commentSchema = {
  id: (value) => typeof value === 'string',
  text: (value) => typeof value === 'string' && value.length <= 280,
  createdAt: (value) => value instanceof Date,
  author: (value) => /^[a-zA-Z]+$/.test(value),
};
