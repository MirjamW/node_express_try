## Requirements
* node.js LTS 4.6.0
* typescript (`npm install typescript -g`)
* tsd (`npm install tsd -g`)

## Installation
1. Navigate to root of project
2. Install node dependencies `npm install`
3. Install typescript dependencies `tsd install`
4. Build JavaScript from Typescript first time `tsc -w`
5. Try run `node app/build/server.js`

## Usage
* Run the application `node app/build/server.js`
* Create a new route by adding the following lines with explicit values in route.json
`"Name of page for only humans": {
  "method": "GET/PUT/POST/DELETE",
  "url": "/:parameterName",
  "controller": "NameOfCreatedController"
},`

## To-do
* Define MVC structure
