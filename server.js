const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 4000;

// Use body-parser middleware to parse JSON request bodies
app.use(bodyParser.json());

// In-memory database
let db = [
  {
    id: 1,
    title: "You know why Samson was named Samson?.. Because Sam sin",
    comedian: "Bammy",
    year: 2024,
  },
  {
    id: 2,
    title: "Because they make up everything!",
    comedian: "Gbenga",
    year: 2024,
  },
];

// find a joke by ID
const findJokeById = (id) => db.find((joke) => joke.id === parseInt(id));

// GET request to return all jokes
app.get("/", (req, res) => {
  res.json(db);
});

// POST request to add a new joke
app.post("/", (req, res) => {
  const newJoke = req.body;
  newJoke.id = db.length ? db[db.length - 1].id + 1 : 1;
  db.push(newJoke);
  res.json(db);
});

// PATCH request to update a joke by ID
app.patch("/joke/:id", (req, res) => {
  const jokeId = req.params.id;
  const joke = findJokeById(jokeId);
  if (joke) {
    Object.assign(joke, req.body);
    res.json(joke);
  } else {
    res.status(404).send("Joke not found");
  }
});

// DELETE request to delete a joke by ID
app.delete("/joke/:id", (req, res) => {
  const jokeId = req.params.id;
  const jokeIndex = db.findIndex((joke) => joke.id === parseInt(jokeId));
  if (jokeIndex !== -1) {
    const deletedJoke = db.splice(jokeIndex, 1);
    res.json(deletedJoke[0]);
  } else {
    res.status(404).send("Joke not found");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`My Server is running at http://localhost:${port}/`);
});
