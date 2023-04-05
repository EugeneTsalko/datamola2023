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
          <p class="error-message" id="nameError"></p>
        </label>
        <label for="login" class="text-input">
          <input type="text" id="login" placeholder="&nbsp;">
          <span class="label">Login*</span>
          <span class="focus-bg"></span>
          <p class="error-message" id="loginError"></p>
        </label>
        <label for="password" class="text-input">
          <button class="icon-btn password-btn" id="passwordBtn"></button>
          <input type="password" class="password" id="password" minLength="1" placeholder="&nbsp;">
          <span class="label">Password*</span>
          <span class="focus-bg"></span>
          <p class="error-message" id="passwordError"></p>
        </label>
        <label for="passwordConfirm" class="text-input ${isSignUp ? '' : 'undisplayed'}">
          <button class="icon-btn password-btn" id="passwordBtn"></button>
          <input type="password" id="passwordConfirm" placeholder="&nbsp;">
          <span class="label">Confirm password*</span>
          <span class="focus-bg"></span>
          <p class="error-message" id="passwordConfirmError"></p>
        </label>

        <div class="avatar-wrapper ${isSignUp ? '' : 'undisplayed'}">
          <p>Choose avatar:</p>
          <div class="avatar-container">
            <input type="radio" id="maleAvatar" name="avatar" value="../../UI/assets/svg/man.svg">
            <label for="maleAvatar" class="avatar-male"></label>
            <input type="radio" id="femaleAvatar" name="avatar" value="../../UI/assets/svg/woman.svg">
            <label for="femaleAvatar" class="avatar-female"></label>
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

    return container;
  }

  validateSignIn() {
    try {
      this.listen();
      const form = document.getElementById('authForm');
      const { login, password } = form;

      const user = app.users.get(login.value); //

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
      const loginError = document.getElementById('loginError');
      const passwordError = document.getElementById('passwordError');
      if (err.cause === 'login') {
        loginError.innerHTML = err.message;
      }

      if (err.cause === 'password') {
        passwordError.innerHTML = err.message;
      }

      return null;
    }
  }

  validateSignUp() {
    try {
      this.listen();
      const form = document.getElementById('authForm');
      const { name, login, password } = form;
      const image = document.querySelector('input[name="avatar"]:checked')?.value
        || '../../UI/assets/svg/man.svg';
      const user = new User(login.value, name.value, image, password.value);

      if (!app.users.add(...Object.values(user))) {
        //
        throw new Error(`User with login "${login.value}" already exists.`, { cause: 'login' });
      }

      return user;
    } catch (err) {
      if (err.cause === 'login') {
        const loginError = document.getElementById('loginError');
        loginError.innerHTML = err.message;
      } else {
        console.error(err.message);
      }

      return null;
    }
  }

  listen() {
    const form = document.getElementById('authForm');
    const {
      name, login, password, passwordConfirm,
    } = form;
    const image = document.querySelector('input[name="avatar"]:checked')?.value
      || '../../UI/assets/svg/man.svg';
    const loginError = document.getElementById('loginError');
    const passwordError = document.getElementById('passwordError');
    const nameError = document.getElementById('nameError');
    const passwordConfirmError = document.getElementById('passwordConfirmError');

    form.addEventListener('input', () => {
      const user = new User(login.value, name.value, image, password.value);
      const isFormValid = password.value === passwordConfirm.value && User.validate(user);
      if (isFormValid) {
        document.getElementById('authSignUp').removeAttribute('disabled');
      } else {
        document.getElementById('authSignUp').setAttribute('disabled', '');
      }
    });

    name.addEventListener('input', () => {
      if (!checkStr(name.value, USERNAME_MAX_LENGTH)) {
        nameError.innerHTML = 'Name should be 1-100 symbols.';
      } else {
        nameError.innerHTML = '';
      }
    });

    login.addEventListener('input', () => {
      if (!checkIsLoginValid(login.value)) {
        loginError.innerHTML = 'Invalid login (only latin letters).';
      } else {
        loginError.innerHTML = '';
        passwordError.innerHTML = '';
      }
    });

    password.addEventListener('input', () => {
      if (!password.value.length) {
        passwordError.innerHTML = 'Invalid password.';
      } else {
        passwordError.innerHTML = '';
      }
    });

    passwordConfirm.addEventListener('input', () => {
      if (password.value !== passwordConfirm.value) {
        passwordConfirmError.innerHTML = 'Passwords should be the same.';
      } else {
        passwordConfirmError.innerHTML = '';
      }
    });
  }

  display(type) {
    try {
      this.root.append(this.createAuthPage(type));

      console.log(`Render ${type} view!`);
    } catch (err) {
      console.error(err.message);
    }
  }
}
