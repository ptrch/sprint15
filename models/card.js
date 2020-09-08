const mongoose = require('mongoose');
const urlValid = require('validator').isURL;

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'это поле является обязательным'],
    minlength: [2, 'мин. количество символов - 2'],
    maxlength: [30, 'макс. количество символов - 30'],
  },
  link: {
    type: String,
    required: [true, 'это поле является обязательным'],
    validate: {
      validator: (v) => urlValid(v),
      message: 'некорректная ссылка',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'это поле является обязательным'],
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
