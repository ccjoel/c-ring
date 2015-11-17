
# Ops-Ring

A small project that implements a small feature of OpsCenter for interview purposes - Cassandra Cluster Ring

## Project Url

`http://ops-ring.cf`

# Running Project

The previously built dev version is checked to repo under `www/` dir, just deploy it on a server.
You might use a dev server, like the npm package `http-server`.

Won't minify sources for now, since it might help with inspecting.

# Using the Application

You may use the dev tools/console on your browser. I have exposed a function

Sample call of this function with array format:

 ```javascript
window.opsRing.redrawNodes(["0","85070591730234615865843651857942052864"]);
 ```

You may also input the array contents on the textArea of the Application:

`"0","85070591730234615865843651857942052864"`

and press update to view the changes.


## Setting up the project
`npm install`

## Build

The compilable assets are contained under the `app` dir. You may run these under root directory:

To compile js into one bundle/file:
```
webpack
```
^ this is important, since we only import one file into index.html, and we can `require` modules as we would in a node environment.

To process sass into css:
```
gulp styles
```

## Development

During development, you might want to have these running:
- `webpack --progress --colors --watch`, to bundle files into bundle.js for import to html
- `gulp watch`, to watch for scss/sass file changes and create the main.css file
- `node_modules/mocha/bin/mocha -w app/tests/acceptance.js -t 10000`, to run acceptance tests using selenium
- `node_modules/mocha/bin/mocha -w app/tests/unit.js`, to run unit tests

## Running unit tests
```
node_modules/mocha/bin/mocha app/tests/unit.js
```

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

## Tested on these browsers:

- Google Chrome - Version 46.0.2490.80 (64-bit) - Mac OSX
- Chromium - Version 47.0.2526.16 (64-bit) - Gentoo Linux
- Mozilla Firefox - Version 41.0.1 - Mac OSX
- Safari - Version 9.0.1 (11601.2.7.2)
- PhantomJs - Version 1.9.8 - Gentoo Linux

For more compatibilities by feature (svg), see the caniuse image under the `docs`
folder

#### Technologies Used:
- `D3js`
- `Susy SASS Grids`
- `Breakpoint Media queries`
- `Roboto` Font from Google
- `BigNumber` npm package

#### Notes

- Running under es5 environment, not using babel or es6
- Webpack has a lot of dependencies. I don't mind but you'll see a big number of components under node_modules, and might take more to install on slow internet speeds.
