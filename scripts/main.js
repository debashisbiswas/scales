// must first include init.js

$( '#begin-button' ).on( 'click' , (function() {
    $( "#home-page-wrapper" ).addClass( "d-none" );
    $( "#practicing-page-wrapper" ).removeClass( "d-none" );
    
    var randomizedKeys = [];
    for( key in theKeySettings )
    {
        if( theKeySettings[ key ] )
        {
            randomizedKeys.push( key );
        }
    }
    randomizedKeys = shuffle( randomizedKeys );
    
    var randomizedExercises = [];
    for( id in theExerciseSettings )
    {
        const exercise = dereferenceExerciseId( id );
        if( theExerciseSettings[ id ][ exercise ] )
        {
            randomizedExercises.push( exercise );
        }
    }
    randomizedExercises = shuffle( randomizedExercises );
    
    for( index in randomizedKeys )
    {
        const theKey = randomizedKeys[ index ];
        currentKeyCount = parseInt( index ) + 1;
        randomizedExercises = shuffle( randomizedExercises );    
        $( '#carousel-output-container' ).append( generateKeyHTML( currentKeyCount, randomizedKeys.length, theKey, randomizedExercises ) );
    }

    updateCarouselArrowVisibility();
}));

$( '#end-button' ).on( 'click' , (function() {
    $( "#practicing-page-wrapper" ).addClass( "d-none" );
    $( "#home-page-wrapper" ).removeClass( "d-none" );
    
    $( '#carousel-output-container' ).empty();
}));

$( '#main-carousel' ).on( 'slid.bs.carousel' , '', (function() {
    updateCarouselArrowVisibility();
}));

function updateCarouselArrowVisibility()
{
    $( '#main-carousel' ).children( '.carousel-control-prev' ).show();
    $( '#main-carousel' ).children( '.carousel-control-next' ).show();

    if( $( '.carousel-inner' ).children().first().hasClass( 'active' ) )
    {
        $( '#main-carousel' ).children( '.carousel-control-prev' ).hide();
    }
    if( $( '.carousel-inner' ).children().last().hasClass( 'active' ) )
    {
        $( '#main-carousel' ).children( '.carousel-control-next' ).hide();
    }
}

function generateKeyHTML( currentKeyCount, totalKeyCount, keyName, exerciseArray )
{
    var isFirstElement = ( currentKeyCount == 1 );
    
    // opening div tag
    var theOutput = `<div class="carousel-item ${ isFirstElement ? 'active' : '' }">`

    // header with key name
    theOutput += `<h1 class="display-4">${ keyName }</h1>`

    // current key count
    theOutput += `<p class="text-muted">${ currentKeyCount }/${ totalKeyCount }</p>`;
    
    for( index in exerciseArray )
    {
        const theExercise = exerciseArray[ index ];
        theOutput += `<p class="lead">${ theExercise }</p>`;
    }
    
    // closing div tag
    theOutput += `</div>`;
    
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
        i = Math.floor(Math.random() * m--);
        
        // swap it with the current element
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    
    return array;
}