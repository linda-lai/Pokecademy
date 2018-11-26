const renderPokemon = (pokemon) => {
    const list = document.querySelector('#pokemon-list')
    pokemon.forEach((poke, index) => {
        console.log(index)
        // panel creates a new div element and inserts the name value of each poke item
        const panel = `
            <div>
                <a href="poke-info.html?${index + 1}">
                    <p>${poke.name.toUpperCase()}</p>
                </a>
            </div>
        `;
        // Access the list, insert HTML at the end of each iteration of the loop
        list.insertAdjacentHTML('beforeend', panel)
    })
}

const url = 'https://pokeapi.co/api/v2/pokemon/';

// .fetch() returns the promise of a future value that doesn't exist yet, will continue sequentially executing
// .fetch request is making a GET request to the API by default
// API is returning a stringified version of the JSON object

//----------ES5 .fetch----------//
// fetch(url)
//     .then(function(response) {
//         console.log(response);
//         return response.json()
//     })

//----------ES6 .fetch----------//
fetch(url)
    // 'resp' is like |item| in forEach, variable can be named whatever but cannot choose what it returns (based on the API)
    .then((resp) => resp.json()) // returns a promise
    .then(json => {
        console.log(json) // console.log shows all the key/values returned in the JSON object
        const actualPokemon = json.results.slice(0, 151) // 'json' is an array, actualPokemon slices the returned array (.slice is an array method) to store only the data we want in a variable
        // console.log(actualPokemon);
        renderPokemon(actualPokemon)
        }) // JSON object returned from API is rendered through the renderPokemon function

    .catch((error) => console.error(error)) // .error changes the colour of the TypeError output