// must first include init.js

var slider = $( '.flexslider' );

// selector for ids that begin with this string
$( '[id^=begin-button]' ).on( 'click' , (function() {
    $( "#home-page-wrapper" ).addClass( "d-none" );
    $( "#practicing-page-wrapper" ).removeClass( "d-none" );
    
    var randomizedKeys = [];
    var randomizedExercises = [];

    // randomize keys based on settings
    for( key in theKeySettings )
    {
        if( theKeySettings[ key ] )
        {
            randomizedKeys.push( key );
        }
    }
    randomizedKeys = shuffle( randomizedKeys );

    if( this.id == 'begin-button-fullmode' )
    {
        // randomize exercises based on settings
        for( id in theExerciseSettings )
        {
            const exercise = dereferenceExerciseId( id );
            if( theExerciseSettings[ id ][ exercise ] )
            {
                randomizedExercises.push( exercise );
            }
        }
        randomizedExercises = shuffle( randomizedExercises );
    }

    for( index in randomizedKeys )
    {
        const theKey = randomizedKeys[ index ];
        currentKeyCount = parseInt( index ) + 1;
        randomizedExercises = shuffle( randomizedExercises );
        $( '#flexslider-output-container' ).append( generatePracticeHTML( currentKeyCount, randomizedKeys.length, theKey, randomizedExercises ) );
    }
    
    // options: https://gist.github.com/warrendholmes/9481310
    $( '.flexslider' ).flexslider({
        animation: "slide",
        slideshow: false,
        touch: true,
    });
}));

$( '#end-button' ).on( 'click' , (function() {
    // clear flexslider HTML
    if( typeof slider.data( 'flexslider' ) !== "undefined" )
    {
        while( slider.data( 'flexslider' ).count > 0 )
        {
            slider.data( 'flexslider' ).removeSlide( 0 );
        }

        $( '.flexslider').removeData( "flexslider" );
        $( '#flexslider-output-container' ).empty();
    }

    // clear simple mode HTML
    $( '#onepage-key-container' ).empty();
    
    $( "#practicing-page-wrapper" ).addClass( "d-none" );
    $( "#home-page-wrapper" ).removeClass( "d-none" );
}));

// with exercises
function generatePracticeHTML( currentKeyCount, totalKeyCount, keyName, exerciseArray )
{
    const isFirstElement = ( currentKeyCount == 1 );
    const isLastElement = ( currentKeyCount == totalKeyCount );
    
    // opening tag
    var theOutput = `<li class="pb-3">`;
    
    // header with key name
    theOutput += `<h1 class="display-4">${ keyName }</h1>`;
    
    // current key count
    theOutput += `<p class="text-muted">${ currentKeyCount }/${ totalKeyCount }</p>`;
    
    // show all exercises
    for( index in exerciseArray )
    {
        const theExercise = exerciseArray[ index ];
        theOutput += `<p class="lead">${ theExercise }</p>`;
    }
    
    // closing tag
    theOutput += `</li>`;
    
    return theOutput;
}

// https://bost.ocks.org/mike/shuffle/
function shuffle( array )
{
    var m = array.length, t, i;
    
    // while there remain elements to shuffle...
    while( m )
    {
        // pick a remaining element
        i = Math.floor( Math.random() * m-- );
        
        // swap it with the current element
        t = array[ m ];
        array[ m ] = array[ i ];
        array[ i ] = t;
    }
    
    return array;
}