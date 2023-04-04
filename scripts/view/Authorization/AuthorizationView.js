class AuthorizationView {
  constructor(parentId) {
    this.root = document.getElementById(parentId);
  }

  createAuthPage(type) {
    const container = DomHelper.createNode('section', ['auth'], { id: 'auth' });

    const isSignUp = type === AUTH_TYPE.signUp;

    container.innerHTML = `
      <div class="auth-header">
        <h2>Welcome!</h2>
        <span>${type} to continue.</span>
      </div>

      <form class="auth-form" id="authForm">
        <label for="name" class="text-input ${isSignUp ? '' : 'undisplayed'}">
          <input type="text" id="name" maxlength="100" placeholder="&nbsp;">
          <span class="label">Name*</span>
          <span class="focus-bg"></span>
        </label>
        <label for="login" class="text-input">
          <input type="text" id="login" placeholder="&nbsp;">
          <span class="label">Login*</span>
          <span class="focus-bg"></span>
          <p class="error-message" id="loginError"></p>
        </label>
        <label for="password" class="text-input">
          <input type="password" id="password" minLength="1" placeholder="&nbsp;">
          <span class="label">Password*</span>
          <span class="focus-bg"></span>
          <p class="error-message" id="passwordError"></p>
        </label>
        <label for="passwordConfirm" class="text-input ${isSignUp ? '' : 'undisplayed'}">
          <input type="password" id="passwordConfirm" placeholder="&nbsp;">
          <span class="label">Confirm password*</span>
          <span class="focus-bg"></span>
        </label>

        <div class="avatar-wrapper ${isSignUp ? '' : 'undisplayed'}">
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
  isSignUp ? 'authSignUp' : 'authSignIn'
}" ${isSignUp ? 'disabled' : ''}>${type.toUpperCase()}</button>
      <div class="auth-footer">
        <span>${isSignUp ? 'Already' : 'Don`t'} have an account?</span>
        <button class="auth-redirect-btn" id="${
  isSignUp ? 'authSignUpRedirBtn' : 'authSignInRedirBtn'
}">${isSignUp ? 'Sign in' : 'Sign up'}</button>
      </div>
    `;

    // return container;
    this.root.append(container);
  }

  validateSignIn() {
    try {
      const form = document.getElementById('authForm');
      const { login, password } = form;
      const loginError = document.getElementById('loginError');
      const passwordError = document.getElementById('passwordError');

      const user = app.users.get(login.value); //

      const isValid = false;

      login.addEventListener('input', () => {
        loginError.innerHTML = '';
        passwordError.innerHTML = '';
      });

      password.addEventListener('input', () => {
        passwordError.innerHTML = '';
      });

      if (!login.value || !password.value) {
        if (!login.value) {
          throw new Error('Please, enter your login.', { cause: 'login' });
        }

        if (!password.value) {
          throw new Error('Please, enter your password.', { cause: 'password' });
        }
      }

      if (!user) {
        throw new Error(`User with login "${login.value}" doesn't exist.`, { cause: 'login' });
      }

      if (password.value !== user.password) {
        throw new Error('Invalid password', { cause: 'password' });
      }

      return user;
    } catch (err) {
      if (err.cause === 'login') {
        loginError.innerHTML = err.message;
      }

      if (err.cause === 'password') {
        passwordError.innerHTML = err.message;
      }

      return null;
    }
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
