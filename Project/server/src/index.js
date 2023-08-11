const express = require('express');
const app = express(); // Inisialisasi aplikasi Express di sini

// Set middleware
app.use(express.json());

const path = require('path');
const cors = require("cors");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const PORT = process.env.PORT || 8000;

// Gunakan middleware CORS
app.use(
  cors({
    origin: [
      process.env.WHITELISTED_DOMAIN &&
        process.env.WHITELISTED_DOMAIN.split(","),
      // "http://localhost:3000"
    ],
  })
);

const db = require('../models');
// db.sequelize.sync({alter: true});

const userRouter = require('./routes');

app.use('/auth', userRouter);

app.listen(PORT, (err) => {
    if (err) {
      console.log(`ERROR: ${err}`);
    } else {
      console.log(`APP RUNNING at ${PORT} ✅`);
    }
});
