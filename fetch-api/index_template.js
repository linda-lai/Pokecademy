const url = 'https://pokeapi.co/api/v2/pokemon/';

fetch(url)
    .then((resp) => resp.json())
    .then(json => {
        const actualPokemon = json.results.slice(0, 151);
        let html = "";
        actualPokemon.forEach((poke, index) => {
            html += `
                <a href="poke-info.html?${index + 1}">
                    <p>${poke.name.toUpperCase()}</p>
                </a>
            `;
        });
        const list = document.querySelector('#pokemon-list');
        list.innerHTML = html
    })
    .catch((error) => console.error(error))