class User {
  constructor(login, name, image, password) {
    this._login = login;
    this.name = name;
    this.image = image;
    this.password = password;
  }

  get login() {
    return this._login;
  }

  set login(newLogin) {
    this._login = newLogin;
  }

  static validate(user) {
    try {
      // if (!(user instanceof User)) {
      //   throw new Error(getCustomError.notClassInstance('User'));
      // }

      const error = validateObjBySchema(user, userSchema, 'User.validate');

      if (error) {
        throw error;
      }

      return true;
    } catch (err) {
      console.error(err.message);

      return false;
    }
  }
}
