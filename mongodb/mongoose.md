# Mongoose
**Mongoose** is an Object Data Modeling (ODM) library for MongoDB and Node.js. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB.

![Mongo & Mongoose](client/../../client/assets/mongo-mongoose.png)

## Setup

Install Mongoose API package:
```
$ npm i mongoose
```

In the main `app.js`, require in the Mongoose package, and create a new instance:
```js
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/pokedex');
```

A new model will need to be created. By convention a separate `models/` folder should be created to store all of our models, each file representing a model should be capitalised (as it is usually represented as a class).

Note: By convention, models will be referred to in the singular, but pluralised when referring to a collection. 

In the `Pokemon.js` file representing the model:
```js
const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
  id: Number,
  name: String
});

module.exports = mongoose.model('Pokemon', pokemonSchema);
```