class UserCollection {
  constructor() {
    this.restore();
  }

  get collection() {
    return this._collection;
  }

  get(login) {
    try {
      if (!checkIsLoginValid(login)) {
        throw new Error(getCustomError.invalidLogin('UserCollection.get'));
      }

      const user = this.collection.find((elem) => elem.login === login);

      if (!user) {
        throw new Error(`User with login: "${login}" was not found.`);
      }

      return user;
    } catch (err) {
      console.error(err.message);

      return null;
    }
  }

  edit(login, name, image, password) {
    try {
      const user = this.get(login);

      user.name = name;
      user.image = image;
      user.password = password;

      if (!User.validate(user)) {
        throw new Error("Can't add invalid user.");
      }

      console.log(`User "${user.login}" has been edited!`);

      this.save();
      return true;
    } catch (err) {
      console.error(err.message);

      return false;
    }
  }

  add(login, name, image, password) {
    try {
      const newUser = new User(login, name, image, password);

      if (!User.validate(newUser)) {
        throw new Error("Can't add invalid user.");
      }

      if (this.collection.map((user) => user.login).includes(newUser.login)) {
        throw new Error(`User with login "${newUser.login}" already exists.`);
      }

      this._collection.push(newUser);
      console.log(`User "${newUser.login}" has been added!`);

      this.save();
      return true;
    } catch (err) {
      console.error(err.message);

      return false;
    }
  }

  save() {
    localStorage.setItem('users', JSON.stringify(this.collection));
  }

  restore() {
    this._collection = JSON.parse(localStorage.getItem('users')).map(
      (user) => new User(...Object.values(user)),
    );
  }
}
