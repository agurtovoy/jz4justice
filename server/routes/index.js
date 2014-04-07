var request = require('request');
var und = require('underscore');
var nb = {
    baseUrl: 'https://endoverprosecution.nationbuilder.com/api/v1',
    accessToken: process.env.NB_ACCESS_TOKEN
};

function daydiff(first, second) {
    return Math.floor((second-first)/(1000*60*60*24));
}

exports.page = function(pageName, req, res, options) {
  var daysToElection = daydiff(new Date(), new Date(2014,5,3));
  res.render( pageName, und.extend( {
    pageName: pageName,
    title: 'Official Website',
    daysToElection: daysToElection,
    production: this.get('env') != 'development'
    }, options || {} ) );
};


exports.voting_reminder = function(req, res) {
    if ( req.method != 'POST' )
        return;

    var render = function ( error, response, body ) {
        exports.page.call(this, 'vote', req, res, { pledge: true, pledgeError: error || body.error });
    }.bind( this );

    var phone_or_email = req.body.phone_or_email;
    var person = { tags: [ 'voting-reminder' ], note: 'voting reminder' };
    if ( phone_or_email.indexOf( '@' ) != -1 ) {
        request.get({ url: nb.baseUrl + '/people/match', json: true, body: { email: phone_or_email, access_token: nb.accessToken } }, function(error, response, body) {
            if (body.person) {
                person.tags = body.person.tags.concat( person.tags );
                request.put({ url: nb.baseUrl + '/people/' + body.person.id, json: true, body: { person: person, access_token: nb.accessToken } }, render);
            } else {
                person[ 'email' ] = phone_or_email;
                request.post({ url: nb.baseUrl + '/people', json: true, body: { person: person, access_token: nb.accessToken } }, render);
            }
        } );
    } else if ( phone_or_email.length ) {
        person[ 'phone' ] = phone_or_email;
        request.post({ url: nb.baseUrl + '/people', json: true, body: { person: person, access_token: nb.accessToken } }, render);
    } else {
        render( 'Please provide your email or phone number and try again.', res, {} );
    }

}
