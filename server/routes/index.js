
/*
 * GET home page.
 */

exports.index = function(req, res){
    console.log('routes/index')
  res.render('index', { title: 'Express' });
};