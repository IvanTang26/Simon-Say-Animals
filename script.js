/**
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 *              SIMON SAYS
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 */

// Sound Files
var defaultSounds = {
    0: "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
    1: "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
    2: "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
    3: "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3",
    error: "http://www.pacdv.com/sounds/interface_sound_effects/beep-5.wav"
}

var animalSounds = {
    0: "https://www.freesoundeffects.com/mp3_466266.mp3",
    1: "http://labdevelopments.byethost16.com/audio/parrot.wav",
    2: "https://www.freesoundeffects.com/mp3_466188.mp3",
    3: "http://dight310.byu.edu/media/audio/FreeLoops.com/3/3/Dolphin%20Chatter-17517-Free-Loops.com.mp3",
    error: "http://www.pacdv.com/sounds/interface_sound_effects/beep-5.wav"
}

var sounds = animalSounds;

// the current simon says sequence
var sequence = [];

// the correct number of steps the user has chosen
var numCorrectInARow = 0;

// toggles wether the game is set to strict mode
var isStrict = false;

/**
 * Randomly chooses the next random step
 */
function pickNextStep() {
    var nextStep = parseInt(Math.random()*4);
    sequence.push(nextStep);
}

/**
 * Plays the current sequence
 */
function playSequence(delay, speed) {
    var startDelay = 0;
    var delay = delay === undefined ? 1500 : delay;
    var speed = speed === undefined ? 500 : speed;

    $(".step").addClass("disable");
    sequence.forEach(function(step, index){
        setTimeout(function(){
            lightStep(step, speed);
        }, startDelay+= delay);
    });

    setTimeout(function(){
        $(".step").removeClass("disable");
    }, delay);
}

/**
 * Lights the next step
 */
function lightStep(nextStep, speed) {
    $(".simon-says .step").eq(nextStep).addClass("light-up", speed, function(){
        playSound(nextStep);
        $(".simon-says .step").eq(nextStep).removeClass("light-up", speed);
    });
}

/**
 * Checks if the user has chosen the correct next step
 */
function isCorrectStep(index) {
    if(index === sequence[numCorrectInARow])
        return true;
    else
        return false;
}

/**
 * Resets the game back to it's original settings
 */
function reset() {
    sequence = [];
    numCorrectInARow = 0;
    $(".step").removeClass("light-up");
}

/**
 * Starts a new game
 */
function start() {
    pickNextStep();
    var formattedScore = sequence.length < 10 ? "0" + sequence.length : sequence.length;
    $(".stepCount").text( formattedScore );
    playSequence();
}

/**
 * Play a sound
 */
function playSound(index) {
    var sound = new Audio(sounds[index]);
    sound.play();
}

/**
 * Get the users choice and check to see if it matches the next step
 */
$(".simon-says .step").on("click", function(){
    var index = $(this).index();
  
    if(sequence.length === 21) {
      alert("Congrats You've won!");
      reset();
      start();
    }

    if(isCorrectStep(index)){
        
        lightStep(index, 1000);
        playSound(index);

        numCorrectInARow++;

        if(numCorrectInARow === sequence.length)
        {
            start();
            numCorrectInARow = 0;
        }
    } else
    {
        playSound('error');

        if(isStrict)
            reset();
        else
        {
            numCorrectInARow = 0;
            playSequence();   
        }
    }
});

/**
 * Handles the start button of the simon says game
 */
$("#startBtn").on("click", function(){
    reset();
    start();
    $(this).parent().find(".startLbl").text("Reset");
});

/**
* Handles the Reset
*/

/**
 * Handles the animal button
 */
$("#animalBtn").on("click", function(){
    sounds = animalSounds;
    $(".step").removeClass("animal");
    $(".step").addClass("animal");
});

/**
 * Handles the default button
 */
$("#defaultBtn").on("click", function(){
    sounds = defaultSounds;
    $(".step").removeClass("animal");
});

/**
 * Handles the strict button
 */
$("#strictBtn").on("click", function(){
    if(isStrict) {
        isStrict = false;
        $(".light").removeClass("lit");    
    } else {
        isStrict = true;
        $(".light").addClass("lit");    
    }
});