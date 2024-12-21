const express = require("express");
const router = express.Router();
const { Simulations } = require("../models");

router.get("/", async (req, res) => {
  const listOfSimulations = await Simulations.findAll();
  res.json(listOfSimulations);
});

router.post("/", async (req, res) => {
  const simulation = req.body;
  console.log(req.body);
  await Simulations.create(simulation);
  res.json(simulation);
});

module.exports = router;
