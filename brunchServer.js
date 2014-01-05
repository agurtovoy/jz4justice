
exports.startServer = function( port, path, callback ) {
    var server = require( './server' );
    var http = require( 'http' );
	http.createServer( server.app ).listen( port, callback );
	}
