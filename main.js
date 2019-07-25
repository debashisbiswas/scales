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
        $( '#output-container' ).append( generateKeyHTML( currentKeyCount, randomizedKeys.length, theKey, randomizedExercises ) );
    }
}));

$( '#end-button' ).on( 'click' , (function() {
    $( "#practicing-page-wrapper" ).addClass( "d-none" );
    $( "#home-page-wrapper" ).removeClass( "d-none" );

    $( '#output-container' ).empty();
}));

function generateKeyHTML( currentKeyCount, totalKeyCount, keyName, exerciseArray )
{
    var theOutput = `
    <h1 class="display-4">${ keyName }</h1>
    <p class="text-muted">
        ${ currentKeyCount }/${ totalKeyCount }
    </p>
    `;

    for( index in exerciseArray )
    {
        var isLastElement = false;
        isLastElement = ( index == exerciseArray.length - 1 );

        theOutput += `
        <p class="lead ${ isLastElement ? 'pb-4' : '' }">
            ${ exerciseArray[ index ] }
        </p>
        `;
    }

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