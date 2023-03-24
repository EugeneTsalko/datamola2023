const mockTasks = [
  {
    id: '1',
    name: 'Создать логотип приложения',
    description: 'Формат изображения – svg, размеры - 100х100px',
    createdAt: new Date('2023-03-09T23:00:00'),
    assignee: 'IvanovIvan',
    status: 'To Do',
    priority: 'High',
    isPrivate: false,
    comments: [],
  },
  {
    id: '2',
    name: 'Переименовать константу DELAY_TIME',
    description: 'Необходимо переименовать константу с DELAY_TIME на DELAY_API_TIME',
    createdAt: new Date('2023-03-01T23:00:00'),
    assignee: 'IvanovIvan',
    status: 'To Do',
    priority: 'Medium',
    isPrivate: false,
    comments: [
      {
        id: '912',
        text: 'Будет сделано!',
        createdAt: new Date('2023-03-07T23:00:05'),
        author: 'IvanovIvan',
      },
    ],
  },
  {
    id: '3',
    name: 'Реализовать аутентификацию по токену',
    description: 'Токен хранить в localStorage',
    createdAt: new Date('2023-02-06T23:00:00'),
    assignee: 'StevenKing',
    status: 'In progress',
    priority: 'Low',
    isPrivate: true,
    comments: [
      {
        id: '914',
        text: 'Разберусь.',
        createdAt: new Date('2023-02-09T23:00:05'),
        author: 'StevenKing',
      },
      {
        id: '913',
        text: 'Обрати внимание на refreshToken',
        createdAt: new Date('2023-02-08T23:00:04'),
        author: 'IsaacAsimov',
      },
    ],
  },
  {
    id: '4',
    name: 'Разработать мобильный дизайн приложения',
    description: 'Минимальная ширина - 320 пикселей',
    createdAt: new Date('2023-03-08T23:00:00'),
    assignee: 'SarahGreen',
    status: 'Complete',
    priority: 'High',
    isPrivate: false,
    comments: [
      {
        id: '915',
        text: 'Все понятно, сделаю!',
        createdAt: new Date('2023-03-09T23:00:05'),
        author: 'SarahGreen',
      },
    ],
  },
  {
    id: '5',
    name: 'Сделать логотив в header ссылкой на главную страницу',
    description: 'Анимация не требуется, курсор - поинтер будет достаточно',
    createdAt: new Date('2023-03-04T23:00:00'),
    assignee: 'PeterParker',
    status: 'To Do',
    priority: 'Medium',
    isPrivate: false,
    comments: [
      {
        id: '916',
        text: 'Принято!',
        createdAt: new Date('2023-03-07T23:00:05'),
        author: 'PeterParker',
      },
    ],
  },
  {
    id: '6',
    name: 'Поменять div на nav в панели навигации',
    description: 'Никаких подводных камней',
    createdAt: new Date('2023-03-03T23:00:00'),
    assignee: 'JohnDoe',
    status: 'In progress',
    priority: 'High',
    isPrivate: false,
    comments: [
      {
        id: '921',
        text: 'Наконец-то)',
        createdAt: new Date('2023-03-09T23:00:05'),
        author: 'SarahGreen',
      },
      {
        id: '920',
        text: 'Этот ужас давно нужно было переделать.',
        createdAt: new Date('2023-03-09T23:00:04'),
        author: 'StevenKing',
      },
      {
        id: '919',
        text: 'Просто фантастика какая-то!',
        createdAt: new Date('2023-03-09T23:00:03'),
        author: 'IsaacAsimov',
      },
      {
        id: '918',
        text: 'Я думал не доживу.',
        createdAt: new Date('2023-03-09T23:00:02'),
        author: 'IvanovIvan',
      },
      {
        id: '917',
        text: 'Давно бы так...',
        createdAt: new Date('2023-03-09T23:00:01'),
        author: 'JohnDoe',
      },
    ],
  },
  {
    id: '7',
    name: 'Сделать ховер для кнопок потемнее',
    description: 'Нужно поиграться с цветом',
    createdAt: new Date('2023-03-06T23:00:00'),
    assignee: 'SarahGreen',
    status: 'Complete',
    priority: 'Low',
    isPrivate: false,
    comments: [
      {
        id: '922',
        text: 'Главное - не заиграться.',
        createdAt: new Date('2023-03-09T23:00:05'),
        author: 'SarahGreen',
      },
    ],
  },
  {
    id: '8',
    name: 'Сделать футер не таким высоким',
    description: 'Пикселей 50 будет отлично',
    createdAt: new Date('2023-03-01T23:00:00'),
    assignee: 'IsaacAsimov',
    status: 'To Do',
    priority: 'Medium',
    isPrivate: false,
    comments: [
      {
        id: '923',
        text: 'Хорошо!',
        createdAt: new Date('2023-03-09T23:00:05'),
        author: 'IsaacAsimov',
      },
    ],
  },
  {
    id: '9',
    name: 'Переписать алгоритм поиска на более эффективный',
    description: 'Старый работает слишком медленно',
    createdAt: new Date('2023-02-28T23:00:00'),
    assignee: 'PeterParker',
    status: 'In progress',
    priority: 'High',
    isPrivate: true,
    comments: [],
  },
  {
    id: '10',
    name: 'Добавить в константы CSS все основные цвета',
    description: 'Нейминг должен быть понятен',
    createdAt: new Date('2023-02-27T23:00:00'),
    assignee: 'JohnDoe',
    status: 'To Do',
    priority: 'Low',
    isPrivate: false,
    comments: [
      {
        id: '924',
        text: 'Понял, принял.',
        createdAt: new Date('2023-03-09T23:00:05'),
        author: 'JohnDoe',
      },
    ],
  },
  {
    id: '11',
    name: 'Поиграться со шрифтами в карточке товара',
    description: 'Удачи.',
    createdAt: new Date('2023-02-26T23:00:00'),
    assignee: 'StevenKing',
    status: 'To Do',
    priority: 'Medium',
    isPrivate: false,
    comments: [
      {
        id: '925',
        text: 'Ужасно, постараюсь сделать.',
        createdAt: new Date('2023-03-09T23:00:05'),
        author: 'StevenKing',
      },
    ],
  },
  {
    id: '12',
    name: 'Исправить кривую кнопку в форме',
    description: 'Там все понятно',
    createdAt: new Date('2023-02-25T23:00:00'),
    assignee: 'IsaacAsimov',
    status: 'To Do',
    priority: 'High',
    isPrivate: false,
    comments: [
      {
        id: '927',
        text: 'Там же всё понятно! Сделай по шаблону.',
        createdAt: new Date('2023-03-09T23:00:05'),
        author: 'IvanovIvan',
      },
      {
        id: '926',
        text: 'Я ничего не понял...',
        createdAt: new Date('2023-03-09T23:00:02'),
        author: 'IsaacAsimov',
      },
    ],
  },
  {
    id: '13',
    name: 'Заказать зеленые стаканчики в офис вместо прозрачных',
    description: 'Нужна 1000 штук, можно больше.',
    createdAt: new Date('2023-02-24T23:00:00'),
    assignee: 'SarahGreen',
    status: 'To Do',
    priority: 'Low',
    isPrivate: false,
    comments: [
      {
        id: '928',
        text: 'Давно предлагала! Сделаю.',
        createdAt: new Date('2023-03-09T23:00:05'),
        author: 'SarahGreen',
      },
    ],
  },
  {
    id: '14',
    name: 'Дать функции func2 более говорящее имя',
    description: 'Хотя бы func. (нет). ',
    createdAt: new Date('2023-02-23T23:15:00'),
    assignee: 'IvanovIvan',
    status: 'To Do',
    priority: 'Medium',
    isPrivate: true,
    comments: [
      {
        id: '929',
        text: 'myAwesomeFunc пойдет?',
        createdAt: new Date('2023-03-09T23:00:05'),
        author: 'IvanovIvan',
      },
    ],
  },
  {
    id: '15',
    name: 'Организовать активность на тимбилдинг',
    description: 'Лазертаг не предлагать.',
    createdAt: new Date('2023-02-22T23:00:00'),
    assignee: 'StevenKing',
    status: 'To Do',
    priority: 'High',
    isPrivate: false,
    comments: [
      {
        id: '932',
        text: 'Меня в прошлый раз в лесу насекомые покусали, но я не против.',
        createdAt: new Date('2023-03-09T23:00:05'),
        author: 'PeterParker',
      },
      {
        id: '931',
        text: 'Может в лес, в поход?',
        createdAt: new Date('2023-03-09T23:00:05'),
        author: 'IvanovIvan',
      },
      {
        id: '930',
        text: 'Хоррор-квест подойдет?',
        createdAt: new Date('2023-03-09T23:00:05'),
        author: 'StevenKing',
      },
    ],
  },
  {
    id: '16',
    name: 'Добавить анимацию в слайдер',
    description: 'Fade-in/fade-out.',
    createdAt: new Date('2023-02-21T23:00:00'),
    assignee: 'SarahGreen',
    status: 'To Do',
    priority: 'Low',
    isPrivate: true,
    comments: [],
  },
  {
    id: '17',
    name: 'Добавить border-radius для всех кнопок',
    description: 'По ТЗ - 8 пикселей.',
    createdAt: new Date('2023-02-20T12:00:00'),
    assignee: 'JohnDoe',
    status: 'In progress',
    priority: 'Medium',
    isPrivate: false,
    comments: [
      {
        id: '933',
        text: 'Уже в процессе.',
        createdAt: new Date('2023-03-09T23:00:05'),
        author: 'JohnDoe',
      },
    ],
  },
  {
    id: '18',
    name: 'Пофиксить переменную users',
    description: 'Убрать ее из глобальной области видимости и задать ей типизацию.',
    createdAt: new Date('2023-02-19T23:00:00'),
    assignee: 'IsaacAsimov',
    status: 'In progress',
    priority: 'High',
    isPrivate: true,
    comments: [
      {
        id: '935',
        text: 'Очень срочно!',
        createdAt: new Date('2023-03-09T23:00:05'),
        author: 'IvanovIvan',
      },
      {
        id: '934',
        text: 'Насколько срочно?',
        createdAt: new Date('2023-03-09T23:00:05'),
        author: 'IsaacAsimov',
      },
    ],
  },
  {
    id: '19',
    name: 'Провести интервью на позицию джуна.',
    description: 'Дата - 12.03.2023, время - 14.20.',
    createdAt: new Date('2023-02-10T23:00:00'),
    assignee: 'SarahGreen',
    status: 'Complete',
    priority: 'High',
    isPrivate: false,
    comments: [
      {
        id: '936',
        text: 'Сделаю!',
        createdAt: new Date('2023-03-10T23:00:05'),
        author: 'SarahGreen',
      },
    ],
  },
  {
    id: '20',
    name: 'Поменять div на section там, где это будет семантически оправдано.',
    description: 'В первую очередь главная страница, остальное - как будет получаться по времени.',
    createdAt: new Date('2023-02-09T23:00:00'),
    assignee: 'JohnDoe',
    status: 'In progress',
    priority: 'Low',
    isPrivate: false,
    comments: [
      {
        id: '938',
        text: 'Хорошо.',
        createdAt: new Date('2023-03-09T23:00:05'),
        author: 'JohnDoe',
      },
    ],
  },
  {
    id: '22',
    name: 'Сделать модуль через iife для работы с моковыми данными',
    description:
      'Модуль должен содержать переменную user - текущий пользователь,который будет указан в качестве автора задач и комментариев при добавлении',
    createdAt: new Date('2023-02-07T23:00:00'),
    assignee: 'IsaacAsimov',
    status: 'Complete',
    priority: 'Medium',
    isPrivate: false,
    comments: [],
  },
];
