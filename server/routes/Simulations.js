const express = require("express");
const router = express.Router();
const { Simulations } = require("../models");

router.get("/", async (req, res) => {
  const listOfSimulations = await Simulations.findAll();
  res.json(listOfSimulations);
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const simulation = await Simulations.findByPk(id);
  res.json(simulation);
});

router.post("/", async (req, res) => {
  const simulation = req.body;
  console.log(req.body);
  await Simulations.create(simulation);
  res.json(simulation);
});

module.exports = router;
