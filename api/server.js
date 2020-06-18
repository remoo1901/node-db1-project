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

//-----------------------
// POST new Account
//-----------------------

server.post("/api/accounts", async (req, res, next) => {
  try {
    const payload = {
      name: req.body.name,
      budget: req.body.budget,
    };

    const [accountID] = await db.insert(payload).into("accounts");

    const NewAccount = await db
      .first("*")
      .from("accounts")
      .where("id", accountID);

    res.status(201).json(NewAccount);
  } catch (err) {
    next(err);
  }
});

//-----------------------
// EDIT (PUT) Account
//-----------------------

server.put("/api/accounts/:id", async (req, res, next) => {
  try {
    const payload = {
      name: req.body.name,
      budget: req.body.budget,
    };

    await db("accounts").update(payload).where("id", req.params.id);

    const updated = await db
      .first("*")
      .from("accounts")
      .where("id", req.params.id);

    res.status(201).json(updated);
  } catch (err) {
    next(err);
  }
});




module.exports = server;
