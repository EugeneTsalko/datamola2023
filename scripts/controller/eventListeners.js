window.onload = function () {
  console.log('Page is loaded!');
  // app.header.display();
  app.getFeed();

  const toDolist = document.getElementById('toDoList');

  // toDolist.childNodes.forEach((card) =>
  //   card.addEventListener('click', (event) => {
  //     app.showTask(event.currentTarget.id.split('-')[1]);
  //   }),
  // );

  document.addEventListener('click', (event) => {
    event.preventDefault();

    if (event.target.id === 'toMainBtn') {
      app.backToMain();
    }

    if (event.target.id === 'signUpBtn') {
      console.log('SIGN UP');
    }

    if (event.target.id === 'signInBtn') {
      console.log('SIGN IN');
      //
      app.login('IvanovIvan');
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
  });
};
