const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { hex } = require('../secretKey');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Ошибка сервера' }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new Error('CastError'))
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(404).send({ message: 'Не удалось найти пользователя' });
      } else {
        res.status(500).send({ message: 'Ошибка сервера' });
      }
    });
};

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  if (!password) {
    return res.status(400).send({ message: 'Введите пароль' });
  }
  if (password.length < 8) {
    return res.status(400).send({ message: 'Слишком короткий пароль' });
  }
  return bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then(() => res.send({
      name, about, avatar, email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: err.message });
      }
      if (err.name === 'MongoError' && err.code === 11000) {
        return res.status(409).send({ message: 'Такой пользователь уже существует' });
      }
      return res.status(500).send({ message: 'Ошибка сервера' });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        ver: hex,
        token: jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret-key', { expiresIn: '7d' }),
      });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};
