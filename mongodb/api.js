// BUILDING AN API USING EXPRESS

// DEPENDENCIES
const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');

// MONGOOSE
mongoose.connect('mongodb://localhost:27017/mongoose');
const Pokemon = require('./models/Pokemon');

// APP INSTANCE & ENVIRONMENT VARIABLES
const app = new express();
const port = process.env.PORT || 5000;

// MIDDLEWARE
app.use(express.json());

// ROUTES
// 'GET': TO SET A ROUTE FOR THE ROOT @ '/'
app.get('/', function(req, res) {
    return res.send('Hello world. From the Pokemon Mongoose/Express API!');
});

// 'GET': TO SHOW ALL POKEMON IN THE ARRAY @ '/pokemon'
app.get('/pokemon', (req, res) => {
    // Select all Pokemon from the model, query syntax and methods similar to Mongo CLI
    // Returns a promise (as it needs to connect to database and executes asynchronously)
    Pokemon.find({})
    // Send a response, passed a callback for when 'docs' is returned/promise is fulfilled
        .then(docs => res.send(docs));
});

// 'GET': TO SHOW AN INDIVIDUAL POKEMON IN THE ARRAY @ '/pokemon/:id'
app.get('/pokemon/:id', (req, res) => {
    const { id } = req.params; // OR const id = parseInt(req.params.id);
    Pokemon.findOne({id}) // OR Pokemon.find({id: id}) (can be shortened if key and value are identical)
        .then(doc => res.send(doc));
});

// 'POST': TO ADD A NEW POKEMON TO OUR ARRAY at '/pokemon'
app.post('/pokemon', (req, res) => {
    // Grab the values from the request body
    const { id, name } = req.body;
    // Create new Pokemon document
    const newPokemon = new Pokemon({ id, name });
    // Save in MongoDB - send request
    newPokemon.save()
        .then(doc => res.send(doc));
});

// 'PUT': TO UPDATE AN EXISTING POKEMON IN THE ARRAY at '/pokemon/:id'
app.put('/pokemon/:id', (req, res) => {
    // Find the Pokemon
    const { id } = req.params;
    const { name } = req.body;

    // Pokemon.findOne({ id })
    //     .then(doc => {
    //         doc.name = name;
    //         doc.save()
    //             .then(newDoc => res.send(newDoc));
    //     }); 
    
    Pokemon.findOneAndUpdate(
        { id }, // query object - find Pokemon to be updated
        { id, name }, // new object - update Pokemon per the enclosed fields
        { // options
            new: true, // return new document
            runValidators: true // when document is updated, run validators
        }
    )
        .then(doc => res.send(doc)); // once promise has been fulfilled, return back to user
});

// 'DELETE': TO DELETE A POKEMON FROM THE ARRAY at /pokemon/:id
app.delete('/pokemon/:id', (req, res) => {
    // Find the Pokemon
    const { id } = req.params;

    // Delete the Pokemon
    Pokemon.findOneAndRemove({ id })
        // Send the deleted Pokemon back in response
        .then(deletedDoc => res.send(deletedDoc))

});

// PORT
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});