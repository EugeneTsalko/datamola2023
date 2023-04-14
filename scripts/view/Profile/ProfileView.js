class ProfileView {
  constructor(parentId) {
    this.root = document.getElementById(parentId);
  }

  createProfilePage(user, type) {
    const { login, userName, photo } = user;
    const container = DomHelper.createNode('section', ['user-container'], { id: 'profilePage' });
    const isEdit = type === 'edit';

    container.innerHTML = `
      <div class="profile-info">
        <div class="profile-header">
          <h3>Hi, ${userName}!</h3>
          <button class="btn secondary-btn close-btn ${
  isEdit ? '' : 'undisplayed'
}" id="closeProfileBtn"></button>
          <img class="avatar-img ${
  isEdit ? 'undisplayed' : ''
}" src="data:image/png;base64,${photo}" alt="user-img">
        </div>

        <form class="user-form active" id="profileForm">
          <div class="avatar-container ${isEdit ? '' : 'undisplayed'}">
            <div class="avatar active">
              <img class="avatar-img" src="data:image/png;base64,${photo}" alt="user-img">
            </div>
            <input type="radio" id="maleAvatar" name="avatar" value="${STANDARD_IMG.male}">
            <label for="maleAvatar" class="avatar-male"></label>
            <input type="radio" id="femaleAvatar" name="avatar" value="${STANDARD_IMG.female}">
            <label for="femaleAvatar" class="avatar-female"></label>
            <label class="input-file-label">
              <input type="file" name="avatar">
            </label>
          </div>

          <label for="name" class="text-input">
            <input type="text" id="name" placeholder="&nbsp;" ${isEdit ? '' : 'disabled'} value="${
  isEdit ? '' : `${userName}`
}">
            <span class="label">${isEdit ? 'New name' : 'Name'}</span>
            <span class="focus-bg"></span>
            ${isEdit ? '<p class="error-message" id="nameError"></p>' : ''} 
          </label>

          <label for="login" class="text-input ${isEdit ? 'undisplayed' : ''}">
            <input type="text" id="login" placeholder="&nbsp;" disabled value="${login}">
            <span class="label">Login</span>
            <span class="focus-bg"></span>
          </label>

          <label for="oldPassword" class="text-input">
            ${isEdit ? '<button class="icon-btn password-btn" id="passwordBtn"></button>' : ''}
            <input type="password" id="oldPassword" placeholder="&nbsp;" ${
  isEdit ? '' : 'disabled'
} value="${isEdit ? '' : '********'}">
            <span class="label">${isEdit ? 'Old password' : 'Password'}</span>
            <span class="focus-bg"></span>
            ${isEdit ? '<p class="error-message" id="oldPasswordError"></p>' : ''}
          </label>

          <label for="newPassword" class="text-input ${isEdit ? '' : 'undisplayed'}">
            <button class="icon-btn password-btn" id="passwordBtn"></button>
            <input type="password" id="newPassword" placeholder="&nbsp;">
            <span class="label">New password</span>
            <span class="focus-bg"></span>
            ${isEdit ? '<p class="error-message" id="newPasswordError"></p>' : ''}
          </label>

          <label for="confirmPassword" class="text-input ${isEdit ? '' : 'undisplayed'}">
            <button class="icon-btn password-btn" id="passwordBtn"></button>
            <input type="password" id="confirmPassword" placeholder="&nbsp;">
            <span class="label">Confirm new password</span>
            <span class="focus-bg"></span>
            ${isEdit ? '<p class="error-message" id="confirmPasswordError"></p>' : ''}
          </label>

          <div class="user-form-btns">
            <button id="profileResetBtn" type="reset" class="btn secondary-btn cancel-btn ${
  isEdit ? '' : 'undisplayed'
}" disabled>RESET</button>
            <button class="btn secondary-btn save-btn ${
  isEdit ? '' : 'undisplayed'
}" id="saveProfileBtn" disabled>SAVE</button>
            <button class="btn secondary-btn save-btn ${
  isEdit ? 'undisplayed' : ''
}" id="editProfileBtn">EDIT</button>
          </div>
        </form>
      </div>
      
    <img class="profile-cover" src="./assets/png/profile-cover.png" alt="profile cover">
    `;

    return container;
  }

  listen() {
    const form = document.getElementById('profileForm');
    const {
      name, oldPassword, newPassword, confirmPassword,
    } = form;
    const nameError = document.getElementById('nameError');
    // const oldPasswordError = document.getElementById('oldPasswordError');
    const newPasswordError = document.getElementById('newPasswordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const resetBtn = document.getElementById('profileResetBtn');
    const saveBtn = document.getElementById('saveProfileBtn');
    const closeEditBtn = document.getElementById('closeProfileBtn');

    let isNameValid = false;
    // let isOldPassValid = false;
    let isNewPassValid = false;
    let isConfirmPassValid = false;

    form.addEventListener('input', () => {
      resetBtn.removeAttribute('disabled');
      const isFormValid = isNameValid && isNewPassValid && isConfirmPassValid;
      if (isFormValid) {
        saveBtn.removeAttribute('disabled');
      } else {
        saveBtn.setAttribute('disabled', '');
      }
    });

    name.addEventListener('input', () => {
      if (!checkStr(name.value, USERNAME_MAX_LENGTH)) {
        nameError.innerHTML = 'Name should be 1-100 symbols.';
        isNameValid = false;
      } else {
        nameError.innerHTML = '';
        isNameValid = true;
      }
    });

    // oldPassword.addEventListener('input', () => {
    //   if (!oldPassword.value.length) {
    //     oldPasswordError.innerHTML = 'Invalid password.';
    //     isOldPassValid = false;
    //   } else {
    //     oldPasswordError.innerHTML = '';
    //     isOldPassValid = true;
    //   }
    // });

    newPassword.addEventListener('input', () => {
      if (!newPassword.value.length) {
        newPasswordError.innerHTML = 'Invalid password.';
        confirmPasswordError.innerHTML = 'Invalid password.';
        isNewPassValid = false;
      } else {
        newPasswordError.innerHTML = '';
        isNewPassValid = true;
      }
    });

    confirmPassword.addEventListener('input', () => {
      if (newPassword.value !== confirmPassword.value) {
        confirmPasswordError.innerHTML = 'Passwords should be the same.';
        isConfirmPassValid = false;
      } else {
        confirmPasswordError.innerHTML = '';
        isConfirmPassValid = true;
      }
    });

    resetBtn.addEventListener('click', () => {
      document.querySelectorAll('.error-message').forEach((el) => {
        const p = el;
        p.textContent = '';
      });
    });

    // closeEditBtn.addEventListener('click', (event) => {
    //   event.preventDefault();
    //   app.showProfile();
    // });
  }

  display(user, type) {
    try {
      if (!checkIsObj(user)) {
        throw new Error('Parameter user should be obj User.');
      }

      this.root.append(this.createProfilePage(user, type));

      console.log('Render Profile view!');
    } catch (err) {
      console.error(err.message);
    }
  }
}
