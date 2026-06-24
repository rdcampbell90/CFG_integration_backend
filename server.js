const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

app.get("/ping", (req, res) => {
  res.json({ message: "Connected!" });
});

let tasks = [
  { id: 1, title: "Learn React" },
  { id: 2, title: "Build a REST API with Express" },
  { id: 3, title: "Connect frontend to backend" },
  { id: 4, title: "Style the app with CSS" },
  { id: 5, title: "Deploy to production" },
];
let nextId = 6;

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.get("/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: "Not found" });
  res.json(task);
});

app.post("/tasks", (req, res) => {
  const task = { id: nextId++, title: req.body.title };
  tasks.push(task);
  res.status(201).json(task);
});

app.put("/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: "Not found" });
  task.title = req.body.title;
  res.json(task);
});

app.delete("/tasks/:id", (req, res) => {
  const index = tasks.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Not found" });
  tasks.splice(index, 1);
  res.status(204).send();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
  console.log(`Server running on port
${PORT}`),
);
