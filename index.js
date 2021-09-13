const express = require('express');
// const https = require('https');
const Console = require('console');

const app = express();
const PORT = 3500;
// const HOST = 'http://localhost:';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    
});

app.listen(PORT, () => {
  Console.log('Running on %d', PORT);
});
