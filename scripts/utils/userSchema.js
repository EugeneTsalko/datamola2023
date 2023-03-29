const userSchema = {
  login: (value) => checkIsLoginValid(value),
  name: (value) => checkStr(value, USERNAME_MAX_LENGTH),
  image: (value) => checkStr(value),
};
