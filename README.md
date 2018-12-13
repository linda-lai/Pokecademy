# Pokecademy
Using ![PokéAPI](https://github.com/PokeAPI) (a RESTful Pokémon API) to practice the Fetch API in JavaScript...and catch 'em all.

[![PokéAPI](/assets/pokeapi.png)](https://pokeapi.co/)

## Fetch API
Using the Fetch API to contact external resources and grab data from another database.

### ('/')
The simplest use of `fetch()` takes one argument — the path to the resource you want to fetch — and returns a promise containing the response (a Response object).

This is just an HTTP response, not the actual JSON. To extract the JSON body content from the response, we use the `json()` method (defined on the Body mixin, which is implemented by both the Request and Response objects).

In `index.html` file, create an empty <div> with a meaningful name to populate with data from the API.
   ```html
   <h1>Pokemon List</h1>
    <div id="pokemon-list"></div>

    <script src="index.js"></script>
   ```
   
In `index.js` file, create a new Fetch API request using `fetch()`:
   ```js
   const url = 'https://pokeapi.co/api/v2/pokemon/';

   fetch(url)
    .then((resp) => resp.json())
    .then(json => {
        console.log(json)
        const actualPokemon = json.results.slice(0, 151);
        renderPokemon(actualPokemon);
    })
    .catch((error) => console.error(error)) 
   ``` 
   Fetch is a function that takes a URL; it can take a collection of options but default is set to GET. The request to the PokeAPI returns the promise of a future value that doesn't exist yet, but will continue sequentially executing.
   
   `resp` placeholder is like `|item|` in forEach, variable can be named anything but cannot choose what it returns (based on the settings of the API and will always return a promise).

   `json` variable is an array, `actualPokemon` slices the returned array (.slice is an array method) to store only the data we want (0 - 151) in a variable.

   The Pokemon API returns a promise, which will eventually result in a resolve or reject response.

   If successful, the API will return stringified version of the JSON object.

### ('/:id')
In `poke-info.html` file...
   ```html
       <div id="poke-info" class="page-container">
       </div>
    
    <script src="poke-info.js"></script>
   ```

In `poke-info.js` file...
   ```js
    // To render 'abilities' from Pokemon array object
    const renderAbilities = (poke) => {
        const panel = document.querySelector('#poke-info');
        const ul = `<ul id="abilities"></ul>`;
        panel.insertAdjacentHTML('beforeend', ul);
        const ulElement = document.querySelector('#abilities');
        poke.abilities.forEach(ability => {
            ulElement.insertAdjacentHTML('beforeend', `<li>${ability.ability.name}</li>`);
        });
        const ulHeader = document.querySelector('#abilities');
        ulHeader.insertAdjacentHTML('beforebegin', `<h2>Abilities<h2>`)
    }
    
    // To render 'moves' from Pokemon array object
    const renderMoves = (poke) => {
        const panel = document.querySelector('#poke-info');
        const ul = `<ul id="moves"></ul>`;
        panel.insertAdjacentHTML('beforeend', ul);
        const ulElement = document.querySelector('#moves');
        poke.moves.forEach(move => {
            ulElement.insertAdjacentHTML('beforeend', `<li>${move.move.name}</li>`);
        });
        const ulHeader = document.querySelector('#moves');
        ulHeader.insertAdjacentHTML('beforebegin', `<h2>Moves<h2>`)
        }
        
    // To render Pokemon on /:id page with pokeInfo, renderAbilities and renderMoves
    const renderPokemon = (poke) => {
        console.log(poke)
        const panel = document.querySelector('#poke-info');
        const pokeInfo = `
        <h1>${poke.id}: ${poke.name.toUpperCase()}</h1>
        <img src="${poke.sprites.front_default}" alt="This is a front image of ${poke.name}">
        <p>Weight: ${poke.weight} | Height: ${poke.height}</p>
        <ul id="ability-items"></ul>
        `;
        panel.insertAdjacentHTML('beforeend', pokeInfo);
        renderAbilities(poke)
        renderMoves(poke)
        console.log(poke)
    }
  
    const getId = () => {
        const queryParams = window.location.search;
        const id = queryParams.substr(1);
        return id;
    }
  
    const fetchInfo = () => {
        const id = getId();
        const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
        fetch(url)
        .then(resp => resp.json())
        .then(json => renderPokemon(json))
        .catch(error => console.error(error));
    }
    
    fetchInfo();
   ```
## Express API
To create a new project in npm for Express:
```terminal
$ npm init
```

Add API details:
```json
{
  "name": "api",
  "version": "1.0.0",
  "description": "An API to serve Pokemon requests",
  "main": "api.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Linda Lai",
  "license": "ISC",
  "dependencies": {
    "express": "^4.16.4"
  }
}

```
Install Express as a dependency, this will create `nodule_modules/` folder and other npm dependencies:

```terminal
npm install express --save
```

As entry point is set to `app.js`, this will be the initialiser for the function. Include Express library by calling it in using `'require'`, searches `node_modules/` folder and Express returns a function which we can call to create a new instance of an Express app:

```js
const app = new express();
```

Set up an endpoint for a request, e.g. GET:
```js
app.get('/', (req, res) => {
    return res.send('Hello world. From API!');
});
```

Create a PORT to listen for requests:
```js 
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
```

To specify environment variables for a PORT:
```js
const port = process.env.PORT || 5000;
```

To run `api.js`:
```
$ node app.js
```

### MongoDB

#### Compared to Relational Databases
Relational DB | Mongo DB
--------------|--------------
Databases     | Database
Tables        | Collections
Records (Rows)| Documents

Relational databases are usually based on relationships between tables; in contrast, in Mongo relationships between collections and documents are managed manually (in embedded relationships, or in two separate documents)

```terminal
$ brew update
$ brew install mongodb
```
Use sudo to make directory, set permissions for new folder, will go through recursively and change permission owner to user:

```
sudo mkdir -p /data/db
sudo chown -R `id -un` /data/db
```

In a new Terminal window, run the Mongo daemon in one tab:
```
$ mongod
```

At some point in the Terminal output, the below will indicate if the server port is running and listening for requests:
```
2018-12-12T02:20:27.954+1100 I NETWORK  [initandlisten] waiting for connections on port 27017
```

Then in another tab, connect to the Mongo daemon:
```
$ mongo
```

If it is showing with arrow cursor, it's connected from the previous Terminal window, so we can now send commands to the Mongo database.

There is now a client in one tab and a server on the other.

#### Mongo Commands
To show all databases:
```
$ show dbs
```

To create a new database (the document won't be created until an entry has been made):
```
$ use [database-name]
```

To create a new collection:
```
$ db.createCollection('[NAME]')
```

To show collections:
```
$ show collections
```

If needed, to drop a database:
```
$ db.moves.drop()
```

To insert an object (or any kind of ON structure) into the database:
```
db.pokemon.insert({name: 'Bulbasaur'})
db.pokemon.insert([ { name: 'Charmander'}, { name: 'Charmeleon'}, ])
```

Will display an entry, or all entries in the database:
```
db.pokemon.find({})
db.pokemon.find({name: 'Ivasaur'})

// Returns a cursor - like an array of objects 
db.pokemon.find({weight: '5lb'})

// Convert to array and find values like a usual array
db.pokemon.find({weight: "5lb"}).toArray()[0].name
```

To update an existing record:
```
db.pokemon.update({name: 'Bulbasaur'}, {name: 'BUBLESAUR'})

// However, the below must be specified otherwise it will replace all the existing values of the object with the new entry
db.pokemon.update({name: 'Ivasaur'}, {$set: {name: 'IVYSAUR'}})
```

To update many database entries:
```
db.pokemon.updateMany({}, {$set: {admin: false}})
```

To remove:
```
// A single entry
db.pokemon.remove({name: "BUBLESAUR"})

// The entire collection
db.pokemon.remove({})
```

To import a JSON file:
```
--jsonArray --db pokedex --collection pokemon --file pokemon.json
```

Creating many to many relationships between tables:

```
db.pokemon.insert([{name: 'Pidgey', moves: []}, {name: 'Weedle', moves: []}, {name: 'Harrison}])

let tackle = db.moves.findOne({name: 'tackle'})
tackle._id

let bite = db.moves.findOne({name: 'bite})
bite._id

db.pokemon.update({name: 'Pidgey'}, {$set: {moves: [tackle._id, bite._id]}})
db.pokemon.update({name: 'Harrison', {$set: {moves: [bite._id]}}})

db.pokemon.find({moves: bite._id})
```