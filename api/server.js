// IMPORTS AT THE TOP
const Dog = require("./dog-model");
const express = require("express");

// INSTANCE OF EXPRESS APP
const server = express();

// GLOBAL MIDDLEWARE

// ENDPOINTS
// ENDPOINTS
// ENDPOINTS

// [GET] / (Hello World endpoint)
server.get("/", (req, res) => {
  res.send("Hello World");
});

// [GET] /api/dogs/:id (R of CRUD, fetch dog by :id)
server.get("/api/dogs/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const dog = await Dog.findById(id);
    res.status(200).json(dog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// [GET] /api/dogs (R of CRUD, fetch all dogs)
server.get("/api/dogs", async (req, res) => {
  try {
    const dog = await Dog.findAll();
    res.status(200).json(dog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// [POST] /api/dogs (C of CRUD, create new dog from JSON payload)
server.post("/api/dogs", async (req, res) => {
    const dog = req.body;

    if (!dog.name || !dog.weight) {
        res.status(400).json({ message: "must include name and weight" });
    } else {
        try {
            const newDog = await Dog.create(dog);
            res.status(200).json(newDog);
        } catch (err) {
            console.log("cd: server.js: .post error response: ", {err})
            res.status(500).json({ error: err.message });
        }
    }
});

// [PUT] /api/dogs/:id (U of CRUD, update dog with :id using JSON payload)

// [DELETE] /api/dogs/:id (D of CRUD, remove dog with :id)

// EXPOSING THE SERVER TO OTHER MODULES
module.exports = server;
