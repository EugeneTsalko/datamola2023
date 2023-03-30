class ProfileView {
  constructor(parentId) {
    this.root = document.getElementById(parentId);
  }

  display(user) {
    try {
      if (!checkIsObj(user)) {
        throw new Error('Parameter user should be obj User.');
      }

      this.root.append(DomHelper.createProfilePage(user));

      console.log('Render Profile view!');
    } catch (err) {
      console.error(err.message);
    }
  }
}
