const express = require('express');
// const https = require('https');
const Console = require('console');
const sql = require('./db_functions');

const app = express();
const PORT = 3500;
// const HOST = 'http://localhost:';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  async function controlFlow() {
    try {
      const items = await sql.GetAllInventory();

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
