'use strict';

const batModel = (sequelize, DataTypes) => sequelize.define('Bats', {
  name: { type: DataTypes.STRING, required: true },
  material: { type: DataTypes.STRING, required: true },
  style: { type: DataTypes.STRING, required: null },
  stock: { type: DataTypes.INTEGER, required: true},
  price: { type: DataTypes.INTEGER, required: true}
});

module.exports = batModel;
