export const checkStr = (str, maxLength = Number.POSITIVE_INFINITY) => typeof str === 'string' && !!str.trim() && str.trim().length <= maxLength;

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
    errorMessages.forEach((message) => {
      error.message += `${message} \n`;
    });
  }

  return error;
};

export const checkIsLoginValid = (login) => !!login && /^[a-zA-Z]+$/.test(login);

export const generateId = (arr) => {
  let newId = 0;

  if (arr.length) {
    const lastId = arr
      .map((el) => el.id)
      .sort((a, b) => Number(a) - Number(b))
      .at(-1);

    newId = Number(lastId) + 1;
  }

  return newId.toString();
};

export const getComments = (arr) => {
  const comments = [];

  arr.forEach((el) => {
    if (el.comments.length) {
      comments.push(...el.comments);
    }
  });

  return comments;
};

export const getCustomError = {
  invalidId: (funcName) => `Error in ${funcName}. Parameter "id" is required and should be a non-empty string.`,
  taskNotFound: (id, funcName) => `Error in ${funcName}. Task with id: "${id}" was not found".`,
  invalidObjParam: (param, funcName) => `Error in ${funcName}. Parameter ${param} should be an object.`,
  invalidIntegerParam: (param, funcName) => `Error in ${funcName}. Parameter ${param} should be an integer bigger or equal to 0.`,
  invalidLogin: (funcName) => `Error in ${funcName}. Parameter "user" is required and should contain latin letters only with no spaces and numbers.`,
  notEnoughRights: (user, assignee, funcName) => `Error in ${funcName}. User ${user} have no rights to add/edit/remove task with parameter assignee: "${assignee}".`,
  notEnoughParams: (funcName) => `Erorr in ${funcName}. You need to pass more than one parameter.`,
};
