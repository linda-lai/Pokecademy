
# MongoDB
**MongoDB** is an open-source document-based database system. A key benefit is its ability to scale up with ease and hold very large amounts of data. MongoDB stores documents in collections within databases - JSON-like objects with schemata.

A *collection* is grouping of MongoDB documents - the equivalent of an RDBMS table. A collection exists within a single database. Collections do not enforce a schema. Documents within a collection can have different fields. Typically, all documents in a collection have a similar or related purpose.

A *document* is a record in a MongoDB collection and the basic unit of data in MongoDB. Documents are analogous to JSON objects but exist in the database in a more type-rich format known as BSON.

If there is a collection where one part/field of is being updated exponentially relative to other parts of the document, consider breaking it out into a separate collection. 

## Resources
* MongoDB Glossary: https://docs.mongodb.com/manual/reference/glossary/#term-sharded-cluster

## Document vs. Relational Databases
Relational databases are usually based on relationships between tables; in contrast, in Mongo relationships between collections and documents are managed manually (in embedded relationships, or in two separate documents):

Relational DB | Mongo DB
--------------|--------------
Databases     | Database
Tables        | Collections
Records (Rows)| Documents

## Running MongoDB
### Setup
Update to latest Homebrew packages:

```
$ brew update
```

Install MongoDB:
```
$ brew install mongodb
```

To confirm MongoDB has been installed:
```
$ which mongod
```

Before starting MongoDB for the first time, create the directory to which the mongod process will write data. By default, the `mongod` process uses the /data/db directory.

Use sudo to make directory, set permissions for new folder, will go through recursively and change permission owner to user.

The below command creates the default /data/db directory:

```
$ sudo mkdir -p /data/db
```

Before running mongod for the first time, ensure that the user account running mongod has read and write permissions for the directory.
```
$ sudo chown -R `id -un` /data/db
```

### Server
In a new Terminal window, connect to the MongoDB database server. The `mongod` command starts the MongoDB server as a daemon to manage data requests and formats, managing background operations:

```
$ mongod
```

Verify that MongoDB has started successfully by checking the process output for the following line (confirms the the server port is running and listening for requests):
```
2018-12-12T02:20:27.954+1100 I NETWORK  [initandlisten] waiting for connections on port 27017
```

### Shell
Then in another tab, connect to the MongoDB shell (the shell has a JavaScript interface). The `mongo` command starts the MongoDB shell as a daemon connected to either a `mongod` or `mongos` instance:

```
$ mongo
```

If it is showing with arrow cursor, it's connected from the previous Terminal window, so we can now send commands to the Mongo database.

There is now a server in one tab and a client on the other.
In MongoDB, a *database* is a physical container for collections. Each database gets its own set of files on the file system. A single MongoDB server typically has multiple databases.

### Databases
To show all databases:
```
$ show dbs
```

To initialise a new database (it won't be created until a collection has been created):
```
$ use [database-name]
```

When `use [database-name]` is called, it creates an alias for the current database called `db` - this can now be used in reference to the current database in use.

### Collections

A *collection* is grouping of MongoDB documents - the equivalent of an RDBMS table. A collection exists within a single database. Collections do not enforce a schema. Documents within a collection can have different fields. Typically, all documents in a collection have a similar or related purpose.

To create a new collection:
```
$ db.createCollection('[NAME]')
$ db.createCollection('pokemon')
```

To show collections:
```
$ show collections
```

If needed, to drop a collection:
```
$ db.moves.drop()
```

### CRUD
#### Create
To insert an object (or any kind of ON structure) into a database, the collection is invoked with the insert function `db.[collection-name].insert({})`:

```
$ db.pokemon.insert({name: 'Bulbasaur'})
$ db.pokemon.insert([ { name: 'Charmander'}, { name: 'Charmeleon'}, ])
```

#### Read
To display an entry, or all entries in a collection, the collection is invoked, with an optional filter parameter `db.[collection-name].find({})`:

```
$ db.pokemon.find({})
$ db.pokemon.find({name: 'Ivasaur'})
```

Keep in mind that `.find` returns a cursor - like an array of objects.

```
$ db.pokemon.find({weight: '5lb'})
$ db.pokemon.find({name: 'Ivysaur'})
```

`.find` can be used to search for all objects matching a specified key, or one:
```
$ db.pokemon.find({height: "6cm"})
$ db.pokemon.findOne({height: "6cm"})
```

A cursor can be stored in a variable and converted to an array so values and methods can be managed like a usual array:

```
$ db.pokemon.find({weight: "5lb"}).toArray()[0].name
$ const pokemon = db.pokemon.find().toArray()
```

#### Update
To update an existing record, `db.[collection-name].update({})`:

Beware! Doing so like below will replace all existing values in the object with only the ones specified below:

```
$ db.pokemon.update({name: 'Bulbasaur'}, {name: 'BUBLESAUR'})
```

Also! Be sure to pass an argument to an update query, otherwise this will make the change to all objects if left empty:

```
$ db.pokemon.update({})
```

So that existing values in the object aren't overwritten, `{$set}` is used in the updated entry:
```
$ db.pokemon.update({name: 'Ivasaur'}, {$set: {name: 'IVYSAUR'}})
```

To update many database entries:
```
$ db.pokemon.updateMany({}, {$set: {admin: false}})
```

The `upsert` (update/insert) collection of objects can be passed through to update an existing entry, or create a new entry if none exists:
```
$ db.pokemon.update({name: 'Charmeleon'}, {id: 5, name: 'Charmeleon', height: '7cm'}, {upsert: true})
```

#### Delete
To remove an existing record, `.remove` function is invoked and appended to the collection name `db.[collection-name].remove({})`.

To remove a single entry:

```
$ db.pokemon.remove({name: "BUBLESAUR"})
```

Beware! Be sure to pass an argument to an update query, otherwise this will delete the entire collection if left empty:

```
$ db.pokemon.remove({})
```

### Mongo Relationships
Relational logic is not enforced by MongoDB - relationships between documents and objects are expressed as an embedded collection.

```
$ db.pokemon.insert({name: "Squirtle", moves: ["tackle", "bite"], id: 1})
$ db.pokemon.findOne({name: "Squirtle"}).moves
$ db.pokemon.findOne({name: "Squirtle"})
```

This will return:
```
{
	"_id" : ObjectId("5c1606730b2f1b579c08d734"),
	"name" : "Squirtle",
	"moves" : [
		"tackle",
		"bite"
	],
	"id" : 1
}
```

To express a relationship between collections, they are embedded into objects.

To create a many to many relationships between tables, create a new collection:

```
$ db.createCollection('moves')
```

Create new document entries for the collection:
```
$ db.moves.insert([
... {
... _id: 1,
... name: 'tackle'
... },
... {
... _id: 2,
... name: 'tail whip'
... },
... {
... _id: 3,
... name: 'bite'
... }
... ])
```

These can now be queried and converted to an array like object:
```
db.moves.find().toArray()
```

To create a relationship between a Pokemon and an array move:
```
$ use pokedex
// switched to db pokedex

$ show collections
// moves
// pokemon

$ db.pokemon.find()
// { "_id" : ObjectId("5c15fd610b2f1b579c08d731"), "id" : 2, "name" : "Ivysaur", "height" : "8cm", "admin" : false }
// { "_id" : ObjectId("5c15fd610b2f1b579c08d732"), "id" : 3, "name" : "VENUAUR", "height" : "12cm", "admin" : false }
// { "_id" : ObjectId("5c15ff2e0b2f1b579c08d733"), "id" : 4, "name" : "Charmander", "height" : "6cm", "admin" : false }
// { "_id" : ObjectId("5c16052960bd158038e2ce8a"), "id" : 5, "name" : "Charmeleon", "height" : "7cm" }

$ db.moves.find()
// { "_id" : 1, "name" : "tackle" }
// { "_id" : 2, "name" : "tail whip" }
// { "_id" : 3, "name" : "bite" }
```

To embed documents from a collection in another document object:
```
$ const tackle = db.moves.findOne({name: 'tackle'})
$ const bite = db.moves.findOne({name: 'bite'})
```

Create a new empty array value in the parent objects:
```
$ db.pokemon.updateMany({}, {$set: {moves: []}})
```

To update a single Pokemon with moves, add the moves IDs as values to the empty moves array within the Pokemon object:
```
$ db.pokemon.update({name: 'Ivysaur'}, {$set: {moves: [tackle._id, bite._id]}})

// { "_id" : ObjectId("5c15fd610b2f1b579c08d731"), "id" : 2, "name" : "Ivysaur", "height" : "8cm", "admin" : false, "moves" : [ 1, 3 ] }

$ db.pokemon.update({name: 'Charmander'}, {$set: {moves: [bite._id]}})
$ db.pokemon.findOne({name: 'Charmander'})
{
	"_id" : ObjectId("5c15ff2e0b2f1b579c08d733"),
	"id" : 4,
	"name" : "Charmander",
	"height" : "6cm",
	"admin" : false,
	"moves" : [
		3
	]
}
```

To query, such as search for multiple Pokemon with a specific move, this needs to be done in two separate steps. Whereas in a relational database a join would be used to express a relationship, with MongoDB a select statement is passed through a query object:
```
$ db.pokemon.find({moves: tackle._id}).toArray()
$ db.pokemon.find({moves: bite._id}).toArray() 
```

Essentially, this involves two separate queries to the database - one to find the ID for the parameter to be searched to link, and another statement to insert that information into the object or read that object.

This can get quite messy and convoluted, which is why we try to break up the two:
```
$ db.pokemon.find({moves: db.moves.findOne({name: 'bite'})._id}).toArray()
```

To clear collections:
```
$ db.pokemon.remove({})
$ db.moves.remove({})
```

### Import JSON
In the folder containingthe data to be imported, use `mongoimport` to import a file (this is installed when MongoDB is installed as part of `brew install mongodb`)

```
$ mongoimport --jsonArray --db pokedex --collection pokemon --file pokemon_json.js
```

Then, run `mongo` to open a new Terminal shell and confirm this has been added to the Pokemon collection:
```
$ mongo
$ use pokedex
$ db.pokemon.find().toArray()
```