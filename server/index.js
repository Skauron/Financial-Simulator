const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(cors());

const db = require("./models");

//*Routers
const simulationsRouter = require("./routes/Simulations");
app.use("/simulation", simulationsRouter);
const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

db.sequelize
  .sync()
  .then(() => {
    app.listen(process.env.PORT || 3001, () => {
      console.log("Server running on port " + process.env.PORT || 3001);
    });
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = app;