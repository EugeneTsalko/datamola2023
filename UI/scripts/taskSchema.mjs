export const taskSchema = {
  id: (value) => typeof value === 'string',
  name: (value) => typeof value === 'string' && value.length <= 100,
  description: (value) => typeof value === 'string' && value.length <= 280,
  createdAt: (value) => value instanceof Date,
  assignee: (value) => /^[a-zA-Z]+$/.test(value),
  status: (value) => value === 'To Do' || value === 'In progress' || value === 'Complete',
  priority: (value) => value === 'Low' || value === 'Medium' || value === 'High',
  isPrivate: (value) => typeof value === 'boolean',
  comments: (value) => Array.isArray(value),
};
