export const checkStr = (str, maxLength = Number.POSITIVE_INFINITY) => {
  return typeof str === 'string' && !!str.trim() && str.trim().length <= maxLength;
};

export const findTaskById = (id, arr) => arr.find((el) => el.id === id);

export const findTaskIndexById = (id, arr) => arr.findIndex((el) => el.id === id);

export const checkIsObj = (obj) => typeof obj === 'object' && !Array.isArray(obj) && obj !== null;

export const validateObjBySchema = (obj, schema, funcName) => {
  let error = null;
  const errorMessages = Object.keys(schema)
    .filter((key) => !schema[key](obj[key]))
    .map((key) => `Error in ${funcName}. Property "${key}" is not valid.`);

  if (errorMessages.length) {
    error = new Error();
    for (const message of errorMessages) {
      error.message += `${message} \n`;
    }
  }

  return error;
};

export const checkIsLoginValid = (login) => !!login && /^[a-zA-Z]+$/.test(login);

export const generateId = () => Math.floor(Date.now() + Math.random() * 1000).toString();

export const getCustomError = {
  invalidId: (funcName) =>
    `Error in ${funcName}. Parameter "id" is required and should be a non-empty string.`,
  taskNotFound: (id, funcName) => `Error in ${funcName}. Task with id: "${id}" was not found".`,
  invalidObjParam: (funcName) =>
    `Error in ${funcName}. Parameter is required and should be an object.`,
  invalidLogin: (funcName) =>
    `Error in ${funcName}. Parameter "user" is required and should contain latin letters only with no spaces and numbers.`,
  notEnoughRights: (user, assignee, funcName) =>
    `Error in ${funcName}. User ${user} have no rights to add/edit/remove task with parameter assignee: "${assignee}".`,
  notEnoughParams: (funcName) => `Erorr in ${funcName}. You need to pass more than one parameter.`,
};
