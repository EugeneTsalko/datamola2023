class HeaderView {
  constructor(parentId) {
    this.root = document.getElementById(parentId);
    this.node = DomHelper.createNode('header', ['header'], { id: 'header' });
    this.node.innerHTML = `
      <a href="main.html" class="logo-link"></a>
      <nav class="nav">
        <button class="btn secondary-btn">SIGN UP</button>
        <button class="btn">SIGN IN</button>
      </nav>
    `;
  }

  display(params) {
    try {
      if (checkIsObj(params)) {
        const { user, isProfilePage } = params;
        if (user) {
          this.node.innerHTML = `
            <nav class="nav">
              <span>Hi, ${user}!</span>
              <button class="btn secondary-btn icon-btn profile-btn"></button>
              <button class="btn logout-btn"></button>
            </nav>`;
        }

        if (isProfilePage) {
          this.node.innerHTML = `
          <a href="main.html" class="logo-link"></a>
          <nav class="nav">
            <a href="index.html" class="btn secondary-btn to-main-btn">
              <img src="./assets/svg/back.svg" alt="return">
              <span>TO MAIN</span>
            </a>
            <button class="btn secondary-btn icon-btn profile-btn"></button>
            <button class="btn logout-btn"></button>
          </nav>
          `;
        }
      }

      this.root.prepend(this.node);
    } catch (err) {
      console.error(err.message);
    }
  }
}
