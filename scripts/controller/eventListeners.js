window.onload = function () {
  console.log('Page is loaded!');

  if (localStorage.getItem('user')) {
    app.login(localStorage.getItem('user'));
  } else {
    app.getFeed();
  }

  document.addEventListener('click', (event) => {
    event.preventDefault();

    if (event.target.id === 'toMainBtn') {
      app.backToMain();
    }

    if (event.target.id === 'signUpBtn') {
      console.log('SIGN UP');
      //
      app.showSignUp();
    }

    if (event.target.id === 'signInBtn') {
      app.showSignIn();
    }

    if (event.target.id === 'profileBtn') {
      console.log('TO PROFILE!');
      //
      app.showProfile();
    }

    if (event.target.id === 'logOutBtn') {
      app.logOut();
    }

    if (event.target.id === 'addTaskBtn') {
      console.log('ADD TASK!');
    }

    if (event.target.id === 'authSignUp') {
      //
      const user = app.signUp();

      console.log('auth', user);

      if (user) {
        document.getElementById('auth')?.remove();
        document.getElementById('menu').classList.remove('undisplayed');
        document.getElementById('board').classList.remove('undisplayed');
        app.login(user.login);
      }
    }

    if (event.target.id === 'authSignIn') {
      const user = app.signIn();

      console.log('auth', user);

      if (user) {
        document.getElementById('auth')?.remove();
        document.getElementById('menu').classList.remove('undisplayed');
        document.getElementById('board').classList.remove('undisplayed');
      }
    }
  });
};
