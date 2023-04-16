class ErrorView {
  constructor(parentId) {
    this.root = document.getElementById(parentId);
  }

  render(message) {}

  display(message) {
    try {
      const errorPage = this.render(message);
      this.root.append(errorPage);
    } catch (err) {
      console.error(err.message);
    }
  }
}
