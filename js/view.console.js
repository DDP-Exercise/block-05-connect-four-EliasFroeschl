"use strict";

//TODO: Optional: Create a console-view to test your Game.


"use strict";

//TODO: Optional: Create a console-view to test your Game.

export const consoleView = {
    init: function () {
        document.addEventListener("connectFour:stoneInserted", function () {
            console.log("A stone was inserted.");
        });

        document.addEventListener("connectFour:playerChange", function (event) {
            console.log("Current player: " + event.detail.currentPlayer);
        });

        document.addEventListener("connectFour:gameOver", function (event) {
            console.log("Game over. Winner: " + event.detail.winner);
        });
    }
};
