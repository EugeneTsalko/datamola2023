window.onload = function () {
  console.log('Page is loaded!');

  if (localStorage.getItem('user')) {
    app.login(localStorage.getItem('user'));
  } else {
    app.getFeed();
  }

  document.addEventListener('click', (event) => {
    // event.preventDefault();

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
      event.preventDefault();

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
      event.preventDefault();

      const user = app.signIn();

      console.log('auth', user);

      if (user) {
        document.getElementById('auth')?.remove();
        document.getElementById('menu').classList.remove('undisplayed');
        document.getElementById('board').classList.remove('undisplayed');
      }
    }

    if (event.target.id.includes('filter')) {
      event.target.classList.toggle('active');
    }
  });

  // document.addEventListener('input', (event) => {
  //   if (event.target.id === 'assignee') {
  //   }
  // });

  // document.getElementById('filterPrivacyList').addEventListener('change', (event) => {
  //   console.log(document.querySelectorAll('input[name=privacy]:checked'));
  //   const privacy = Array.from(document.querySelectorAll('input[name=privacy]:checked')).map(
  //     (el) => el.id,
  //   );
  // });

  const form = document.querySelector('.filter-bar');

  const filterConfig = {};

  form.addEventListener('change', (event) => {
    const assignees = Array.from(document.querySelectorAll('input[name=assignee]:checked')).map(
      (el) => el.value,
    );

    if (assignees.length) {
      filterConfig.assignee = assignees;
    } else {
      delete filterConfig.assignee;
    }

    const priorities = Array.from(document.querySelectorAll('input[name=priority]:checked')).map(
      (el) => el.value,
    );

    if (priorities.length) {
      filterConfig.priority = priorities;
    } else {
      delete filterConfig.priority;
    }

    const privacy = Array.from(document.querySelectorAll('input[name=privacy]:checked')).map(
      (el) => el.value,
    );

    if (privacy.length === 1) {
      filterConfig.isPrivate = privacy[0] === 'Private';
    } else {
      delete filterConfig.isPrivate;
    }

    const dateFrom = document.getElementById('dateFrom').value;

    if (dateFrom) {
      filterConfig.dateFrom = dateFrom;
    } else {
      delete filterConfig.dateFrom;
    }

    const dateTo = document.getElementById('dateTo').value;

    if (dateTo) {
      filterConfig.dateTo = dateTo;
    } else {
      delete filterConfig.dateTo;
    }

    const textSearch = document.getElementById('search').value;

    if (textSearch) {
      filterConfig.description = textSearch;
    } else {
      delete filterConfig.description;
    }

    console.log(filterConfig);
    app.getFeed(0, 10, filterConfig);
  });

  const search = document.querySelector('.search-form');

  search.addEventListener('input', () => {
    const textSearch = document.getElementById('search').value;

    if (textSearch) {
      filterConfig.description = textSearch;
    } else {
      delete filterConfig.description;
    }

    console.log(filterConfig);
    app.getFeed(0, 10, filterConfig);
  });

  //
};
