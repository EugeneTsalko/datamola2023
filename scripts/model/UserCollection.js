class UserCollection {
  constructor(usersArr) {
    // this._collection = usersArr.map((user) => new User(...Object.values(user)));
    this.restore();
  }

  get collection() {
    return this._collection;
  }

  add(login, name, image) {
    try {
      const newUser = new User(login, name, image);

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
