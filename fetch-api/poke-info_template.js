const queryParams = window.location.search;
const id = queryParams.substr(1);
const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;

fetch(url)
  .then(resp => resp.json())
  .then(json => {
      const html = `
        <h1>${json.id}: ${json.name.toUpperCase()}</h1>
        <img src="${json.sprites.front_default}" alt="This is a front image of ${json.name}">
        <p>Weight: ${json.weight} | Height: ${json.height}</p>
        <ul id="ability-items"></ul>
      `;
      const info = document.querySelector('#poke-info');
      info.innerHTML = html;
  })
  .catch(error => console.log(error))