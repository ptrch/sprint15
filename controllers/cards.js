const Card = require('../models/card');
const BadRequestErr = require('../errors/BadRequestErr');
const ForbiddenErr = require('../errors/ForbiddenErr');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestErr(err.message);
      } else next(err);
    })
    .catch(next);
};

module.exports.delCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then(async (card) => {
      const userId = req.user._id;
      const ownerId = card.owner._id.toString();
      if (ownerId === userId) {
        res.send({ data: await Card.findByIdAndDelete(req.params.cardId) });
      } throw new ForbiddenErr('Вы не можете удалить чужую карточку');
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'TypeError') {
        throw new BadRequestErr('Не удалось удалить карточку. Запрашиваемый ресурс не найден');
      } else next(err);
    })
    .catch(next);
};
