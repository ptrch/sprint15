const mongoose = require('mongoose');
const urlValid = require('validator').isURL;
const emailValid = require('validator').isEmail;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'это поле является обязательным'],
    minlength: [2, 'мин. количество символов - 2'],
    maxlength: [30, 'макс. количество символов - 30'],
  },
  about: {
    type: String,
    required: [true, 'это поле является обязательным'],
    minlength: [2, 'мин. количество символов - 2'],
    maxlength: [30, 'макс. количество символов - 30'],
  },
  avatar: {
    type: String,
    required: [true, 'это поле является обязательным'],
    validate: {
      validator: (v) => urlValid(v),
      message: 'некорректная ссылка',
    },
  },
  email: {
    type: String,
    required: [true, 'это поле является обязательным'],
    unique: true,
    validate: {
      validator: (v) => emailValid(v),
      message: 'некорректная email',
    },
  },
  password: {
    type: String,
    required: [true, 'это поле является обязательным'],
    minlength: [8, 'мин. количество символов - 8'],
  },
});

module.exports = mongoose.model('user', userSchema);
