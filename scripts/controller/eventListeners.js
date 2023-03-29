window.onload = function () {
  console.log('Page is loaded!');
  app.header.display();
  app.getFeed();

  const toDolist = document.getElementById('toDoList');

  // toDolist.childNodes.forEach((card) =>
  //   card.addEventListener('click', (event) => {
  //     app.showTask(event.currentTarget.id.split('-')[1]);
  //   }),
  // );

  document.addEventListener('click', (event) => {
    if (event.target.id === 'toMainBtn') {
      app.closeTask();
    }
  });
};
