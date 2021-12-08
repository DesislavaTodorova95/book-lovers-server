const express = require("express");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.set("Access-Control-Allow-Origin", "http://localhost:3000");
    res.set("Access-Control-Allow-Credentials", true);
    res.set("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type");

    next();
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};
