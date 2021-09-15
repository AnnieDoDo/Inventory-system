const express = require('express');
const cron = require('node-cron');
const Console = require('console');
const sql = require('./db_functions');

const app = express();
const PORT = 3500;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const task = cron.schedule('0 0 0 * * *', () => {
  async function controlFlow() {
    try {
      await sql.UpdateInventoryToDefault();
    } catch (err) {
      Console.log(err);
    }
  }
  controlFlow();
});
task.start();

app.put('/', (req, res) => {
  const { name, preorder } = req.body;

  async function controlFlow() {
    try {
      let items = Promise;
      if (Number.isInteger(preorder)) {
        items = await sql.UpdatePreOrderByName(name, preorder);
      } else {
        items = await sql.UpdateCurrentInventoryByName(name);
      }

      if (items[0] === 0) {
        res.end(JSON.stringify({
          result: true,
          message: 'Success: No rows update',
        }));
      } else {
        res.end(JSON.stringify({
          result: true,
          message: 'Success',
        }));
      }
    } catch (err) {
      res.end(JSON.stringify({
        result: false,
        message: 'Error: Update Inventory Error',
        error: err.toString(),
      }));
    }
  }
  controlFlow();
});

app.get('/', (req, res) => {
  async function controlFlow() {
    try {
      const items = await sql.GetInventory();
      const inventory = [];
      for (let i = 0; i < items.length; i += 1) {
        inventory.push({
          id: items[i].dataValues.name,
          currentInventory: items[i].dataValues.current_inventory,
          defaultInventory: items[i].dataValues.default_inventory,
        });
      }
      res.end(JSON.stringify({
        result: inventory,
      }));
    } catch (err) {
      res.end(JSON.stringify({
        result: false,
        message: 'Error: Get Inventory Error',
        error: err.toString(),
      }));
    }
  }

  controlFlow();
});

app.post('/', (req, res) => {
  const { name, number } = req.body;

  async function controlFlow() {
    try {
      await sql.CreateInventory(name, number);
      res.end(JSON.stringify({
        result: true,
        message: 'Success',
      }));
    } catch (err) {
      res.end(JSON.stringify({
        result: false,
        message: 'Error: Create New Inventory Error',
        error: err.toString(),
      }));
    }
  }

  if (!name || !number) {
    res.end(
      JSON.stringify({
        result: false,
        message: 'Please fill name and number',
      }),
    );
  } else {
    controlFlow();
  }
});

app.listen(PORT, () => {
  Console.log('Running on %d', PORT);
});
