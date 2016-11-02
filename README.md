Framework for REST-API in Node.js (written in TypeScript)

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

## Features
* Node.js webserver by express
* Session handling via express-session
* Request logs in console via morgan
* Database connection for SQLite3 and MySQL with abstraction layer via any-db
* Parsing of request json body via body-parser
* Static file delivery via express
* Express routing in abstraction in config file
* MVC Pattern for route developement
* Utility to generate new route with MVC template
* Developement without restart of application by nodemon

## Usage
* Run the application `node app/build/server.js`
* Create a new route by adding the following lines with values in config/route.json
`"Name of page for only humans": {
  "method": "GET/PUT/POST/DELETE",
  "url": "/:parameterName",
  "controller": "NameOfCreatedController"
},`

## General notes
* Get a GET parameter value by using `req.params`
  * example: requested url `http://127.0.0.1:8000/test/123`; route `/test/:id`; get value by `req.params.id`
* Get JSON payload of a request by using `req.body`
* Files in public/ will be delivered directly
  * example: public/cat.gif is able to be requested by `http://127.0.0.1:8000/cat.gif`
* Use session as variable `req.session`
* * AnyDB database object for SQLite3 and MySQL usage see https://github.com/grncdr/node-any-db

## Utilities
* createRoute: Create a new route with MVC template `node utility/createRoute.js`

## MVC interpretation
![alt text](https://i.imgsafe.org/9d627428df.png "Flowchart")
