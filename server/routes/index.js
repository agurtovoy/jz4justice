
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render( 'index', { title: 'John Zimmerman for Johnson County Attorney', production: this.get('env') != 'development' } );
};