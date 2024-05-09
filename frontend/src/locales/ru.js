export default {
  translation: {
    messages: {
      counter: {
        count_zero: '{{count}} сообщений',
        count_one: '{{count}} сообщение',
        count_few: '{{count}} сообщения',
        count_many: '{{count}} сообщений',
      },
    },
    pages: {
      login: {
        nickname: 'Ваш ник',
        password: 'Пароль',
        noExistingAccount: 'Нет аккаунта?',
        registration: 'Регистрация',
      },
      chat: {
        channels: 'Каналы',
        messages: 'сообщений',
        newMessage: 'Новое сообщение',
        writeMessage: 'Введите сообщение...',
      },
      signup: {
        registration: 'Регистрация',
        userName: 'Имя пользователя',
        password: 'Пароль',
        checkPassword: 'Подтвердите пароль',
        register: 'Зарегистрироваться',
      },
      notFound: {
        toHomePage: 'на главную страницу',
        notFound: 'Страница не найдена',
        youCanGo: 'Но вы можете перейти',
      },
    },
    modals: {
      addModal: {
        addChannel: 'Добавить канал',
      },
      removeModal: {
        removeChannel: 'Удалить канал',
        areYouSure: 'Уверены?',
      },
      renameModal: {
        renameChannel: 'Переименовать канал',
        nameOfChannel: 'Имя канала',
      },
      buttons: {
        cancel: 'Отменить',
        send: 'Отправить',
        remove: 'Удалить',
        rename: 'Переименовать',
      },
    },
    buttons: {
      enter: 'Войти',
      exit: 'Выйти',
    },
    errors: {
      loginError: 'Неверные имя пользователя или пароль',
      userExist: 'Пользователь уже существует!',
      networkError: 'Ошибка соединения',
      required: 'Это обязательное поле',
      username: 'от 3 до 20 символов',
      password: 'Не менее 6 символов',
      confirmPassword: 'Пароли должны совпадать',
      network: 'Ошибка соединения',
      usernameRegistration: 'Такой пользователь уже существует',
      channelName: 'Должно быть уникальным',
    },
    toast: {
      createChannel: 'Канал создан',
      removeChannel: 'Канал удалён',
      renamedChannel: 'Канал переименован',
      dataLoadingError: 'Ошибка загрузки данных',
      аuthorisationError: 'Ошибка авторизации',
    },
    required: 'Обязательное поле',
    min: 'От 3 до 20 символов',
    max: 'От 3 до 20 символов',
    duplicate: 'Должно быть уникальным',
  },
};
