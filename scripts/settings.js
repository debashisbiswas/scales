// must first include init.js

updateButtonStates();
updateKeyCounter();
initExerciseFields();

// ---------- FUNCTIONS ----------

// makes the button states consistent with the key settings array
function updateButtonStates()
{
    var buttons = $( '.key-selection-button' );
    for( var i = 0; i < buttons.length; i++ )
    {
        var buttonIsSelected = $( buttons[ i ] ).hasClass( 'active' );
        
        // if the key is selected in the array
        if( theKeySettings[ buttons[ i ].firstChild.nodeValue ] )
        {
            // if the button is not selected
            if( !buttonIsSelected )
            {
                // then select it
                $( buttons[ i ] ).button( 'toggle' );
            }
        }
        else // if the key is not selected in the array
        {
            // if the button is selected
            if( buttonIsSelected )
            {
                // then unselect it
                $( buttons[ i ] ).button( 'toggle' );
            }
        }
    }
}

// update a key setting in the array to a new setting
// this function updates localStorage with the new value
function updateKeySetting( key, newSetting )
{
    theKeySettings[ key ] = newSetting;
    updateKeyCounter();                
    localStorage.setItem( theKeySettingStorageID, JSON.stringify( theKeySettings ) );
}

// updates counter that shows user how many key are selected
function updateKeyCounter()
{
    var keySelectedCounter = 0;
    for( key in theKeySettings )
    {
        if( theKeySettings[ key ] )
        {
            keySelectedCounter++;
        }
    }
    
    $( '#key-selection-counter' ).text( generateCounterString( keySelectedCounter, Object.keys( theKeySettings ).length ) );
}

function generateCounterString( selected, total )
{
    return `${ selected }/${ total } selected`;
}

function ExerciseTemplate( id, exerciseName, active )
{
    this.id = id;
    this.exerciseName = exerciseName;
    this.active = active;
}

function initExerciseFields()
{
    for( id in theExerciseSettings )
    {
        const theExerciseName = dereferenceExerciseId( id );
        const theTemplateObject = new ExerciseTemplate( id, theExerciseName, theExerciseSettings[ id ][ theExerciseName ] );
        showExerciseField( theTemplateObject );
    }
    
    updateExerciseCounter();
}

function updateExerciseCounter()
{
    var exerciseSelectedCounter = 0;
    for( id in theExerciseSettings )
    {
        const theExerciseName = dereferenceExerciseId( id );
        if( theExerciseSettings[ id ][ theExerciseName ] )
        {
            exerciseSelectedCounter++;
        }
    }
    
    $( '#exercise-selection-counter' ).text( generateCounterString( exerciseSelectedCounter, Object.keys( theExerciseSettings ).length ) );
}

function generateExerciseSetting( exerciseTemplateObject )
{
    return `
    <div class="input-group input-group-lg mt-2" id="${ exerciseTemplateObject.id }">
        <div class="input-group-prepend">
            <button class="btn btn-outline-primary rounded-0 hoverless-button exercise-selection-button ${ exerciseTemplateObject.active ? 'active' : '' }" type="button" data-toggle="button"></button>
        </div>
        <input type="text" class="form-control exercise-name-field" value="${ exerciseTemplateObject.exerciseName != undefined ? exerciseTemplateObject.exerciseName : '' }">
        <div class="input-group-append">
            <button type="button" class="btn btn-outline-danger rounded-0 exercise-delete-button">✕</button>
        </div>
    </div>`;
}

// use this when the field is stored in the exerciseSettings object/localStorage and we just need to update the UI
function showExerciseField( exerciseTemplateObject )
{
    $( '#setting-exercise-container' ).append( generateExerciseSetting( exerciseTemplateObject ) );
    updateExerciseCounter();
}

// use this to add entirely new exercises - this adds to exerciseSettings object, localStorage, and UI
function addExerciseSetting( exerciseTemplateObject )
{
    const newObject = {};
    newObject[ exerciseTemplateObject.exerciseName ] = exerciseTemplateObject.active;
    
    theExerciseSettings[ exerciseTemplateObject.id ] = newObject;
    localStorage.setItem( theExerciseSettingsStorageID, JSON.stringify( theExerciseSettings ) );
    
    showExerciseField( exerciseTemplateObject );
}

function updateExerciseName( id, newName ) 
{
    const currentExerciseName = dereferenceExerciseId( id );
    const currentStatus = theExerciseSettings[ id ][ currentExerciseName ];
    delete theExerciseSettings[ id ][ currentExerciseName ];
    theExerciseSettings[ id ][ newName ] = currentStatus;
    localStorage.setItem( theExerciseSettingsStorageID, JSON.stringify( theExerciseSettings ) );
}

function updateExerciseSelectionStatus( id, newStatus )
{
    const exerciseName = dereferenceExerciseId( id );
    theExerciseSettings[ id ][ exerciseName ] = newStatus;
    localStorage.setItem( theExerciseSettingsStorageID, JSON.stringify( theExerciseSettings ) );
    updateExerciseCounter();
}

function deleteExercise( id )
{
    $( `#${ id }` ).remove();
    delete theExerciseSettings[ id ];
    console.log( theExerciseSettings );
    localStorage.setItem( theExerciseSettingsStorageID, JSON.stringify( theExerciseSettings ) );
    updateExerciseCounter();                
}

// get the id of the exercise using parent class id
function getExerciseParentId( element )
{
    return $( element ).parents( `div[id^='${ theExerciseIdPrefix }']` )[ 0 ].id;
}

//  ---------- EVENT HANDLERS ----------

$( '.btn' ).on( 'click', (function() {
    $( this ).blur(); // remove lingering outline after button click
}));

$( '.key-selection-button' ).on( 'click', (function() {
    // get the name and new setting for the button that was just pressed
    var keyName = $( this )[0].firstChild.nodeValue;
    // if the button is currently active, it is now getting unselected/being set to false
    var theNewSetting = !( $( this ).hasClass( 'active' ) );
    
    updateKeySetting( keyName, theNewSetting );
}));

$( '#select-all-button' ).on( 'click' , (function() {
    for( var key in theKeySettings )
    {
        if( !theKeySettings[ key ] )
        {
            updateKeySetting( key, true );
        }
    }
    
    updateButtonStates();
}));

$( '#unselect-all-button' ).on( 'click' , (function() {
    for( var key in theKeySettings )
    {
        if( theKeySettings[ key ] )
        {
            updateKeySetting( key, false );
        }
    }
    
    updateButtonStates();
}));

$( '#add-exercise-button' ).on( 'click', (function() {
    var theTemplateObject = new ExerciseTemplate( generateUniqueExerciseId(), "", true );
    addExerciseSetting( theTemplateObject );
}));

$( document ).on( 'click', '.exercise-selection-button', (function() {
    var id = getExerciseParentId( this );
    
    // the new setting corresponds to whether or not the active class exists
    // using document.on gives a different result here than selector.on
    var theNewSetting = ( $( this ).hasClass( 'active' ) );
    
    updateExerciseSelectionStatus( id, theNewSetting );
}));

$( document ).on( 'input', '.exercise-name-field', (function() {
    var id = getExerciseParentId( this );
    updateExerciseName( id, $( this ).val() );
}));

$( document ).on( 'click', '.exercise-delete-button', (function()
{
    var id = getExerciseParentId( this );
    deleteExercise( id );
}));