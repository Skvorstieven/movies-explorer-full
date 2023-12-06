const { ObjectId } = require('mongoose').Types;

module.exports = {
  user: {
    name: 'Placeholder McDoctorate',
    email: 'PlaceholderMcD@example.com',
    password: '1234QWer$',
  },
  anotherUser: {
    anotherUserName: 'Doctor Bright',
    anotherUserEmail: 'JackBright@example.com',
    anotherUserPassword: 'QwerQwer',
  },
  wrongUser: {
    wrongName: 'P',
    wrongEmail: 'PlaceholderMcD',
    wrongPassword: '',
  },
  movie: {
    director: 'Гай Ричи',
    country: 'США',
    duration: 120,
    year: '2024',
    description: 'Настоящий рокнрольщик',
    image: 'https://fakeimg.pl/600x400',
    trailerLink: 'https://fakeimg.pl/600x400',
    thumbnail: 'https://fakeimg.pl/600x400',
    owner: new ObjectId('64bf971ac58f8b46583a69bc'),
    movieId: 123123,
    nameRU: 'Настоящий рокнрольщик',
    nameEN: 'the REAL Rocknrolla',
  },
};
