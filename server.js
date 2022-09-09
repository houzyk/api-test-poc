require('dotenv').config({ path: './config.env' });

const express = require('express');
const cors = require('cors');
const dbo = require('./db/conn');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(require('./routes/dev'));

app.use((err, _req, res) => {
  console.error(err.stack);
  res.status(500);
});

dbo.connectToServer((err) => {
  if (err) {
    console.error(err);
    process.exit();
  }

  app.listen(PORT, () => console.log(`Port ${PORT} Running...`));
});