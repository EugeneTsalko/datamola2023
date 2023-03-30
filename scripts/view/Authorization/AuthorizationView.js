class AuthorizationView {
  constructor(parentId) {
    this.root = document.getElementById(parentId);
  }

  display(type) {
    try {
      this.root.append(DomHelper.createAuthPage(type));

      console.log(`Render ${type} view!`);
    } catch (err) {
      console.error(err.message);
    }
  }
}
