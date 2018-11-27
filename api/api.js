// BUILDING AN API USING EXPRESS
const express = require('express');
const app = express();

// req = input
// res = output

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

// Uses middleware to allow access to the data for our request
app.use(express.json());

// Calling .get function
app.get('/', (req, res) => {
    return res.send('Hello world. From API!');
});

// Like Pokemon.all in Rails => API will return all Pokemon saved in the 'pokemon' array as a JSON object
// Unlike Rails, method can access a variable outside of it 'pokemon'
// get '/pokemon' to controller#action
app.get('/pokemon', (req, res) => {
    return res.send(pokemon);
});

// :id is a variable we can access to determine which Poke to send back
app.get('/pokemon/:id', (req, res) => {
    console.log(req.params.id);
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

app.post('/pokemon', (req, res) => {
    // ADD A NEW POKEMON TO OUR ARRAY
    // 1. Get new params from request body
    const id = req.body.id
    const name = req.body.name
    // 2. Add to array
    const poke = { id: id, name: name};
    pokemon.push(poke);
    // 3. Send new Pokemon as response
    return res.send(poke);
});

// Tell API to listen to a specific port
app.listen(5000, () => {
    console.log("Listening on port 5000");
});