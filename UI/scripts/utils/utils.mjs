export const checkStr = (str, maxLength = Number.POSITIVE_INFINITY) => {
  return typeof str === 'string' && !!str.trim() && str.trim().length <= maxLength;
};

export const findTaskById = (id, arr) => arr.find((el) => el.id === id);

export const checkIsObj = (obj) => typeof obj === 'object' && !Array.isArray(obj) && obj !== null;

export const validateObjBySchema = (obj, schema) => {
  let error = null;
  const errorMessages = Object.keys(schema)
    .filter((key) => !schema[key](obj[key]))
    .map((key) => `Property "${key}" is not valid.`);

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
  invalidTaskObj: (funcName) =>
    `Error in ${funcName}. Parameter "task" is required and should be an object.`,
};
