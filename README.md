# Pokecademy
Using ![PokéAPI](https://github.com/PokeAPI) (a RESTful Pokémon API) to practice Fetch in JavaScript...and catch 'em all.

[![PokéAPI](/assets/pokeapi.png)](https://pokeapi.co/)

## Fetch API
### ('/')
The simplest use of `fetch()` takes one argument — the path to the resource you want to fetch — and returns a promise containing the response (a Response object).

This is just an HTTP response, not the actual JSON. To extract the JSON body content from the response, we use the `json()` method (defined on the Body mixin, which is implemented by both the Request and Response objects).

1. In `index.html` file, create an empty <div> with a meaningful name to populate with data from the API.
   ```html
   <h1>Pokemon List</h1>
    <div id="pokemon-list"></div>

    <script src="index.js"></script>
   ```
   
2. In `index.js` file, create a new Fetch API request using `fetch()`:
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
3. In `poke-info.html` file...
   ```html
       <div id="poke-info" class="page-container">
       </div>
    
    <script src="poke-info.js"></script>
   ```
4. In `poke-info.js` file...

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
5. 