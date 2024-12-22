const express = require("express");
const router = express.Router();
const { Simulations } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", validateToken, async (req, res) => {
  const listOfSimulations = await Simulations.findAll({ where: { UserId: req.user.id } });
  res.json(listOfSimulations);
});

router.get("/byId/:id", validateToken, async (req, res) => {
  const id = req.params.id;
  const simulation = await Simulations.findByPk(id);
  res.json(simulation);
});

router.post("/", validateToken,  async (req, res) => {
  const simulation = req.body;
  const id = req.user.id;
  simulation.UserId = id;
  console.log("Id Usuario: " + id);
  await Simulations.create(simulation);
  res.json(simulation);
});

module.exports = router;
