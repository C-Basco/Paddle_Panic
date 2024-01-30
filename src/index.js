import {Game} from "./internal";

window.addEventListener('DOMContentLoaded', function() {
    const game = new Game();

    // Get the PLAY button element
    const playButton = document.querySelector('#start-game button');

    // Attach click event listener to the PLAY button
    playButton.addEventListener('click', function() {
        toggleStart("start-game", false);
        toggleStart("myCanvas", true);
        toggleStart("gameover", false);

        game.gameLoop();
    });

    // Function to toggle elements
    function toggleStart(id, toggle) {
        const element = document.getElementById(id);
        const display = (toggle) ? 'block' : 'none';
        element.style.display = display;
    }
});
