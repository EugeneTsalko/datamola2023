class HeaderView {
  constructor(parentId) {
    this.root = document.getElementById(parentId);
    this.user = null;
  }

  display(params) {
    try {
      let navContent = `
        <button class="btn secondary-btn" id="signUpBtn">SIGN UP</button>
        <button class="btn" id="signInBtn">SIGN IN</button>
        `;

      if (checkIsObj(params)) {
        const {
          user, isProfilePage, isTaskPage, isErrorPage,
        } = params;

        if (user) {
          this.user = user;
          navContent = `
            <span>Hi, ${this.user}!</span>
            <button class="btn secondary-btn icon-btn profile-btn" id="profileBtn"></button>
            <button class="btn logout-btn" id="logOutBtn"></button>
          `;
        }

        if (isTaskPage) {
          navContent = `
            <span>Hi, ${this.user}!</span>
            <a href="index.html" class="btn secondary-btn to-main-btn" id="toMainBtn">
              <img src="./assets/svg/back.svg" alt="return">
              <span>TO MAIN</span>
            </a>
            <button class="btn secondary-btn icon-btn profile-btn" id="profileBtn"></button>
            <button class="btn logout-btn" id="logOutBtn"></button>
          `;
        }

        if (isProfilePage) {
          navContent = `
            <a href="index.html" class="btn secondary-btn to-main-btn" id="toMainBtn">
              <img src="./assets/svg/back.svg" alt="return">
              <span>TO MAIN</span>
            </a>
            <button class="btn logout-btn" id="logOutBtn"></button>
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
