function setCurrentUser(user, model, headerView) {
  try {
    if (!checkIsLoginValid(user)) {
      throw new Error(getCustomError.invalidLogin('setCurrentUser'));
    }
    if (!(model instanceof TaskCollection)) {
      throw new Error('Parameter "model" is required and should be an instance of TaskCollection.');
    }
    if (!(headerView instanceof HeaderView)) {
      throw new Error(
        'Parameter "headerView" is required and should be an instance of HeaderView.',
      );
    }

    const collection = model;
    collection.user = user;
    headerView.display({ user });
  } catch (err) {
    console.error(err.message);
  }
}
