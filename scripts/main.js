// must first include init.js

$(document).ready((function(){
    $( '#begin-button' ).on( 'click' , (function() {
        $( "#home-page-wrapper" ).addClass( "d-none" );
        $( "#practicing-page-wrapper" ).removeClass( "d-none" );
    }));
    
    $( '#end-button' ).on( 'click' , (function() {
        $( "#practicing-page-wrapper" ).addClass( "d-none" );
        $( "#home-page-wrapper" ).removeClass( "d-none" );
    }));
}));