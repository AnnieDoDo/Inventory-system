const { Sequelize, DataTypes } = require('sequelize');

const { Op } = Sequelize;
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
      current_inventory: number,
      default_inventory: number,
      preorder: 0,
      created_at: time,
      updated_at: time,
    });
  },
  GetInventory() {
    return Inventory.findAll({
      attributes: ['name', 'current_inventory', 'default_inventory'],
    });
  },
  UpdateCurrentInventoryByName(n) {
    const time = Date.now();
    return Inventory.update({
      current_inventory: sequelize.literal('current_inventory - 1'),
      updated_at: time,
    }, {
      where: { name: n, current_inventory: { [Op.gt]: sequelize.literal('preorder + 1') } },
      // This 1 means current_inventory.
      returning: false,
      plain: true,
    });
  },
  UpdatePreOrderByName(n, number) {
    const time = Date.now();
    return Inventory.update({
      preorder: sequelize.literal(`preorder + ${number.toString()}`),
      updated_at: time,
    }, {
      where: { name: n, current_inventory: { [Op.gt]: sequelize.literal(`preorder + ${number.toString()}`) } },
      // This "1" means preoder.
      returning: false,
      plain: true,
    });
  },
  UpdateInventoryToDefault() {
    const time = Date.now();
    return Inventory.update({
      current_inventory: sequelize.literal('default_inventory'),
      updated_at: time,
    }, {
      where: { current_inventory: { [Op.lt]: sequelize.literal('default_inventory') } },
      returning: false,
      plain: true,
    });
  },
};
