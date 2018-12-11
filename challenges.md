# Pokemon Academy
Challenges for Term 2, Week 7.

## Monday
### Challenge
Display the following on the `poke-info.html` page:

- the pokemon's id
- a list of the pokemon's abilities
- a list of their moves

### Beast Mode
- display an image of the pokemon (this property will exist somewhere on the response object returned from `https://pokeapi.co/api/v2/pokemon/:id`)
- use CSS or Bootstrap to add some nice styling to the pages

## Tuesday
### Challenge
Write routes for:
1. PUT/PATCH: /pokemon/:id
2. DELETE: /pokemon/:id
   
### Beast Mode
1. A route to search for a name
2. Saving the data to a JSON file (edited)

## Thursday
### Challenge

- Implement a new database and collection for yesterday's todo challenge
- Practice using the Mongo CLI to:
  - create new todos
  - update certain fields - such as completing a specific todo
  - access specific subsets of documents - such as all high priority todos
  - delete specific todos
- In a new text file, write the command you would need to use for each of the endpoints we implemented in the express app in yesterday's challenge

### Beast Mode
- Extend the pokedex mongo database by adding a new collection for trainers
- Use the Mongo CLI to populate with two trainers (obviously Ash and Gary) with the following structure:
{
  name: 'Ash',
  home: 'Pallet Town',
  party: [],
  pokedex: []
}
- Use Mongo CLI to update the two trainers with 6 pokemon in their party and 10 pokemon in their pokedex - use references to _id of pokemon
- Use Mongo CLI to find a subset of pokemon that both trainers have in common

### Beast Mode++
- Research the `mongoose` npm package and try to use a new node file to connect to the todo mongo database