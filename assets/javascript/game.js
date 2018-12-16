
$(".character-button").on("click", function() {
    var character = $(this).attr('data-character');
    console.log("User clicked: ", character);
});

$(".attack").on("click", function() {
    var audio = new Audio('assets/light-saber-battle.mp3');
    audio.play();
});
