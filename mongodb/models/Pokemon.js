const mongoose = require('mongoose');

// Like Joi, Mongoose needs to know what type and kind of data to expect
// pokemonSchema must be passed an object matching the schema
const pokemonSchema = new mongoose.Schema({
  id: Number,
  name: String
});

// Every file in JS is private, needs to be exported to give access outside of the file (set to public)
module.exports = mongoose.model('Pokemon', pokemonSchema);

// When dealing with a model - singular (Pokemon)
// When dealing with a collection - plural (Pokemons)