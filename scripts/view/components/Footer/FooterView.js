class FooterView {
  constructor(parentId) {
    this.root = document.getElementById(parentId);
    this.node = DomHelper.createNode('footer', ['footer']);
    this.node.innerHTML = `
      <div class="footer-info">
        <span>© TRELLOMOLA</span>
        <span>v.1.0.0</span>
        <span>Eugene Tsalko</span>
        <span>tefworkmail@gmail.com</span>
      </div>
      <div class="select-lang">
        <label for="lang-select"></label>
        <select name="language" id="lang-select">
          <option value="english">English</option>
          <option value="russian">Русский</option>
        </select>
      </div>
    `;
  }

  display() {
    this.root.append(this.node);
  }
}
