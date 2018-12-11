// ALL POKEMON (http://127.0.0.1:5500/)
// RENDER POKEMON IN HTML/APPEND DOM NODE
const renderPokemon = (pokemon) => {
    // Targets empty <div> with id="pokemon-list"
    const list = document.querySelector('#pokemon-list')
    pokemon.forEach((poke, index) => {
        console.log(index)
        // 'panel' creates a new <div> element and inserts the name value of each poke item
        const panel = `
            <div>
                <a href="poke-info.html?${index + 1}">
                    <p>${poke.name.toUpperCase()}</p>
                </a>
            </div>
        `;
        // Select DOM node, append HTML at the end of each iteration of the loop
        list.insertAdjacentHTML('beforeend', panel)
    })
}

// POKEAPI
// PokeAPI returns a stringified version of the JSON object
const url = 'https://pokeapi.co/api/v2/pokemon/';

// FETCH
fetch(url)
    .then((resp) => resp.json()) // returns a promise
    .then(json => {
        console.log(json) // shows all the key/values returned in the JSON object
        const actualPokemon = json.results.slice(0, 151); // 'json' is an array, actualPokemon slices the returned array
        renderPokemon(actualPokemon); // JSON object returned from API is rendered through the renderPokemon function
    })
    .catch((error) => console.error(error)) // .error changes the colour of the TypeError output