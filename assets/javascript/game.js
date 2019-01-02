var isOpponentDefeated = false;
var hasGameStarted = false;
var bothPlayersPicked = false;
var goodGuyPicked = false;
var badGuyPicked = false;
var goodGuyAttack;
var badGuyAttack;
var attackPower = 10;


// Character HP information
function Character(name, hp) {
    this.name = name;
    this.hp = hp;
}


// Prints out what character user clicked
$(".character-button").on("click", function() {
    // Get the string value of data-character attribute
    var character = $(this).attr('data-character');
    var hp = $(this).attr('data-hp');
    console.log("User clicked: ", character);


    if (hasGameStarted == false || isOpponentDefeated == true) {
        // Append the character image to the correct battle area
        if ($(this).parent().hasClass("goodGuy")) {

            createGoodGuy(character, hp, $(this));
        }
        else {
            createBadGuy(character, hp, $(this));
        }

        if (goodGuyPicked && badGuyPicked) {
            bothPlayersPicked = true;
        }
    }
});



function createGoodGuy(character, hp, characterDiv) {
    if (goodGuyPicked == false) {
        $(".playerChosen").append(characterDiv );
        goodGuyPicked = true;

        goodGuyAttack = new Character(character, hp);

        $(".player-score").text(goodGuyAttack.hp);
    }
}

function createBadGuy(character, hp, characterDiv) {
    if (badGuyPicked == false) {
        $(".opponentChosen").append(characterDiv);
        badGuyPicked = true;

        badGuyAttack = new Character(character, hp);

        $(".opponent-score").text(badGuyAttack.hp);
    }
}


$(".attack").on("click", function() {
    var audio = new Audio('assets/light-saber-on.mp3');
    audio.play();

  

    // Goodguy attacks badguy and reduces HP
    badGuyAttack.hp = badGuyAttack.hp - attackPower;
    // Update HTML HP with Jquery
    $(".opponent-score").text(badGuyAttack.hp);
    //alert (badGuyAttack.hp);
   

    
    // Badguy attacks goodguy and reduces HP
    goodGuyAttack.hp = goodGuyAttack.hp - attackPower;
    // Update HTML HP with Jquery.
    $(".player-score").text(goodGuyAttack.hp);
    //alert (goodGuyAttack.hp);
    attackPower = attackPower + 10;

    var playerScore = goodGuyAttack.hp;
    var opponentScore = badGuyAttack.hp;
    
    // If good guy loses
    if (playerScore <= 0) {
        $(".player-score").text('You Lose! “You must unlearn what you have learned.”- Yoda');   
    }
    // If bad guy wins
    if (opponentScore <= 0){
        $(".player-score").text('You Win! Choose your next opponent.');
    }
    
   
});
   
