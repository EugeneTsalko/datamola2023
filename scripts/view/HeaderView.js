class HeaderView {
  constructor(containerId) {
    this.root = document.getElementById(containerId);
    this.header = '';
  }

  display(params) {
    this.root.append(this.header);
  }
}
