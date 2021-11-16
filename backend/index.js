const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const PinRoute = require("./routes/pins");
const UserRoute = require("./routes/users");
const app = express();

dotenv.config();

app.use(express.json());

const PORT = process.env.PORT || 4000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to db"))
  .catch((err) => console.log(err));

app.use("/api/pins", PinRoute);
app.use("/api/users", UserRoute);

app.listen(PORT, () => {
  console.log("Up and runnning");
});
