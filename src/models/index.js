'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const userModel = require('../auth/models/users.js');
const batModel = require('./bats/model.js');
const Collection = require('./data-collection.js');

const DATABASE_URL =
  process.env.NODE_ENV === 'test' ? 'sqlite::memory:' : process.env.DATABASE_URL;

const sequelize = new Sequelize(DATABASE_URL);
const batsModelNoConnection = batModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  users: userModel(sequelize, DataTypes),
  bats: new Collection(batsModelNoConnection)
};
