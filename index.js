const express = require("express");
const router = require("./api/router");
const mongoose = require("mongoose");
const cors = require("cors");
const dbConfig = require('./config/dbConfig');

const PORT = 8080;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

app.get('/', (req, res) => {
    res.send('Hey this is my API running 🥳')
})

app.listen(PORT, async () => {
  console.log(`server up on port ${PORT}`);
});
module.exports = app;