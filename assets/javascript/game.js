var isOpponentDefeated = false;
var hasGameStarted = false;
var bothPlayersPicked = false;
var goodGuyPicked = false;
var badGuyPicked = false;
var goodGuyAttack;
var badGuyAttack;
var attackPower = 10;
var numOfBadGuys = 0;
var killCount = 0; 
var restartGame = function() {
    // When the 'Restart' button is clicked, reload the page.
    var restart = $("<br><button class='btn btn-danger btn-margin'>Restart</button>").click(function() {
      location.reload();
    });
    $(".player-score").append(restart);
}


// Character HP information
function Character(name, hp) {
    this.name = name;
    this.originalHp = hp;
    this.hp = hp;
}

function attack() {
    hasGameStarted = true;
    var audio = new Audio('assets/light-saber-on.mp3');
    audio.play();

    // Goodguy attacks badguy and reduces HP
    badGuyAttack.hp = badGuyAttack.hp - attackPower;
    // Update Opponent's HP
    $(".opponent-score").text(badGuyAttack.hp);
    
   
    // Badguy attacks goodguy and reduces HP
    goodGuyAttack.hp = goodGuyAttack.hp - attackPower;
    // Update HTML HP with Jquery.
    $(".player-score").text(goodGuyAttack.hp);
    //alert (goodGuyAttack.hp);
    attackPower = attackPower + 10;

    var playerScore = goodGuyAttack.hp;
    var opponentScore = badGuyAttack.hp;

    
    // Both players score 
    if (playerScore <= 0 && opponentScore <=0) {
        if (playerScore < opponentScore) { 
            $(".player-score").text('You Lose! “You must unlearn what you have learned.”- Yoda'); 
            $(".attack").off("click");
            restartGame(); 
        }
        else {
            killBadGuy();
        }
    }
    else if (playerScore <= 0) {
        $(".player-score").text("You lose!")
        $(".attack").off("click");
        restartGame(); 
    }
    else if (opponentScore <= 0) {
        killBadGuy();
    }
    else {
        console.log("We're both alive!");
    }
}

// Prints out what character user clicked
$(".character-button").on("click", function() {
    // Get the string value of data-character attribute
    var character = $(this).attr('data-character');
    var hp = $(this).attr('data-hp');
    console.log("User clicked: ", character);

    // Count number of bad guys
    if (hasGameStarted == false) {
        numOfBadGuys = $(".badGuy").length;
    }

    // To create good and bad guys
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
        $(".attack").on("click", attack);
        $(".opponentChosen").empty();
        $(".opponentChosen").append(characterDiv);
        badGuyPicked = true;
        badGuyAttack = new Character(character, hp);

        $(".opponent-score").text(badGuyAttack.hp);
        $(".player-score").text(goodGuyAttack.originalHp);
        goodGuyAttack.hp = goodGuyAttack.originalHp;
    }
}

function killBadGuy() {
    killCount++;
    if (killCount == numOfBadGuys) {
        $(".player-score").text('You Win! "The Force is strong with this one." -Yoda');
        $(".attack").off("click");
        restartGame(); 
    }
    else {
        $(".player-score").text('You Win! Choose your next opponent.');
        $(".attack").off("click");
        badGuyPicked = false;
        isOpponentDefeated = true;
        bothPlayersPicked = false;
    }
}

