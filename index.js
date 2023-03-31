const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 8000;
const app = express();

const userRoutes = require("./routes/user.route.js");

app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World From Server!");
});

app.all("*", (req, res) => {
  res.send("Route not found!");
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
