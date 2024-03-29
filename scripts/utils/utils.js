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

const generateId = (arr) => (arr.length ? String(Number(arr.at(-1)?.id) + 1) : '0');

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
  let humanMinutes = new Date(date).getMinutes();

  if (humanMinutes < 10) {
    humanMinutes = `0${humanMinutes}`;
  }

  return `${new Date(date).getHours()}:${humanMinutes}`;
};

const getHumanDate = (date) => new Date(date).toDateString().split(' ').slice(1, 3)
  .join(' ');

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

const getSrcBase64 = (base64) => {
  const firstChar = base64.at(0);
  let result = base64;

  switch (firstChar) {
    case BASE64_TYPE.jpg:
      result = `${BASE64_PREFIX.jpg}${base64}`;
      break;

    case BASE64_TYPE.svg:
      result = `${BASE64_PREFIX.svg}${base64}`;
      break;

    case BASE64_TYPE.gif:
      result = `${BASE64_PREFIX.gif}${base64}`;
      break;

    default:
      result = `${BASE64_PREFIX.png}${base64}`;
      break;
  }

  return result;
};

const blobToDataUrl = (blob) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
  reader.readAsDataURL(blob);
});

const blobToBase64 = (blob) => blobToDataUrl(blob).then((text) => text.slice(text.indexOf(',') + 1));
