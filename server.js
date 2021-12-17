const express = require("express");

const { PORT } = require("./config");
const expressConfig = require('./config/expressConfig')
const databaseConfig = require("./config/databaseConfig");
const routesConfig = require("./config/routesConfig");

//middleware

//routes

//start

async function start() {
  const app = express();
  await databaseConfig(app);
  
  expressConfig(app);
  routesConfig(app);
  app.get("/", (req, res) => {
    res.json({ text: "hello" });
  });
  app.listen(PORT, () => {
    console.group(`Server Listening on port ${PORT}...`);
  });
  
}
start();
