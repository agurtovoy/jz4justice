
/*
 * GET home page.
 */

function daydiff(first, second) {
    return Math.floor((second-first)/(1000*60*60*24));
}

exports.page = function(pageName, req, res) {
  var daysToElection = daydiff(new Date(), new Date(2014,5,3));
  res.render( pageName, {
    pageName: pageName,
    title: 'Official Website',
    daysToElection: daysToElection,
    production: this.get('env') != 'development'
    } );
};
