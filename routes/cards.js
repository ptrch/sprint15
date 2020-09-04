const routerCards = require('express').Router();
const path = require('path');

const pathCards = path.join(__dirname, '../data/cards.json');
const promisesFs = require('fs').promises;

const helpCards = require('../helpers/helpersCards');

routerCards.get('/', helpCards);

module.exports = {
  routerCards,
  pathCards,
  promisesFs
};
