const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const app = new express();
const PORT = 2000 || process.env.PORT;

app.use(express.json());
app.use(cors());

// connecting to DB
main().catch((err) => console.log(err));
async function main() {
  // await mongoose.connect("mongodb://127.0.0.1:27017/KeeperDB");

  await mongoose.connect(process.env.MongoURL);
}

const keeperSchema = new mongoose.Schema({
  title: String,
  content: String,
});

// collection/model
const keeperItem = mongoose.model("keeperitems", keeperSchema);

let items = [];

app.get("/", async (req, res) => {
  items = await keeperItem.find({});
  res.json(items);
});

app.put("/", (req, res) => {
  const item = new keeperItem({
    title: req.body.title,
    content: req.body.content,
  });

  item.save(async () => {
    items = await keeperItem.find({});
    res.json(items);
  });
});

app.delete("/", async function (req, res) {
  const _id = req.body._id;

  keeperItem.findByIdAndDelete({ _id: _id }, async (err, doc) => {
    if (!err) {
      items = await keeperItem.find({});
      res.json(items);
    }
  });
});

app.listen(PORT, () => console.log("localhost:" + PORT));
