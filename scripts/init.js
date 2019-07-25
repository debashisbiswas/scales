const theKeySettingStorageID = 'key-settings';
const theExerciseSettingsStorageID = 'exercise-settings';
const theExerciseIdPrefix = 'exercise-'
const theDefaultKeySettings = {
    "C": true,
    "F": true,
    "Bb": true,
    "Eb": true,
    "Ab/G#": true,
    "Db/C#": true,
    "Gb/F#": true,
    "B": true,
    "E": true,
    "A": true,
    "D": true,
    "G": true
};

// key initialization
var theKeySettings;
if( localStorage.getItem( theKeySettingStorageID ) )
{
    theKeySettings = JSON.parse( localStorage.getItem( theKeySettingStorageID ) );
}
else
{
    theKeySettings = theDefaultKeySettings;
    localStorage.setItem( theKeySettingStorageID, JSON.stringify( theKeySettings ) );
}

// exercise initialization
var theExerciseSettings = {};
if( localStorage.getItem( theExerciseSettingsStorageID ) )
{
    theExerciseSettings = JSON.parse( localStorage.getItem( theExerciseSettingsStorageID ) );
}
else
{
    // push default exercise settings here
    theExerciseSettings[ generateUniqueExerciseId() ] = { "Major Scale": true };
    theExerciseSettings[ generateUniqueExerciseId() ] = { "Natural Minor Scale": true };
    theExerciseSettings[ generateUniqueExerciseId() ] = { "Harmonic Minor Scale": true };
    theExerciseSettings[ generateUniqueExerciseId() ] = { "Melodic Minor Scale": true };
    theExerciseSettings[ generateUniqueExerciseId() ] = { "Major Arpeggio": true };
    theExerciseSettings[ generateUniqueExerciseId() ] = { "Minor Arpeggio": true };
    theExerciseSettings[ generateUniqueExerciseId() ] = { "Major Thirds": true };
    theExerciseSettings[ generateUniqueExerciseId() ] = { "Minor Thirds": true };
    localStorage.setItem( theExerciseSettingsStorageID, JSON.stringify( theExerciseSettings ) );
}

function generateUniqueExerciseId()
{
    return theExerciseIdPrefix + Math.random().toString(36).substr(2, 16);
}

// returns name of exercise in object based on id, useful for accessing properties in the object
function dereferenceExerciseId( id )
{
    return Object.keys( theExerciseSettings[ id ] )[ 0 ];
}