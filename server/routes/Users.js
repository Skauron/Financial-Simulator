const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcryptjs");
const { validateToken } = require("../middlewares/AuthMiddleware");

const { sign } = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      email: email,
      password: hash,
    });
    res.status(200).json("Success");
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ where: { email: email } });

  if (!user){
    return res.json({ error: "User doesn't exist" });
  }

  bcrypt.compare(password, user.password).then((match) => {
    if (!match){
      return res.json({ error: "Wrong email or password" });
    }

    const accessToken = sign(
      { email: user.email, id: user.id },
      "importantsecret"
    );
    res.status(200).json(accessToken);
  });
});

router.get("/auth", validateToken, (req, res) => {
  res.status(200).json(req.user);
});

module.exports = router;
