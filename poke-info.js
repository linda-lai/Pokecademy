// To render 'abilities' from Pokemon array object
const renderAbilities = (poke) => {
    // Creates a panel variable to select empty poke-info <div> by id
    const panel = document.querySelector('#poke-info');
    // Creates a ul variable to create a new <ul> with abilities id
    const ul = `<ul id="abilities"></ul>`;

    // insertAdjacentHTML() method inserts a text as HTML, into a specified position
    // 'beforehand' pushes text before the end of the element (as the last child)
    panel.insertAdjacentHTML('beforeend', ul);
    
    // Creates new ulElement to select <ul> in DOM
    // Iterates through poke.abilities array, inserts single ability into <ul> as a <li> item
    const ulElement = document.querySelector('#abilities');
    poke.abilities.forEach(ability => {
        ulElement.insertAdjacentHTML('beforeend', `<li>${ability.ability.name}</li>`);
    });

    // To add Abilities heading at the top of <ul>
    const ulHeader = document.querySelector('#abilities');
    ulHeader.insertAdjacentHTML('beforebegin', `<h2>Abilities<h2>`)
}

// To render 'moves' from Pokemon array object
const renderMoves = (poke) => {
    // Creates a panel variable to select empty poke-info <div> by id
    const panel = document.querySelector('#poke-info');
    
    // Creates a ul variable to create a new <ul> with moves id
    const ul = `<ul id="moves"></ul>`;
    
    // insertAdjacentHTML() method inserts a text as HTML, into a specified position
    // 'beforehand' pushes text before the end of the element (as the last child)
    panel.insertAdjacentHTML('beforeend', ul);
    
    // Creates new ulElement to select <ul> in DOM
    // Iterates through poke.movwe array, inserts single move into <ul> as a <li> item
    const ulElement = document.querySelector('#moves');
    poke.moves.forEach(move => {
        ulElement.insertAdjacentHTML('beforeend', `<li>${move.move.name}</li>`);
    });

    // To add Moves heading at the top of <ul>
    const ulHeader = document.querySelector('#moves');
    ulHeader.insertAdjacentHTML('beforebegin', `<h2>Moves<h2>`)

}

// To render Pokemon on /:id page with pokeInfo, renderAbilities and renderMoves
const renderPokemon = (poke) => {
    console.log(poke)

    // Creates a panel variable to select empty poke-info <div> by id
    const panel = document.querySelector('#poke-info');

    // pokeInfo variable is called in fetchInfo method, when promise object is returned => .then(json => renderPokemon(json))
    const pokeInfo = `
    <h1>${poke.id}: ${poke.name.toUpperCase()}</h1>
    <img src="${poke.sprites.front_default}" alt="This is a front image of ${poke.name}">
    <p>Weight: ${poke.weight} | Height: ${poke.height}</p>
    <ul id="ability-items"></ul>
    `;

    // insertAdjacentHTML() method inserts a text as HTML, into a specified position
    // 'beforehand' pushes text before the end of the element (as the last child)
    panel.insertAdjacentHTML('beforeend', pokeInfo);

    // invokes the renderAbilities method - using my solution
    renderAbilities(poke)
    renderMoves(poke)

    // Displays the entire JSON object returned by fetch in console.log
    console.log(poke)
}

// To search :id parameter to Pokemon object :id
const getId = () => {
    // The window.location object is used to get the current page address (URL) and redirect the browser to a new page
    // The search property sets or returns the querystring part of a URL
    // The querystring part is the part of the URL after the question mark (?); often used for parameter passing
    const queryParams = window.location.search;
    // Returns params including and after "?", e.g. ?72, .substr slices off first
    const id = queryParams.substr(1);
    return id;
}
  
const fetchInfo = () => {
    const id = getId();
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    fetch(url)
      .then(resp => resp.json())
    // If promise is successfully resolved, run the renderPokemon method with the JSON response
      .then(json => renderPokemon(json))
    // Otherwise console.log the error with error styling
      .catch(error => console.error(error));
}

fetchInfo();