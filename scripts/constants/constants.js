const TASK_MAX_LENGTH = {
  name: 100,
  description: 280,
  comment: 280,
};

const TASK_STATUS = {
  toDo: 'To Do',
  inProgress: 'In progress',
  complete: 'Complete',
};

const API_STATUS = {
  toDo: 1,
  inProgress: 2,
  complete: 3,
  all: 0,
};

const TASK_PRIORITY = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

const TASK_PRIVACY = {
  private: 'Private',
  public: 'Public',
};

const USERNAME_MAX_LENGTH = 100;

const AUTH_TYPE = {
  signIn: 'Sign in',
  signUp: 'Sign up',
};

const ENDPOINTS = {
  auth: 'api/auth/login',
  tasks: 'api/tasks',
  editTask: (taskId) => `api/tasks/${taskId}`,
  comments: (taskId) => `api/tasks/${taskId}/comments`,
  allUsers: 'api/user/allUsers',
  myProfile: 'api/user/myProfile',
  register: 'api/user/register',
  editUser: (userId) => `api/user/${userId}`,
};
