export const checkStr = (str, maxLength = Number.POSITIVE_INFINITY) => {
  return typeof str === 'string' && !!str.trim() && str.trim().length <= maxLength;
};

export const findTaskById = (id, arr) => arr.find((el) => el.id === id);

export const checkIsLoginValid = (login) => !!login && /^[a-zA-Z]+$/.test(login);

export const generateId = () => Math.floor(Date.now() + Math.random() * 1000).toString();
