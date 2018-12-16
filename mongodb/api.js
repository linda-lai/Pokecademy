// BUILDING AN API USING EXPRESS

// DEPENDENCIES
const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/pokedex');

const app = new express();
const port = process.env.PORT || 5000;
// MIDDLEWARE
app.use(express.json());

// 'GET': TO SET A ROUTE FOR THE ROOT at '/'
app.get('/', function(req, res) {
    return res.send('Hello world. From the Poke MongoDB/Express API!');
});

// 'GET': TO SHOW ALL POKEMON IN THE ARRAY at '/pokemon'
app.get('/pokemon', (req, res) => {
    return res.send(pokemon);
});

// 'GET': TO SHOW AN INDIVIDUAL POKEMON IN THE ARRAY at '/pokemon/:id'
app.get('/pokemon/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const poke = pokemon.find(p => p.id === id);
    if (!poke) {
        return res.send('Pokemon not found!');
    }
    return res.send(poke);
});

// 'POST': TO ADD A NEW POKEMON TO OUR ARRAY at '/pokemon'
app.post('/pokemon', (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const poke = { id: id, name: name};
    pokemon.push(poke);
    return res.send(poke);
});

// 'PUT': TO UPDATE AN EXISTING POKEMON IN THE ARRAY at '/pokemon/:id'
app.put('/pokemon/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const poke = pokemon.find(p => p.id === id);
    if (!poke) {
        return res.status(404).send('Pokemon not found!');
      }
    const schema = {
        name: Joi.string().min(3).required()
    }
    const valid = Joi.validate(req.body, schema);
    const error = valid.error
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const name = req.body.name;
    poke.name = name;
    return res.send(poke);
});

// 'DELETE': TO DELETE A POKEMON FROM THE ARRAY at /pokemon/:id
app.delete('/pokemon/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const poke = pokemon.find(p => p.id === id);
    if (!poke) {
      return res.status(404).send('Pokemon not found!');
    }
    const index = pokemon.indexOf(poke);
    pokemon.splice(index, 1);
    return res.send(poke);
});

// PORT
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  })