const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("config");


const cors = require("cors");
const corsOptions = {
  exposedHeaders: "x-auth-token",
};
app.use(cors(corsOptions));
app.use(express.json());
const helmet = require("helmet");
require("express-async-errors");


//connecting to the Data base
mongoose
  .connect(config.get("db"), { useNewUrlParser: true })
  .then(
    console.log(`Successfully connected to mongodb host${config.get("db")}`)
  )
  .catch((err) => console.log("faile to connect to db...", err));



const users = require("./routes/users");
const auth = require("./routes/auth");
const tokens = require("./routes/tokens");


app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/tokens", tokens);

const port = process.env.PORT || 3900;
const server = app.listen(port, () => console.log(`listening to port ${port}`));

module.exports = server;