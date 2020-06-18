const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

//-----------------------
// GET Accounts
//-----------------------

server.get("/api/accounts", async (req, res, next) => {
  try {
    const data = await db.select("*").from("accounts");
    
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

//-----------------------
// GET Accounts by ID
//-----------------------

server.get("/api/accounts/:id", async (req, res, next) => {
  try {
    const data = await db
      .select("*")
      .from("accounts")
      .where("id", req.params.id);

    res.status("200").json(data);
  } catch (err) {
    next(err);
  }
});

module.exports = server;
