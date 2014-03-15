
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var routes = require('./routes');
var user = require('./routes/user');
var nationbuilder = require('./routes/nationbuilder');
var mailman = require('./routes/mailman');

var app = express();

// all environments
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);

var publicDir = path.join( __dirname, '..', 'public' );
app.use( require('less-middleware')( { src: publicDir } ) );
app.use( express.static( publicDir ) );

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get( '/', routes.index.bind( app ) );
app.get( '/login', nationbuilder.login );
app.get( '/admin', nationbuilder.admin );
app.get( '/team-discussion', mailman.team_discussion );
//app.get( '/users', user.list );

exports.app = app;

