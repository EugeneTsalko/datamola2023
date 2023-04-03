class AuthorizationView {
  constructor(parentId) {
    this.root = document.getElementById(parentId);
  }

  createAuthPage(type) {
    const container = DomHelper.createNode('section', ['auth'], { id: 'auth' });

    container.innerHTML = `
      <div class="auth-header">
        <h2>Welcome!</h2>
        <span>${type} to continue.</span>
      </div>

      <form class="auth-form" id="authForm">
        <label for="name" class="text-input ${type === AUTH_TYPE.signUp ? '' : 'undisplayed'}">
          <input type="text" id="name" maxlength="100" placeholder="&nbsp;">
          <span class="label">Name*</span>
          <span class="focus-bg"></span>
        </label>
        <label for="login" class="text-input">
          <input type="text" id="login" placeholder="&nbsp;">
          <span class="label">Login*</span>
          <span class="focus-bg"></span>
          <p class="error-message"></p>
        </label>
        <label for="password" class="text-input">
          <input type="password" id="password" placeholder="&nbsp;">
          <span class="label">Password*</span>
          <span class="focus-bg"></span>
          <p class="error-message"></p>
        </label>
        <label for="passwordConfirm" class="text-input ${
  type === AUTH_TYPE.signUp ? '' : 'undisplayed'
}">
          <input type="password" id="passwordConfirm" placeholder="&nbsp;">
          <span class="label">Confirm password*</span>
          <span class="focus-bg"></span>
        </label>

        <div class="avatar-wrapper ${type === AUTH_TYPE.signUp ? '' : 'undisplayed'}">
          <p>Choose avatar:</p>
          <div class="avatar-container">
            <button class="icon-btn avatar-btn-male"></button>
            <button class="icon-btn avatar-btn-female"></button>
            <label class="input-file-label">
              <input type="file" name="input-file">
            </label>
          </div>
        </div>
      </form>

      <button type="submit" form="auth-form" class="btn" id="${
  type === AUTH_TYPE.signUp ? 'authSignUp' : 'authSignIn'
}" disabled>${type.toUpperCase()}</button>
      <div class="auth-footer">
        <span>${type === AUTH_TYPE.signUp ? 'Already' : 'Don`t'} have an account?</span>
        <button class="auth-redirect-btn" id="${
  type === AUTH_TYPE.signUp ? 'authSignUpRedirBtn' : 'authSignInRedirBtn'
}">${type === AUTH_TYPE.signUp ? 'Sign in' : 'Sign up'}</button>
      </div>
    `;

    // return container;
    this.root.append(container);
  }

  // static validate(type) {
  //   try {
  //     const login = document.getElementById('login').value;
  //     const password
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // }

  display(type) {
    try {
      // this.root.append(DomHelper.createAuthPage(type));
      // this.root.append(this._createAuthPage(type));
      this.createAuthPage(type);

      console.log(`Render ${type} view!`);
    } catch (err) {
      console.error(err.message);
    }
  }
}
