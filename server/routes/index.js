var util = require('util');
var request = require('request');
var nodemailer = require('nodemailer');
var _ = require('underscore');
var nb = {
    baseUrl: 'https://endoverprosecution.nationbuilder.com/api/v1',
    accessToken: process.env.NB_ACCESS_TOKEN
};

function sendEmail( msg ) {
    var smtpTransport = nodemailer.createTransport( 'sendmail', {
        path: '/usr/sbin/sendmail'
    });

    console.log( msg );
    smtpTransport.sendMail( msg, function( error, response ) {
        if ( error )
            console.log( error );
        else
            console.log( "Message sent: " + response.message );

        smtpTransport.close();
    });
}

function daydiff(first, second) {
    return Math.floor((second-first)/(1000*60*60*24));
}

exports.page = function(pageName, req, res, options) {
  var daysToElection = daydiff(new Date(), new Date(2014,5,3));
  res.render( pageName, _.extend( {
    pageName: pageName,
    title: 'Official Website',
    daysToElection: daysToElection,
    production: this.get('env') != 'development'
    }, options || {} ) );
};


exports.yard_sign = function( pageName, req, res ) {
    var renderOptions = { fields: {} };
    if ( req.method == 'POST' ) {

        var errors = [];
        req.checkBody('name', 'name').notEmpty();
        req.checkBody('address', 'address').notEmpty();
        req.checkBody('city', 'city').notEmpty();
        req.checkBody('numberOfSigns', 'number of signs').notEmpty();
        if ( !req.body.email && !req.body.phone )
            errors.push( 'either a phone or email (we need some way of contacting you back)' );

        errors = ( _.pluck( req.validationErrors(), 'msg' ) || [] ).concat( errors );
        console.log(errors);
        if ( errors.length ) {
            _.extend( renderOptions, {
                fields: _.pick( req.body, [ 'name', 'address', 'city', 'numberOfSigns', 'email', 'phone', 'notes' ] ),
                error: ( errors.length > 1
                        ? 'Please specify your ' + _.initial( errors ).join( ', ') + ' and ' + _.last( errors )
                        : 'Please specify ' + errors.join( ', ') )
            } );
        } else {
            var formData = req.body;
            var nameParts = formData.name.split( ' ' );
            var person = {
                first_name: _.first( nameParts ),
                last_name: _.rest( nameParts).join( ' ' ),
                email: formData.email,
                phone: formData.phone,
                registered_address: {
                    address1: formData.address,
                    city: formData.city,
                    state: "IA",
                    country_code: "US"
                },
                tags: [ 'yard-sign', formData.numberOfSigns + '-signs' ],
                note: formData.notes || 'yard sign request',
                is_supporter: true
            };

            _.extend( renderOptions, {
                justRequested: true,
                firstName: person.first_name,
                thankYou: ( formData.numberOfSigns == 1
                    ? 'Your yard sign is on its way!'
                    : 'Your yard signs are on their way!' )
            } );

            var googleMapsAddress = util.format( '%s, %s, IA', formData.address, formData.city );
            var googleMapsUrl = util.format( 'https://maps.google.com/maps?q=%s&z=15', encodeURIComponent( googleMapsAddress ) );
            sendEmail( {
                from: "yardsigns@jz4justice.org",
                to: "yardsigns@jz4justice.org",
                subject: util.format( "[Yard Sign Request] %s from %s wants %s sign(s)", formData.name, formData.city, formData.numberOfSigns ),
                text: '\nLookup address on Google Maps: ' + googleMapsUrl +
                      '\nSee all requests here: http://votenojusticecenter.org/admin/votenojusticecenter/yardsignrequest/'
            } );

            request.post({ url: nb.baseUrl + '/people', json: true, body: { person: person, access_token: nb.accessToken } }, function( error, response, body ) {
                console.log([error, body]);
                exports.page.call( this, pageName, req, res, renderOptions );
            }.bind( this ) );
            return;
        }
    } else {
        renderOptions.fields.numberOfSigns = 1;
    }

    exports.page.call( this, pageName, req, res, renderOptions );
};


exports.voting_reminder = function(req, res) {
    if ( req.method != 'POST' )
        return;

    var render = function ( error, response, body ) {
        console.log( [error, body.person]);
        exports.page.call(this, 'vote', req, res, { pledge: true, pledgeError: error || body.error });
    }.bind( this );

    var phone_or_email = req.body.phone_or_email;
    var person = { tags: [ 'voting-reminder' ], note: 'voting reminder' };
    if ( phone_or_email.indexOf( '@' ) != -1 ) {
        request.get({ url: nb.baseUrl + '/people/match', json: true, body: { email: phone_or_email, access_token: nb.accessToken } }, function(error, response, body) {
            if (body.person) {
                console.log( body.person );
                person.tags = body.person.tags.concat( person.tags );
                request.put({ url: nb.baseUrl + '/people/' + body.person.id, json: true, body: { person: person, access_token: nb.accessToken } }, render);
            } else {
                console.log( 'creating new' );
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

};

