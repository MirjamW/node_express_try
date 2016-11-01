## Requirements
* node.js LTS 4.6.0
* typescript (`npm install typescript -g`)
* tsd (`npm install tsd -g`)
* nodemon (`npm install -g nodemon`)

## Installation
1. Navigate to root of project
2. Install node dependencies `npm install`
3. Install typescript dependencies `tsd install`
4. Build JavaScript from Typescript first time `tsc -w`
5. Try run `nodemon app/build/server.js`

## Usage
* Run the application `node app/build/server.js`
* Create a new route by adding the following lines with explicit values in route.json
`"Name of page for only humans": {
  "method": "GET/PUT/POST/DELETE",
  "url": "/:parameterName",
  "controller": "NameOfCreatedController"
},`
* AnyDB database object for SQLite3 and MySQL usage see https://github.com/grncdr/node-any-db

## General notes

* Get a GET parameter value by using `req.params`
  * example: requested url `http://127.0.0.1:8000/test/123`; route `/test/:id`; get value by `req.params.id`
* Get JSON payload of a request by using `req.body`
* Files in public/ will be delivered directly
  * example: public/cat.gif is able to be requested by `http://127.0.0.1:8000/cat.gif`
* Use session as variable `req.session`

## Utilities
* createRoute: Create a new route with MVC template `node utility/createRoute.js`

## To-do
