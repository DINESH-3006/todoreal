const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(express.json());
app.use(bodyparser.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/todo");

const todoSchema = new mongoose.Schema({
  todo: String,
  isDone: {
    type: Boolean,
    default: false,
  },
});

const todoModel = mongoose.model("todo", todoSchema);

app.post("/todo", (req, res) => {
  console.log(req.body);
  const todo = req.body.todo;
  const newTodo = new todoModel({ todo });
  newTodo.save();
  console.log("pushed Successfully");
  res.send("Posted");
});

app.get("/todo", (req, res) => {
  todoModel
    .find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.put("/todo/:id", (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  todoModel
    .findByIdAndUpdate({ _id: req.params.id }, { isDone: req.body.isDone })
    .then((result) => res.json(result))
    .catch((err) => res.send(err));
});

app.delete("/todo/:id", (req, res) => {
  todoModel
    .findByIdAndDelete({ _id: req.params.id })
    .then((result) => res.json(result))
    .catch((err) => res.send(err));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
