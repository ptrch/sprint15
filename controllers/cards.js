const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Ошибка сервера' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
      } else res.status(500).send({ message: 'Ошибка сервера' });
    });
};

module.exports.delCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail(new Error('CastError'))
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(404).send({ message: 'Не удалось удалить карточку. Запрашиваемый ресурс не найден' });
      } else {
        res.status(500).send({ message: 'Ошибка сервера' });
      }
    });
};
