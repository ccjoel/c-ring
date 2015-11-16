
# Ops-Ring

A small project that implements a small feature of OpsCenter for interview purposes - Cassandra Cluster Ring

## Project Url

`http://ops-ring.cf`

## Run Project

The previously built project is checked to repo under `www` dir, just deploy it on a server.
You might use a dev server, like the npm package `http-server`.

### Setting up the project

`npm install`

## Build

The compilable assets are contained under `app` dir. You may run these under root directory:

To compile js into one bundle/file:
`webpack`
^ this is important, since we only import one file into index.html, and we can `require` modules as we would in a node environment.

To process sass into css:
`gulp styles`

## Development

During development, you might want to have these running:
`webpack --progress --colors --watch`, to bundle files into bundle.js for import to html
`gulp watch`, to watch for scss/sass file changes and create the main.css file
`node_modules/mocha/bin/mocha -w app/tests/acceptance.js -t 10000`, to run acceptance tests using selenium
`node_modules/mocha/bin/mocha -w app/tests/unit.js`, to run unit tests

## Running unit tests
`node_modules/mocha/bin/mocha app/tests/unit.js`

## Running Acceptance Tests
`node_modules/mocha/bin/mocha app/tests/acceptance.js -t 10000`

Note: Automated tests were run only on phantomjs for now

## Dependencies

To be able to run npm/bower install, you will need:

- `nodejs`:
 - If Ubuntu: `sudo apt-get install nodejs`
 - If Gentoo: `sudo emerge net-libs/nodejs`
 - OSX: `brew install node`, hopefully using homebrew
 - Else, go to nodejs website, and install.
- `npm`
 - Usually bundled when installing nodejs
- `webpack`: install with `npm install -g webpack`, after installing `npm`

### Notes

- Running under es5 environment, not using babel or es6
- Webpack has a lot of dependencies. I don't mind but you'll see a big number of components under node_modules, and might take more to install on slow internet speeds.


#### Technologies Used:

- `D3js`
- `Susy SASS Grids`
- `Breakpoint Media queries`
- `Roboto` Font from Google
- BigNumber
