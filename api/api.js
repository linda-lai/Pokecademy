// BUILDING AN API USING EXPRESS

// DEPENDENCIES
// Express is a factory function
const express = require('express');
// Require in Joi to add validations, it will return an instance that can be used straight away
const Joi = require('joi');
// express() function will product a JavaScript object
// a function that produces an object is a 'factory' function
const app = express();

const pokemon = [
    {
        id: 1,
        name: 'Pikachu'
    },
    {
        id: 2,
        name: 'Riachu'
    },
    {
        id: 53,
        name: 'Poliwag'
    }
];

// MIDDLEWARE
// Uses middleware to allow access to the data for our request - gives the ability to read the body of the request
app.use(express.json());

// 'GET': TO SET A ROUTE FOR THE ROOT at '/'
// Calling .get function - sets up a route for root
app.get('/', function(req, res) {
    return res.send('Hello world. From API!');
});

// 'GET': TO SHOW ALL POKEMON IN THE ARRAY at '/pokemon'
// Like Pokemon.all in Rails => API will return all Pokemon saved in the 'pokemon' array as a JSON object
// Unlike Rails, method can access a variable outside of it 'pokemon', get '/pokemon' to controller#action
app.get('/pokemon', (req, res) => {
    return res.send(pokemon);
});

// 'GET': TO SHOW AN INDIVIDUAL POKEMON IN THE ARRAY at '/pokemon/:id'
// :id is a variable we can access to determine which Poke to send back
app.get('/pokemon/:id', (req, res) => {
    // console.log(req.params.id);
    // Grabs the id out of params, converts to integer
    const id = parseInt(req.params.id);
    const poke = pokemon.find(p => p.id === id);
    // if 'undefined', coerce into FALSE for the below if statement
    if (!poke) {
        // Returns status 200 by default - OK
        // Returns 300 - redirected
        // Returns 404 - error of some kind
        // Returns 500 - server error
        return res.send('Pokemon not found!');
    }
    return res.send(poke);
});

// 'POST': TO ADD A NEW POKEMON TO OUR ARRAY at '/pokemon'
app.post('/pokemon', (req, res) => {
    // 1. Get new params from request body
    const id = req.body.id;
    const name = req.body.name;
    // 2. Add to array
    const poke = { id: id, name: name};
    pokemon.push(poke);
    // 3. Send new Pokemon as response
    return res.send(poke);
});

// 'PUT': TO UPDATE AN EXISTING POKEMON IN THE ARRAY at '/pokemon/:id'
// Implement a PUT endpoint to update a Pokemon in the array
app.put('/pokemon/:id', (req, res) => {
    // 1. Check the array for the Pokemon
    // Grabs the id out of params, converts to integer, needs to match number and data type
    const id = parseInt(req.params.id);
    const poke = pokemon.find(p => p.id === id);
    if (!poke) {
        return res.status(404).send('Pokemon not found!');
      }
    // 2. Validate what the user should give us
    // Schema adds validations
    const schema = {
        name: Joi.string().min(3).required()
    }
    // Testing request.body against schema rules - if input is valid
    const valid = Joi.validate(req.body, schema);
    // To view the error messages
    // console.log(valid.details[0].messages)
    // Settings for if it fails validation
    const error = valid.error
    // If error does exist (and doesn't return as undefined), return status code to specify error
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    // Get new params from request body
    const name = req.body.name;
    // 3. Update the record
    // Send back Pokemon as the response
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
app.listen(5000, () => {
    console.log("Listening on port 5000");
});