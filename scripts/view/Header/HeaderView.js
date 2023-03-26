class HeaderView {
  constructor(parentId) {
    this.root = document.getElementById(parentId);
    this.user = null;
  }

  display(params) {
    try {
      let navContent = `
        <button class="btn secondary-btn">SIGN UP</button>
        <button class="btn">SIGN IN</button>
        `;

      if (checkIsObj(params)) {
        const {
          user, isProfilePage, isTaskPage, isErrorPage,
        } = params;

        if (user) {
          this.user = user;
          navContent = `
            <span>Hi, ${this.user}!</span>
            <button class="btn secondary-btn icon-btn profile-btn"></button>
            <button class="btn logout-btn"></button>
          `;
        }

        if (isTaskPage) {
          navContent = `
            <span>Hi, ${this.user}!</span>
            <a href="index.html" class="btn secondary-btn to-main-btn">
              <img src="./assets/svg/back.svg" alt="return">
              <span>TO MAIN</span>
            </a>
            <button class="btn secondary-btn icon-btn profile-btn"></button>
            <button class="btn logout-btn"></button>
          `;
        }

        if (isProfilePage) {
          navContent = `
            <a href="index.html" class="btn secondary-btn to-main-btn">
              <img src="./assets/svg/back.svg" alt="return">
              <span>TO MAIN</span>
            </a>
            <button class="btn logout-btn"></button>
          `;
        }

        if (isErrorPage) {
          navContent = '';
        }
      }

      this.root.innerHTML = navContent;
      console.log('Render Header');
    } catch (err) {
      console.error(err.message);
    }
  }
}
