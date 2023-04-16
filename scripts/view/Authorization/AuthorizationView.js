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

      <p class="error-message" id="formError"></p>

      <button form="auth-form" class="btn" id="${
  isSignUp ? 'authSignUp' : 'authSignIn'
}" disabled>${type.toUpperCase()}</button>
      <div class="auth-footer">
        <span>${isSignUp ? 'Already' : 'Don`t'} have an account?</span>
        <button class="auth-redirect-btn" id="${
  isSignUp ? 'authSignUpRedirBtn' : 'authSignInRedirBtn'
}">${isSignUp ? 'Sign in' : 'Sign up'}</button>
      </div>
    `;

    return container;
  }

  listenSignIn() {
    const form = document.getElementById('authForm');
    const { login, password } = form;

    form.addEventListener('input', () => {
      const isFormValid = password.value && login.value;
      formError.textContent = '';

      if (isFormValid) {
        document.getElementById('authSignIn')?.removeAttribute('disabled');
      } else {
        document.getElementById('authSignIn')?.setAttribute('disabled', '');
      }
    });
  }

  listenSignUp() {
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
    const formError = document.getElementById('formError');

    form.addEventListener('input', () => {
      // eslint-disable-next-line max-len
      const isFormValid = password.value === passwordConfirm.value && login.value && name.value && password.value;

      formError.textContent = '';
      if (isFormValid) {
        document.getElementById('authSignUp')?.removeAttribute('disabled');
        passwordError.textContent = '';
        passwordConfirmError.textContent = '';
      } else {
        document.getElementById('authSignUp')?.setAttribute('disabled', '');
      }

      const defaultPhoto = document.querySelector('input[name="avatar"]:checked');
      const file = document.querySelector('input[type="file"]').files[0];

      if (file && Object.keys(BASE64_TYPE).some((ext) => file.name.includes(`.${ext}`))) {
        document.querySelector('.input-file-label').classList.add('active');
        if (defaultPhoto) {
          defaultPhoto.checked = false;
        }
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
