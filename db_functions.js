const { Sequelize, DataTypes } = require('sequelize');
const uuid = require('uuid');
const Console = require('console');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './sqldev.db',
});

sequelize.authenticate()
  .then(() => {
    Console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    Console.error('Unable to connect to the database:', err);
  });

const Inventory = sequelize.define('inventory', {
  id: {
    type: DataTypes.TEXT,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  current_inventory: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  default_inventory: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  preorder: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  updated_at: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  freezeTableName: true,
  timestamps: false,
});

module.exports = {
  CreateInventory(name, number) {
    const time = Date.now();
    return Inventory.upsert({
      id: uuid.v4(),
      name,
      current_inventory: 0,
      default_inventory: number,
      preorder: 0,
      created_at: time,
      updated_at: time,
    });
  },
  GetAllInventory() {
    return Inventory.findAll({
      attributes: ['name', 'current_inventory', 'default_inventory'],
    });
  },

};
