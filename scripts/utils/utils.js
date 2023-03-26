const checkStr = (str, maxLength = Number.POSITIVE_INFINITY) => typeof str === 'string' && !!str.trim() && str.trim().length <= maxLength;

const findTaskById = (id, arr) => arr.find((el) => el.id === id);

const findTaskIndexById = (id, arr) => arr.findIndex((el) => el.id === id);

const checkIsObj = (obj) => typeof obj === 'object' && !Array.isArray(obj) && obj !== null;

const validateObjBySchema = (obj, schema, funcName) => {
  let error = null;
  const errorMessages = Object.keys(schema)
    .filter((key) => !schema[key](obj[key.replace('_', '')]))
    .map((key) => `Error in ${funcName}. Property "${key}" is not valid.`);

  if (errorMessages.length) {
    error = new Error();
    errorMessages.forEach((message) => {
      error.message += `${message} \n`;
    });
  }

  return error;
};

const checkIsLoginValid = (login) => !!login && /^[a-zA-Z]+$/.test(login);

const generateId = (arr) => {
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

const getComments = (arr) => {
  const comments = [];

  arr.forEach((el) => {
    if (el.comments.length) {
      comments.push(...el.comments);
    }
  });

  return comments;
};

const getUser = (login, arr) => arr.find((user) => user.login === login);

const getHumanTime = (date) => {
  let humanMinutes = date.getMinutes();

  if (humanMinutes < 10) {
    humanMinutes = `0${humanMinutes}`;
  }

  return `${date.getHours()}:${humanMinutes}`;
};

const getHumanDate = (date) => date.toDateString().split(' ').slice(1, 3).join(' ');

const getCustomError = {
  invalidId: (funcName) => `Error in ${funcName}. Parameter "id" is required and should be a non-empty string.`,
  taskNotFound: (id, funcName) => `Error in ${funcName}. Task with id: "${id}" was not found".`,
  invalidObjParam: (param, funcName) => `Error in ${funcName}. Parameter ${param} should be an object.`,
  invalidIntegerParam: (param, funcName) => `Error in ${funcName}. Parameter ${param} should be an integer bigger or equal to 0.`,
  invalidLogin: (funcName) => `Error in ${funcName}. Parameter "user" is required and should contain latin letters only with no spaces and numbers.`,
  notEnoughRights: (user, assignee, funcName) => `Error in ${funcName}. User ${user} have no rights to add/edit/remove task with parameter assignee: "${assignee}".`,
  notEnoughParams: (funcName) => `Erorr in ${funcName}. You need to pass more than one parameter.`,
  protectedProp: (prop, value, newValue) => `Property "${prop}" is protected. You can't change "${value}" to "${newValue}."`,
  notClassInstance: (className) => `Parameter should be an instance of "${className}" class.`,
};
