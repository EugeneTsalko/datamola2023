class ProfileView {
  constructor(parentId) {
    this.root = document.getElementById(parentId);
  }

  display(user, type) {
    try {
      if (!checkIsObj(user)) {
        throw new Error('Parameter user should be obj User.');
      }

      // this.root.innerHTML = '';

      this.root.append(DomHelper.createProfilePage(user, type));

      console.log('Render Profile view!');
    } catch (err) {
      console.error(err.message);
    }
  }
}
