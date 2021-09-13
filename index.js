const express = require('express');
// const https = require('https');
const Console = require('console');
const sql = require('./db_functions');

const app = express();
const PORT = 3500;
// const HOST = 'http://localhost:';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get('/', (req, res) => {

// });
app.post('/', (req, res) => {
  const { name, number } = req.body;
  Console.log(name, number);
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
        message: err.toString(),
        error: 'Error: Create New Inventory Error',
      }));
    }
  }
  controlFlow();
});

app.listen(PORT, () => {
  Console.log('Running on %d', PORT);
});
