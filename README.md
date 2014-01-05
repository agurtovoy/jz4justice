# jz4justice.org

This is a full-stack Javascript application, built with [Node.js](http://nodejs.org), [Express](http://expressjs.com/), [Twitter Bootstrap](http://getbootstrap.com/), [Hogan.js](http://twitter.github.io/hogan.js/), [Bower](http://bower.io) and [Brunch](http://brunch.io).

## Getting started
* Install (if you don't have them):
    * [Node.js](http://nodejs.org): `brew install node` on OS X
    * [Brunch](http://brunch.io): `npm install -g brunch`
    * [Bower](http://bower.io): `npm install -g bower`
    * Brunch plugins and Bower dependencies: `npm install & bower install`.
* Run:
    * `brunch watch --server` — watches the project with continuous rebuild. This will also launch HTTP server with [pushState](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Manipulating_the_browser_history).
    * `brunch build --production` — builds minified project for production
* Learn:
    * `public/` dir is fully auto-generated and served by HTTP server.  Put client code and assets in the `client/` dir.
