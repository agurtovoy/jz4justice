window.socialSidebar = (function (window, document, undefined) {

    function init( args ) {
        require("client/bower_components/jquery/jquery.min");
        var $ = jQuery;

        $(window).load( function() {
            var container = $('.social-sidebar-container');
            var sidebar = $('.social-sidebar');
            var footer = $('.page-footer');

            var anchor = $( args.anchor );
            if ( anchor.length ) {
                var initialTop = anchor.offset().top;
                var currentTop = sidebar.offset().top;
                var initialOffset = initialTop - currentTop;
                if ( currentTop != initialTop )
                    sidebar.css( { top: initialOffset } );
                sidebar.css( { visibility: 'visible' } );

                function reposition() {
                    var windowTop = $(window).scrollTop();
                    var windowHeight = ( window.innerHeight || $(window).height() );
                    var sidebarHeight = sidebar.height();
                    var offset = Math.floor( Math.max( ( windowHeight - sidebarHeight ) / 2, 0 ) );
                    var footerTop = footer.offset().top;

                    if ( windowTop + offset + sidebarHeight + args.distanceToFooter > footerTop ) {
                        container.css( { position: 'relative' } );
                        sidebar.css( { position: 'absolute', top: footerTop - args.distanceToFooter - sidebarHeight - container.offset().top } );
                    }
                    else if ( anchor.offset().top > windowTop + offset ) {
                        container.css( { position: 'relative' } );
                        sidebar.css( { position: 'absolute', top: initialOffset } );
                    } else  if ( sidebar.offset().top - windowTop != offset ) {
                        container.css( { position: 'absolute' } );
                        sidebar.css( { position: 'fixed', top: offset } );
                    }
                }

                $(window).scroll( reposition );
                $(window).resize( reposition );

            } else {
                sidebar.css( { display: 'none' } );
            }
        } );
    }

    return {
        init: init
    };

})(window, document);
