class FilterController {
  constructor() {
    this.filterConfig = {};
    this.top = 10;
    this.skip = 0;
  }

  // будет доработано

  listen() {
    const filters = Array.from(document.querySelectorAll('.checkbox-dropdown'));

    const form = document.querySelector('.filter-container');
    const resetBtn = document.getElementById('resetFilterBtn');

    resetBtn.addEventListener('click', (event) => {
      event.preventDefault();
      this.filterConfig = {};
      form.reset();
      app.getFeed(this.skip, this.top, this.filterConfig); //
      resetBtn.classList.add('hidden');
    });

    filters.forEach((el) => {
      el.addEventListener('click', (event) => {
        if (event.target === el.firstElementChild || event.target === el) {
          event.currentTarget.classList.toggle('active');
        }
      });
    });

    form.addEventListener('input', (event) => {
      const assignees = Array.from(document.querySelectorAll('input[name=assignee]:checked')).map(
        (el) => el.value,
      );

      if (assignees.length) {
        this.filterConfig.assignee = assignees;
      } else {
        delete this.filterConfig.assignee;
      }

      const priorities = Array.from(document.querySelectorAll('input[name=priority]:checked')).map(
        (el) => el.value,
      );

      if (priorities.length) {
        this.filterConfig.priority = priorities;
      } else {
        delete this.filterConfig.priority;
      }

      const privacy = Array.from(document.querySelectorAll('input[name=privacy]:checked')).map(
        (el) => el.value,
      );

      if (privacy.length === 1) {
        this.filterConfig.isPrivate = privacy[0] === 'Private';
      } else {
        delete this.filterConfig.isPrivate;
      }

      const dateFrom = document.getElementById('dateFrom').value;

      if (dateFrom) {
        this.filterConfig.dateFrom = dateFrom;
      } else {
        delete this.filterConfig.dateFrom;
      }

      const dateTo = document.getElementById('dateTo').value;

      if (dateTo) {
        this.filterConfig.dateTo = dateTo;
      } else {
        delete this.filterConfig.dateTo;
      }

      const textSearch = document.getElementById('search').value;

      if (textSearch) {
        this.filterConfig.description = textSearch;
      } else {
        delete this.filterConfig.description;
      }

      // console.log(Object.keys(this.filterConfig).length);
      if (Object.keys(this.filterConfig).length) {
        resetBtn.classList.remove('hidden');
      } else {
        resetBtn.classList.add('hidden');
      }

      app.getFeed(this.skip, this.top, this.filterConfig);
    });
  }
}
