// BUILDING AN API USING EXPRESS

// DEPENDENCIES
// Express is a factory function
const express = require('express');
// Require in Joi to add validations, it will return an instance that can be used straight away
const Joi = require('joi');
// express() function will product a JavaScript object
// a function that produces an object is a 'factory' function
const app = express();

// 'DATABASE'
const pokemonArray = [
    {
       "name":"Bulbasaur",
       "attack":49,
       "defense":49,
       "evolveLevel":16,
       "evolveTo":"2",
       "type":"grass",
       "moves":[
          "tackle",
          "vine whip"
       ],
       "curve":1.3,
       "levels": [5, 10],
       "probability": 3
    },
    {
       "name":"Ivysaur",
       "attack":62,
       "defense":63,
       "evolveLevel":32,
       "evolveTo":"3",
       "type":"grass",
       "moves":[
          "tackle",
          "vine whip",
          "razor leaf"
       ],
       "curve":1.3
    },
    {
       "name":"Venusaur",
       "attack":82,
       "defense":83,
       "type":"grass",
       "moves":[
          "tackle",
          "vine whip",
          "razor leaf"
       ],
       "curve":1.3
    },
    {
       "name":"Charmander",
       "attack":52,
       "defense":43,
       "evolveLevel":16,
       "evolveTo":"5",
       "type":"fire",
       "moves":[
          "scratch",
          "ember",
          "metal claw"
       ],
       "curve":1.3,
       "levels": [5, 10],
       "probability": 3
    },
    {
       "name":"Charmeleon",
       "attack":64,
       "defense":58,
       "evolveLevel":36,
       "evolveTo":"6",
       "type":"fire",
       "moves":[
          "scratch",
          "ember",
          "metal claw",
          "flamethrower"
       ],
       "curve":1.3
    },
    {
       "name":"Charizard",
       "attack":84,
       "defense":78,
       "type":"fire",
       "moves":[
          "flamethrower",
          "wing attack",
          "slash",
          "metal claw"
       ],
       "curve":1.3
    },
    {
       "name":"Squirtle",
       "attack":48,
       "defense":65,
       "evolveLevel":16,
       "evolveTo":"8",
       "type":"water",
       "moves":[
          "tackle",
          "bubble",
          "water gun"
       ],
       "curve":1.3,
       "levels": [5, 10],
       "probability": 3
    },
    {
       "name":"Wartortle",
       "attack":63,
       "defense":80,
       "evolveLevel":36,
       "evolveTo":"9",
       "type":"water",
       "moves":[
          "tackle",
          "bubble",
          "water gun",
          "bite"
       ],
       "curve":1.3
    },
    {
       "name":"Blastoise",
       "attack":83,
       "defense":100,
       "type":"water",
       "moves":[
          "hydro pump",
          "bubble",
          "water gun",
          "bite"
       ],
       "curve":1.3
    },
    {
       "name":"Caterpie",
       "attack":30,
       "defense":35,
       "evolveLevel":7,
       "evolveTo":"11",
       "type":"bug",
       "moves":[
          "tackle"
       ],
       "curve":1.6,
       "levels": [2, 7],
       "probability": 15
    },
    {
       "name":"Butterfree",
       "attack":45,
       "defense":50,
       "type":"bug",
       "moves":[
          "confusion",
          "gust",
          "psybeam",
          "silver wind"
       ],
       "curve":1.6
    },
    {
       "name":"Weedle",
       "attack":35,
       "defense":30,
       "evolveLevel":7,
       "evolveTo":"14",
       "type":"bug",
       "moves":[
          "poison sting"
       ],
       "curve":1.6,
       "levels": [2, 7],
       "probability": 15
    },
    {
       "name":"Pidgey",
       "attack":45,
       "defense":40,
       "evolveLevel":18,
       "evolveTo":"17",
       "type":"normal",
       "moves":[
          "tackle",
          "gust"
       ],
       "curve":1.3,
       "levels": [2, 10],
       "probability": 15
    },
    {
       "name":"Pidgeotto",
       "attack":60,
       "defense":55,
       "evolveLevel":36,
       "evolveTo":"18",
       "type":"normal",
       "moves":[
          "tackle",
          "gust",
          "wing attack"
       ],
       "curve":1.3
    },
    {
       "name":"Pidgeot",
       "attack":80,
       "defense":75,
       "type":"normal",
       "moves":[
          "tackle",
          "gust",
          "wing attack"
       ],
       "curve":1.3
    },
    {
       "name":"Rattata",
       "attack":56,
       "defense":35,
       "evolveLevel":20,
       "evolveTo":"20",
       "type":"normal",
       "moves":[
          "tackle",
          "hyper fang"
       ],
       "curve":1.6,
       "levels": [2, 7],
       "probability": 20
    },
    {
       "name":"Raticate",
       "attack":81,
       "defense":60,
       "type":"normal",
       "moves":[
          "tackle",
          "hyper fang"
       ],
       "curve":1.6
    },
    {
       "name":"Spearow",
       "attack":60,
       "defense":30,
       "evolveLevel":20,
       "evolveTo":"22",
       "type":"normal",
       "moves":[
          "peck"
       ],
       "curve":1.6,
       "levels": [5, 15],
       "probability": 10
    },
    {
       "name":"Fearow",
       "attack":90,
       "defense":65,
       "type":"normal",
       "moves":[
          "peck",
          "drill peck"
       ],
       "curve":1.6
    },
    {
       "name":"Ekans",
       "attack":60,
       "defense":44,
       "evolveLevel":22,
       "evolveTo":"24",
       "type":"poison",
       "moves":[
          "poison sting",
          "bite"
       ],
       "curve":1.6,
       "levels": [5, 15],
       "probability": 15
    },
    {
       "name":"Arbok",
       "attack":85,
       "defense":69,
       "type":"poison",
       "moves":[
          "poison sting",
          "bite",
          "acid"
       ],
       "curve":1.6
    },
    {
       "name":"Raichu",
       "attack":90,
       "defense":55,
       "type":"electric",
       "moves":[
          "thundershock",
          "thunderbolt"
       ],
       "curve":1.6
    },
    {
       "name":"Sandshrew",
       "attack":75,
       "defense":85,
       "evolveLevel":22,
       "evolveTo":"28",
       "type":"ground",
       "moves":[
          "scratch",
          "poison sting"
       ],
       "curve":1.6,
       "levels": [5, 15],
       "probability": 10
    },
    {
       "name":"Sandslash",
       "attack":100,
       "defense":110,
       "type":"ground",
       "moves":[
          "scratch",
          "poison sting",
          "slash",
          "swift"
       ],
       "curve":1.6
    },
    {
       "name":"Nidoran",
       "attack":47,
       "defense":52,
       "evolveLevel":16,
       "evolveTo":"30",
       "type":"poison",
       "moves":[
          "scratch"
       ],
       "curve":1.3,
       "levels": [5, 8],
       "probability": 15
    },
    {
       "name":"Nidoqueen",
       "attack":82,
       "defense":87,
       "type":"poison",
       "moves":[
          "scratch",
          "poison sting",
          "body slam",
          "superpower"
       ],
       "curve":1.3
    },
    {
       "name":"Nidoran",
       "attack":57,
       "defense":40,
       "evolveLevel":16,
       "evolveTo":"33",
       "type":"poison",
       "moves":[
          "peck"
       ],
       "curve":1.3,
       "levels": [5, 8],
       "probability": 15
    },
    {
       "name":"Nidoking",
       "attack":92,
       "defense":77,
       "type":"poison",
       "moves":[
          "peck",
          "poison sting",
          "megahorn"
       ],
       "curve":1.3
    },
    {
       "name":"Ninetales",
       "attack":76,
       "defense":75,
       "type":"fire",
       "moves":[
          "ember"
       ],
       "curve":1.6
    },
    {
       "name":"Zubat",
       "attack":45,
       "defense":35,
       "evolveLevel":22,
       "evolveTo":"42",
       "type":"poison",
       "moves":[
          "astonish",
          "bite",
          "wing attack"
       ],
       "curve":1.6,
       "levels": [5, 15],
       "probability": 15
    },
    {
       "name":"Golbat",
       "attack":80,
       "defense":70,
       "type":"poison",
       "moves":[
          "poison fang",
          "bite",
          "wing attack",
          "air cutter"
       ],
       "curve":1.6
    },
    {
       "name":"Paras",
       "attack":70,
       "defense":55,
       "evolveLevel":24,
       "evolveTo":"47",
       "type":"bug",
       "moves":[
          "scratch"
       ],
       "curve":1.6,
       "levels": [5, 15],
       "probability": 15
    },
    {
       "name":"Parasect",
       "attack":95,
       "defense":80,
       "type":"bug",
       "moves":[
          "scratch",
          "slash"
       ],
       "curve":1.6
    },
    {
       "name":"Venonat",
       "attack":55,
       "defense":50,
       "evolveLevel":31,
       "evolveTo":"49",
       "type":"bug",
       "moves":[
          "tackle",
          "confusion"
       ],
       "curve":1.6,
       "levels": [10, 24],
       "probability": 8
    },
    {
       "name":"Venomoth",
       "attack":65,
       "defense":60,
       "type":"bug",
       "moves":[
          "psybeam",
          "psychic",
          "confusion",
          "gust"
       ],
       "curve":1.6
    },
    {
       "name":"Diglett",
       "attack":55,
       "defense":25,
       "evolveLevel":26,
       "evolveTo":"51",
       "type":"ground",
       "moves":[
          "scratch"
       ],
       "curve":1.6,
       "levels": [8, 16],
       "probability": 15
    },
    {
       "name":"Dugtrio",
       "attack":80,
       "defense":50,
       "type":"ground",
       "moves":[
          "scratch",
          "slash",
          "earthquake"
       ],
       "curve":1.6
    },
    {
       "name":"Meowth",
       "attack":45,
       "defense":35,
       "evolveLevel":28,
       "evolveTo":"53",
       "type":"normal",
       "moves":[
          "scratch",
          "bite"
       ],
       "curve":1.6,
       "levels": [8, 20],
       "probability": 10
    },
    {
       "name":"Persian",
       "attack":70,
       "defense":60,
       "type":"normal",
       "moves":[
          "scratch",
          "bite",
          "slash"
       ],
       "curve":1.6
    },
    {
       "name":"Psyduck",
       "attack":52,
       "defense":48,
       "evolveLevel":33,
       "evolveTo":"55",
       "type":"water",
       "moves":[
          "scratch",
          "confusion"
       ],
       "curve":1.6,
       "levels": [8, 20],
       "probability": 15
    },
    {
       "name":"Golduck",
       "attack":82,
       "defense":78,
       "type":"water",
       "moves":[
          "scratch",
          "confusion",
          "hydro pump"
       ],
       "curve":1.6
    },
    {
       "name":"Mankey",
       "attack":80,
       "defense":35,
       "evolveLevel":28,
       "evolveTo":"57",
       "type":"fighting",
       "moves":[
          "scratch",
          "low kick",
          "karate chop"
       ],
       "curve":1.6,
       "levels": [5, 18],
       "probability": 8
    },
    {
       "name":"Primeape",
       "attack":105,
       "defense":60,
       "type":"fighting",
       "moves":[
          "scratch",
          "low kick",
          "karate chop",
          "cross chop"
       ],
       "curve":1.6
    },
    {
       "name":"Arcanine",
       "attack":110,
       "defense":80,
       "type":"fire",
       "moves":[
          "bite",
          "ember"
       ],
       "curve":1
    },
    {
       "name":"Poliwag",
       "attack":50,
       "defense":40,
       "evolveLevel":25,
       "evolveTo":"61",
       "type":"water",
       "moves":[
          "bubble",
          "water gun"
       ],
       "curve":1.3,
       "levels": [5, 18],
       "probability": 6
    },
    {
       "name":"Poliwrath",
       "attack":85,
       "defense":95,
       "type":"water",
       "moves":[
          "water gun"
       ],
       "curve":1.3
    },
    {
       "name":"Alakazam",
       "attack":50,
       "defense":45,
       "type":"psychic",
       "moves":[
          "confusion",
          "psybeam",
          "psychic"
       ],
       "curve":1.3
    },
    {
       "name":"Machop",
       "attack":80,
       "defense":50,
       "evolveLevel":28,
       "evolveTo":"67",
       "type":"fighting",
       "moves":[
          "low kick",
          "karate chop"
       ],
       "curve":1.3,
       "levels": [5, 19],
       "probability": 12
    },
    {
       "name":"Machamp",
       "attack":130,
       "defense":80,
       "type":"fighting",
       "moves":[
          "low kick",
          "karate chop",
          "cross chop",
          "dynamicpunch"
       ],
       "curve":1.3
    },
    {
       "name":"Bellsprout",
       "attack":75,
       "defense":35,
       "evolveLevel":21,
       "evolveTo":"70",
       "type":"grass",
       "moves":[
          "vine whip"
       ],
       "curve":1.3,
       "levels": [5, 20],
       "probability": 15
    },
    {
       "name":"Victreebel",
       "attack":105,
       "defense":65,
       "type":"grass",
       "moves":[
          "vine whip",
          "razor leaf"
       ],
       "curve":1.3
    },
    {
       "name":"Tentacool",
       "attack":40,
       "defense":35,
       "evolveLevel":30,
       "evolveTo":"73",
       "type":"water",
       "moves":[
          "poison sting",
          "constrict",
          "acid",
          "bubblebeam"
       ],
       "curve":1,
       "levels": [5, 20],
       "probability": 10
    },
    {
       "name":"Tentacruel",
       "attack":70,
       "defense":65,
       "type":"water",
       "moves":[
          "hydro pump",
          "constrict",
          "acid",
          "bubblebeam"
       ],
       "curve":1
    },
    {
       "name":"Geodude",
       "attack":80,
       "defense":100,
       "evolveLevel":25,
       "evolveTo":"75",
       "type":"rock",
       "moves":[
          "tackle",
          "rock throw"
       ],
       "curve":1.3,
       "levels": [5, 20],
       "probability": 15
    },
    {
       "name":"Golem",
       "attack":110,
       "defense":130,
       "type":"rock",
       "moves":[
          "tackle",
          "rock throw",
          "earthquake"
       ],
       "curve":1.3
    },
    {
       "name":"Ponyta",
       "attack":85,
       "defense":55,
       "evolveLevel":40,
       "evolveTo":"78",
       "type":"fire",
       "moves":[
          "ember",
          "stomp"
       ],
       "curve":1.6,
       "levels": [20, 35],
       "probability": 6
    },
    {
       "name":"Rapidash",
       "attack":100,
       "defense":70,
       "type":"fire",
       "moves":[
          "ember",
          "stomp",
          "fire blast"
       ],
       "curve":1.6
    },
    {
       "name":"Slowpoke",
       "attack":65,
       "defense":65,
       "evolveLevel":37,
       "evolveTo":"80",
       "type":"water",
       "moves":[
          "tackle",
          "water gun",
          "confusion",
          "headbutt"
       ],
       "curve":1.6,
       "levels": [25, 35],
       "probability": 5
    },
    {
       "name":"Slowbro",
       "attack":75,
       "defense":110,
       "type":"water",
       "moves":[
          "psychic",
          "water gun",
          "confusion",
          "headbutt"
       ],
       "curve":1.6
    },
    {
       "name":"Magnemite",
       "attack":35,
       "defense":70,
       "evolveLevel":30,
       "evolveTo":"82",
       "type":"electric",
       "moves":[
          "tackle",
          "thundershock",
          "spark"
       ],
       "curve":1.6,
       "levels": [5, 20],
       "probability": 8
    },
    {
       "name":"Magneton",
       "attack":60,
       "defense":95,
       "type":"electric",
       "moves":[
          "tackle",
          "thundershock",
          "spark",
          "zap cannon"
       ],
       "curve":1.6
    },
    {
       "name":"Farfetch'd",
       "attack":65,
       "defense":55,
       "type":"normal",
       "moves":[
          "peck",
          "slash"
       ],
       "curve":1.6,
       "levels": [25, 40],
       "probability": 8
    },
    {
       "name":"Doduo",
       "attack":85,
       "defense":45,
       "evolveLevel":31,
       "evolveTo":"85",
       "type":"normal",
       "moves":[
          "peck"
       ],
       "curve":1.6,
       "levels": [15, 25],
       "probability": 8
    },
    {
       "name":"Dodrio",
       "attack":110,
       "defense":70,
       "type":"normal",
       "moves":[
          "peck",
          "drill peck"
       ],
       "curve":1.6
    },
    {
       "name":"Seel",
       "attack":45,
       "defense":55,
       "evolveLevel":34,
       "evolveTo":"87",
       "type":"water",
       "moves":[
          "headbutt",
          "icy wind",
          "aurora beam"
       ],
       "curve":1.6,
       "levels": [25, 30],
       "probability": 4
    },
    {
       "name":"Dewgong",
       "attack":70,
       "defense":80,
       "type":"water",
       "moves":[
          "ice beam",
          "headbutt",
          "icy wind",
          "aurora beam"
       ],
       "curve":1.6
    },
    {
       "name":"Grimer",
       "attack":80,
       "defense":50,
       "evolveLevel":38,
       "evolveTo":"89",
       "type":"poison",
       "moves":[
          "pound",
          "sludge"
       ],
       "curve":1.6,
       "levels": [5, 30],
       "probability": 10
    },
    {
       "name":"Muk",
       "attack":105,
       "defense":75,
       "type":"poison",
       "moves":[
          "pound",
          "sludge",
          "sludge bomb"
       ],
       "curve":1.6
    },
    {
       "name":"Cloyster",
       "attack":95,
       "defense":180,
       "type":"water",
       "moves":[
          "aurora beam"
       ],
       "curve":1
    },
    {
       "name":"Gastly",
       "attack":35,
       "defense":30,
       "evolveLevel":25,
       "evolveTo":"93",
       "type":"ghost",
       "moves":[
          "tackle",
          "lick"
       ],
       "curve":1.3,
       "levels": [5, 15],
       "probability": 10
    },
    {
       "name":"Gengar",
       "attack":65,
       "defense":60,
       "type":"ghost",
       "moves":[
          "tackle",
          "lick",
          "shadow punch",
          "shadow ball"
       ],
       "curve":1.3
    },
    {
       "name":"Onix",
       "attack":45,
       "defense":160,
       "type":"rock",
       "moves":[
          "iron tail",
          "rock throw",
          "dragonbreath",
          "slam"
       ],
       "curve":1.6,
       "levels": [5, 40],
       "probability": 8
    },
    {
       "name":"Drowzee",
       "attack":48,
       "defense":45,
       "evolveLevel":26,
       "evolveTo":"97",
       "type":"psychic",
       "moves":[
          "pound",
          "confusion",
          "headbutt"
       ],
       "curve":1.6,
       "levels": [5, 15],
       "probability": 8
    },
    {
       "name":"Hypno",
       "attack":73,
       "defense":70,
       "type":"psychic",
       "moves":[
          "pound",
          "confusion",
          "headbutt",
          "psychic"
       ],
       "curve":1.6
    },
    {
       "name":"Krabby",
       "attack":105,
       "defense":90,
       "evolveLevel":28,
       "evolveTo":"99",
       "type":"water",
       "moves":[
          "bubble",
          "vicegrip",
          "mud shot",
          "stomp"
       ],
       "curve":1.6,
       "levels": [15, 20],
       "probability": 6
    },
    {
       "name":"Kingler",
       "attack":130,
       "defense":115,
       "type":"water",
       "moves":[
          "stomp",
          "crabhammer",
          "vicegrip",
          "mud shot"
       ],
       "curve":1.6
    },
    {
       "name":"Voltorb",
       "attack":30,
       "defense":50,
       "evolveLevel":30,
       "evolveTo":"101",
       "type":"electric",
       "moves":[
          "tackle",
          "spark"
       ],
       "curve":1.6,
       "levels": [5, 12],
       "probability": 6
    },
    {
       "name":"Electrode",
       "attack":50,
       "defense":70,
       "type":"electric",
       "moves":[
          "tackle",
          "spark",
          "swift"
       ],
       "curve":1.6
    },
    {
       "name":"Exeggutor",
       "attack":95,
       "defense":85,
       "type":"grass",
       "moves":[
          "confusion",
          "stomp",
          "egg bomb"
       ],
       "curve":1
    },
    {
       "name":"Cubone",
       "attack":50,
       "defense":95,
       "evolveLevel":28,
       "evolveTo":"105",
       "type":"ground",
       "moves":[
          "bone club",
          "headbutt"
       ],
       "curve":1.6,
       "levels": [15, 22],
       "probability": 5
    },
    {
       "name":"Marowak",
       "attack":80,
       "defense":110,
       "type":"ground",
       "moves":[
          "bone club",
          "headbutt"
       ],
       "curve":1.6
    },
    {
       "name":"Hitmonlee",
       "attack":120,
       "defense":53,
       "evolveLevel":20,
       "evolveTo":"107",
       "type":"fighting",
       "moves":[
          "rolling kick"
       ],
       "curve":1.6,
       "levels": [5, 15],
       "probability": 4
    },
    {
       "name":"Hitmonchan",
       "attack":105,
       "defense":79,
       "type":"fighting",
       "moves":[
          "mega punch",
          "ice punch",
          "fire punch",
          "sky uppercut"
       ],
       "curve":1.6
    },
    {
       "name":"Lickitung",
       "attack":55,
       "defense":75,
       "type":"normal",
       "moves":[
          "lick",
          "stomp",
          "slam"
       ],
       "curve":1.6,
       "levels": [5, 15],
       "probability": 10
    },
    {
       "name":"Koffing",
       "attack":65,
       "defense":95,
       "evolveLevel":35,
       "evolveTo":"110",
       "type":"poison",
       "moves":[
          "tackle",
          "smog",
          "sludge"
       ],
       "curve":1.6,
       "levels": [15, 25],
       "probability": 6
    },
    {
       "name":"Weezing",
       "attack":90,
       "defense":120,
       "type":"poison",
       "moves":[
          "tackle",
          "smog",
          "sludge"
       ],
       "curve":1.6
    },
    {
       "name":"Rhyhorn",
       "attack":85,
       "defense":95,
       "evolveLevel":42,
       "evolveTo":"112",
       "type":"ground",
       "moves":[
          "horn attack",
          "stomp"
       ],
       "curve":1,
       "levels": [15, 35],
       "probability": 4
    },
    {
       "name":"Rhydon",
       "attack":130,
       "defense":120,
       "type":"ground",
       "moves":[
          "horn attack",
          "stomp",
          "earthquake",
          "megahorn"
       ],
       "curve":1
    },
    {
       "name":"Chansey",
       "attack":5,
       "defense":5,
       "type":"normal",
       "moves":[
          "pound",
          "egg bomb"
       ],
       "curve":1.9,
       "levels": [25, 55],
       "probability": 4
    },
    {
       "name":"Tangela",
       "attack":55,
       "defense":115,
       "type":"grass",
       "moves":[
          "constrict",
          "vine whip",
          "slam"
       ],
       "curve":1.6,
       "levels": [15, 45],
       "probability": 4
    },
    {
       "name":"Kangaskhan",
       "attack":95,
       "defense":80,
       "type":"normal",
       "moves":[
          "bite",
          "mega punch",
          "dizzy punch"
       ],
       "curve":1.6,
       "levels": [5, 45],
       "probability": 4
    },
    {
       "name":"Horsea",
       "attack":40,
       "defense":70,
       "evolveLevel":32,
       "evolveTo":"117",
       "type":"water",
       "moves":[
          "bubble",
          "water gun",
          "twister"
       ],
       "curve":1.6,
       "levels": [5, 15],
       "probability": 10
    },
    {
       "name":"Seadra",
       "attack":65,
       "defense":95,
       "type":"water",
       "moves":[
          "bubble",
          "water gun",
          "twister",
          "hydro pump"
       ],
       "curve":1.6
    },
    {
       "name":"Goldeen",
       "attack":67,
       "defense":60,
       "evolveLevel":33,
       "evolveTo":"119",
       "type":"water",
       "moves":[
          "peck",
          "horn attack"
       ],
       "curve":1.6,
       "levels": [5, 25],
       "probability": 12
    },
    {
       "name":"Seaking",
       "attack":92,
       "defense":65,
       "type":"water",
       "moves":[
          "peck",
          "horn attack",
          "waterfall",
          "megahorn"
       ],
       "curve":1.6
    },
    {
       "name":"Starmie",
       "attack":75,
       "defense":85,
       "type":"water",
       "moves":[
          "water gun",
          "swift"
       ],
       "curve":1
    },
    {
       "name":"Mr. mime",
       "attack":45,
       "defense":65,
       "type":"psychic",
       "moves":[
          "confusion",
          "magical leaf",
          "psybeam",
          "psychic"
       ],
       "curve":1.6,
       "levels": [5, 15],
       "probability": 4
    },
    {
       "name":"Scyther",
       "attack":110,
       "defense":80,
       "type":"bug",
       "moves":[
          "wing attack",
          "slash"
       ],
       "curve":1.6,
       "levels": [5, 15],
       "probability": 4
    },
    {
       "name":"Jynx",
       "attack":50,
       "defense":35,
       "type":"ice",
       "moves":[
          "body slam",
          "blizzard",
          "powder snow",
          "ice punch"
       ],
       "curve":1.6,
       "levels": [5, 15],
       "probability": 4
    },
    {
       "name":"Electabuzz",
       "attack":83,
       "defense":57,
       "type":"electric",
       "moves":[
          "thunderpunch",
          "swift",
          "thunderbolt",
          "thunder"
       ],
       "curve":1.6,
       "levels": [5, 15],
       "probability": 4
    },
    {
       "name":"Magmar",
       "attack":95,
       "defense":57,
       "type":"fire",
       "moves":[
          "fire blast",
          "smog",
          "fire punch",
          "flamethrower"
       ],
       "curve":1.6,
       "levels": [5, 15],
       "probability": 4
    },
    {
       "name":"Pinsir",
       "attack":125,
       "defense":100,
       "type":"bug",
       "moves":[
          "vicegrip"
       ],
       "curve":1,
       "levels": [5, 15],
       "probability": 4
    },
    {
       "name":"Tauros",
       "attack":100,
       "defense":95,
       "type":"normal",
       "moves":[
          "tackle",
          "horn attack"
       ],
       "curve":1,
       "levels": [5, 15],
       "probability": 4
    },
    {
       "name":"Magikarp",
       "attack":10,
       "defense":55,
       "evolveLevel":20,
       "evolveTo":"130",
       "type":"water",
       "moves":[
          "tackle"
       ],
       "curve":1,
       "levels": [5, 15],
       "probability": 15
    },
    {
       "name":"Gyarados",
       "attack":125,
       "defense":79,
       "type":"water",
       "moves":[
          "bite",
          "twister",
          "hydro pump"
       ],
       "curve":1
    },
    {
       "name":"Lapras",
       "attack":85,
       "defense":80,
       "type":"water",
       "moves":[
          "water gun",
          "body slam",
          "ice beam",
          "hydro pump"
       ],
       "curve":1,
       "levels": [5, 15],
       "probability": 4
    },
    {
       "name":"Eevee",
       "attack":55,
       "defense":50,
       "type":"normal",
       "moves":[
          "tackle",
          "bite"
       ],
       "curve":1.6,
       "levels": [5, 35],
       "probability": 8
    },
    {
       "levels": [5, 15],
       "probability": 4,
       "name":"Jolteon",
       "attack":65,
       "defense":60,
       "type":"electric",
       "moves":[
          "tackle",
          "thundershock",
          "thunder"
       ],
       "curve":1.6
    },
    {
       "name":"Flareon",
       "attack":130,
       "defense":60,
       "type":"fire",
       "moves":[
          "flamethrower",
          "ember",
          "bite",
          "smog"
       ],
       "curve":1.6
    },
    {
       "name":"Porygon",
       "attack":60,
       "defense":70,
       "type":"normal",
       "moves":[
          "tackle",
          "psybeam",
          "zap cannon"
       ],
       "curve":1.6,
       "levels": [5, 45],
       "probability": 4
    },
    {
       "name":"Omanyte",
       "attack":40,
       "defense":100,
       "evolveLevel":40,
       "evolveTo":"139",
       "type":"rock",
       "moves":[
          "constrict",
          "bite",
          "water gun",
          "mud shot"
       ],
       "curve":1.6
    },
    {
       "name":"Omastar",
       "attack":60,
       "defense":125,
       "type":"rock",
       "moves":[
          "ancientpower",
          "hydro pump",
          "water gun",
          "mud shot"
       ],
       "curve":1.6
    },
    {
       "name":"Kabuto",
       "attack":80,
       "defense":90,
       "evolveLevel":40,
       "evolveTo":"141",
       "type":"rock",
       "moves":[
          "scratch",
          "mud shot"
       ],
       "curve":1.6
    },
    {
       "name":"Kabutops",
       "attack":115,
       "defense":105,
       "type":"rock",
       "moves":[
          "scratch",
          "mud shot",
          "slash",
          "ancientpower"
       ],
       "curve":1.6
    },
    {
       "name":"Aerodactyl",
       "attack":105,
       "defense":65,
       "type":"rock",
       "moves":[
          "wing attack",
          "bite",
          "ancientpower"
       ],
       "curve":1
    },
    {
       "name":"Snorlax",
       "attack":110,
       "defense":65,
       "type":"normal",
       "moves":[
          "tackle",
          "headbutt",
          "snore",
          "body slam"
       ],
       "curve":1,
       "levels": [25, 25],
       "probability": 2
    },
    {
       "name":"Articuno",
       "attack":85,
       "defense":100,
       "type":"ice",
       "moves":[
          "gust",
          "powder snow",
          "ice beam",
          "blizzard"
       ],
       "curve":1,
       "levels": [50, 50],
       "probability": 1
    },
    {
       "name":"Zapdos",
       "attack":90,
       "defense":85,
       "type":"electric",
       "moves":[
          "peck",
          "thundershock",
          "drill peck",
          "thunder"
       ],
       "curve":1,
       "levels": [50, 50],
       "probability": 1
    },
    {
       "name":"Moltres",
       "attack":100,
       "defense":90,
       "type":"fire",
       "moves":[
          "wing attack",
          "ember",
          "flamethrower",
          "heat wave"
       ],
       "curve":1,
       "levels": [50, 50],
       "probability": 1
    },
    {
       "name":"Dratini",
       "attack":64,
       "defense":45,
       "evolveLevel":30,
       "evolveTo":"148",
       "type":"dragon",
       "moves":[
          "twister",
          "slam"
       ],
       "curve":1,
       "levels": [10, 20],
       "probability": 6
    },
    {
       "name":"Dragonair",
       "attack":84,
       "defense":65,
       "evolveLevel":55,
       "evolveTo":"149",
       "type":"dragon",
       "moves":[
          "twister",
          "slam"
       ],
       "curve":1
    },
    {
       "name":"Dragonite",
       "attack":134,
       "defense":95,
       "type":"dragon",
       "moves":[
          "twister",
          "slam",
          "wing attack"
       ],
       "curve":1
    },
    {
       "name":"Mewtwo",
       "attack":110,
       "defense":90,
       "type":"psychic",
       "moves":[
          "confusion",
          "swift",
          "psychic"
       ],
       "curve":1,
       "levels": [70, 70],
       "probability": 1
    },
    {
       "name":"Mew",
       "attack":100,
       "defense":100,
       "type":"psychic",
       "moves":[
          "pound",
          "mega punch",
          "psychic",
          "ancientpower"
       ],
       "curve":1.3,
       "levels": [50, 50],
       "probability": 0.3
    }
]
// Iterate through Pokemon array and add key/value of id to each Poke
const pokemon = pokemonArray.map((poke, i) => {poke.id = i+1; return poke;})

// MIDDLEWARE
// Uses middleware to allow access to the data for our request - gives the ability to read the body of the request
app.use(express.json());

// 'GET': TO SET A ROUTE FOR THE ROOT at '/'
// Calling .get function - sets up a route for root
app.get('/', function(req, res) {
    return res.send('Hello world. From the Poke Express API!');
});

// 'GET': TO SHOW ALL POKEMON IN THE ARRAY at '/pokemon'
// Like Pokemon.all in Rails => API will return all Pokemon saved in the 'pokemon' array as a JSON object
// Unlike Rails, method can access a variable outside of it 'pokemon', get '/pokemon' to controller#action
app.get('/pokemon', (req, res) => {
    return res.send(pokemon);
});

// 'GET': TO SHOW AN INDIVIDUAL POKEMON IN THE ARRAY at '/pokemon/:id'
// :id is a variable we can access to determine which Poke to send back
app.get('/pokemon/:id', (req, res) => {
    // console.log(req.params.id);
    // Grabs the id out of params, converts to integer
    const id = parseInt(req.params.id);
    const poke = pokemon.find(p => p.id === id);
    // If 'undefined', coerce into FALSE for the below if statement
    if (!poke) {
        // 200 - success, 300 - redirect, 400 - client error, 500 - server error
        return res.send('Pokemon not found!');
    }
    return res.send(poke);
});

// 'POST': TO ADD A NEW POKEMON TO OUR ARRAY at '/pokemon'
app.post('/pokemon', (req, res) => {
    // 1. Get new params from request body
    const id = req.body.id;
    const name = req.body.name;
    // 2. Add to array
    const poke = { id: id, name: name};
    pokemon.push(poke);
    // 3. Send new Pokemon as response
    return res.send(poke);
});

// 'PUT': TO UPDATE AN EXISTING POKEMON IN THE ARRAY at '/pokemon/:id'
// Implement a PUT endpoint to update a Pokemon in the array
app.put('/pokemon/:id', (req, res) => {
    // 1. Check the array for the Pokemon
    // Grabs the id out of params, converts to integer, needs to match number and data type
    const id = parseInt(req.params.id);
    const poke = pokemon.find(p => p.id === id);
    if (!poke) {
        return res.status(404).send('Pokemon not found!');
      }
    // 2. Validate what the user should give us
    // Schema adds validations
    const schema = {
        name: Joi.string().min(3).required()
    }
    // Testing request.body against schema rules - if input is valid
    const valid = Joi.validate(req.body, schema);
    // To view the error messages
    // console.log(valid.details[0].messages)
    // Settings for if it fails validation
    const error = valid.error
    // If error does exist (and doesn't return as undefined), return status code to specify error
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    // Get new params from request body
    const name = req.body.name;
    // 3. Update the record
    // Send back Pokemon as the response
    poke.name = name;
    return res.send(poke);
});

// 'DELETE': TO DELETE A POKEMON FROM THE ARRAY at /pokemon/:id
app.delete('/pokemon/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const poke = pokemon.find(p => p.id === id);
    if (!poke) {
      return res.status(404).send('Pokemon not found!');
    }
    const index = pokemon.indexOf(poke);
    pokemon.splice(index, 1);
    return res.send(poke);
});

// PORT
app.listen(5000, () => {
    console.log("Listening on port 5000");
});