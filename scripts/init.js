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
    theExerciseSettings[ generateUniqueExerciseId() ] = { "Major Scale": false };
    theExerciseSettings[ generateUniqueExerciseId() ] = { "Minor Arpeggio": true };
    theExerciseSettings[ generateUniqueExerciseId() ] = { "Major Thirds": false };
    localStorage.setItem( theExerciseSettingsStorageID, JSON.stringify( theExerciseSettings ) );
}

function generateUniqueExerciseId()
{
    return theExerciseIdPrefix + Math.random().toString(36).substr(2, 16);
}