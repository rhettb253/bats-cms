'use strict';

const batModel = (sequelize, DataTypes) => sequelize.define('Bats', {
  name: { type: DataTypes.STRING, required: true },
  material: { type: DataTypes.STRING, required: true },
  style: { type: DataTypes.STRING, required: true }
});

module.exports = batModel;
