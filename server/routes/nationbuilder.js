
exports.admin = exports.login = function( req, res ) {
    res.redirect( 'http://action.jz4justice.org/login/' );
};


exports.callback = function( req, res ) {
    console.log( req );
};
