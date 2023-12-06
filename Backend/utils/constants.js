// Constants

// Error messages in RU
const errorMessages = {
  internalServerError: 'Ошибка сервера',
  pageNotFound: 'Страница не найдена',
  tooManyRequests: 'Превышено количество запросов, попробуйте зайти на страницу позже',
  userNotFound: 'Пользователь не найден',
  userAlreadyExists: 'Пользователь с этим email уже существует',
  userBadRequest: 'Некорректные данные при создании пользователя',
  userWrongCredentials: 'Неправильные почта или пароль',
  userUnauthorized: 'Необходима авторизация',
  movieNotFound: 'Фильм не найден',
  movieBadRequest: 'Некорректные данные при создании фильма',
  movieWrongId: 'Некорректный id фильма',
  movieDeleteForbidden: 'Недостаточно прав',
};

// Error messages for mongoose model validation in RU
const modelErrorMessages = {
  user: {
    nameRequired: 'Поле name должно быть заполнено',
    nameMinLength: 'Минимальная длина поля name - 2',
    nameMaxLength: 'Максимальная длина поля name - 30',
    emailRequired: 'Поле email должно быть заполнено',
    emailInvalid: 'Некорректный email',
    passwordRequired: 'Поле password должно быть заполнено',
  },
  movie: {
    countryRequired: 'Поле country должно быть заполнено',
    directorRequired: 'Поле director должно быть заполнено',
    durationRequired: 'Поле duration должно быть заполнено',
    yearRequired: 'Поле year должно быть заполнено',
    descriptionRequired: 'Поле description должно быть заполнено',
    imageRequired: 'Поле image должно быть заполнено',
    trailerLinkRequired: 'Поле trailerLink должно быть заполнено',
    thumbnailRequired: 'Поле thumbnail должно быть заполнено',
    ownerRequired: 'Поле owner должно быть заполнено',
    movieIdRequired: 'Поле movieId должно быть заполнено',
    nameRURequired: 'Поле nameRU должно быть заполнено',
    nameENRequired: 'Поле nameEN должно быть заполнено',
    invalidURL: 'Некорректный URL',
  },
};

module.exports = {
  errorMessages,
  modelErrorMessages,
};
