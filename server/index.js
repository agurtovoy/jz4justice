
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var routes = require('./routes');
var exphbs = require('express3-handlebars');
var expressValidator = require('express-validator');

var user = require('./routes/user');
var nationbuilder = require('./routes/nationbuilder');
var mailman = require('./routes/mailman');

var app = express();

// all environments
app.set('views', path.join(__dirname, 'views'));
app.engine('hjs', exphbs({
    extname: '.hjs',
    defaultLayout: 'main',
    layoutsDir: app.get('views') + '/layouts',
    partialsDir: app.get('views') + '/partials',
    helpers: {
        pageActive: function( x, y ) { return x == y ? 'active' : ''; }
    }
}));
app.set('view engine', 'hjs');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(express.bodyParser());
app.use(expressValidator());
app.use(app.router);

var publicDir = path.join( __dirname, '..', 'public' );
app.use( require('less-middleware')( { src: publicDir } ) );
app.use( express.static( publicDir ) );


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get( '/', routes.page.bind( app, 'platform' ) );
app.get( '/platform', routes.page.bind( app, 'platform' ) );
app.get( '/yard-sign', routes.yard_sign.bind( app, 'yard-sign' ) );
app.post( '/yard-sign', routes.yard_sign.bind( app, 'yard-sign' ) );
app.get( '/meet-john', routes.page.bind( app, 'meet-john' ) );
app.get( '/vote', routes.page.bind( app, 'vote' ) );
app.post( '/vote', routes.voting_reminder.bind( app ) );
app.get( '/volunteer', routes.page.bind( app, 'volunteer' ) );
app.get( '/donate', routes.page.bind( app, 'donate' ) );
app.get( '/login', nationbuilder.login );
app.get( '/admin', nationbuilder.admin );
app.get( '/team-discussion', mailman.team_discussion );
app.post( '/auth/nb/callback', nationbuilder.callback );
//app.get( '/users', user.list );


exports.app = app;

