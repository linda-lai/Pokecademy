# Express API
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
$ npm install express --save
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