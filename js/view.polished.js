"use strict";

//TODO: Think of this view as your game board.
//      Your view should listen to various custom events of your model.
//      For each event of your model, there should be a clear visual
//      representation of what's going on.

export const polishedView = {
    battlefieldSpace: null,
    columnButtonSpace: null,
    currentPlayerText: null,
    gameMessageText: null,
    restartButton: null,

    init: function () {
        this.battlefieldSpace = document.getElementById("battlefield");
        this.columnButtonSpace = document.getElementById("column-buttons");
        this.currentPlayerText = document.getElementById("current-player");
        this.gameMessageText = document.getElementById("game-message");
        this.restartButton = document.getElementById("restart-button");
        this.buildColumnButtons();
        document.addEventListener("connectFour:stoneInserted", function (event) {
            polishedView.updateBattlefield(event.detail.battlefield);
        });
        document.addEventListener("connectFour:playerChange", function (event) {
            polishedView.showCurrentPlayer(event.detail.currentPlayer);
        });
        document.addEventListener("connectFour:gameOver", function (event) {
            polishedView.showGameOver(event.detail.winner, event.detail.winningStones);
        });
    },

    buildColumnButtons: function () {
        this.columnButtonSpace.innerHTML = "";

        for (let i = 0; i < 7; i++) {
            let columnButton = document.createElement("button");
            columnButton.className = "column-button";
            columnButton.textContent = "Attack";
            columnButton.setAttribute("data-column", i); // saves the column number for this button

            this.columnButtonSpace.appendChild(columnButton);
        }
    },


//TODO: Update the field. Show the whole battlefield with all the stones
//      that are already played.

    updateBattlefield: function (battlefield) {
        this.battlefieldSpace.innerHTML = "";
        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 7; col++) {

                let battlefieldSpace = document.createElement("div");
                let stone = battlefield[row][col];
                battlefieldSpace.className = "battlefield-space";

                if (stone === "Mario") {
                    battlefieldSpace.className = "battlefield-space mario-stone";
                    battlefieldSpace.textContent = "M";
                }
                if (stone === "Bowser") {
                    battlefieldSpace.className = "battlefield-space bowser-stone";
                    battlefieldSpace.textContent = "B";
                }
                battlefieldSpace.id = "battlefield-space-" + row + "-" + col;
                this.battlefieldSpace.appendChild(battlefieldSpace);
            }
        }
    },


//TODO: Show the current player

    showCurrentPlayer: function (player) {
        this.currentPlayerText.textContent = "Current player: " + player;

        let gameLayoutSpace = document.getElementById("game-layout");
        gameLayoutSpace.classList.remove("mario-turn");
        gameLayoutSpace.classList.remove("bowser-turn");
        gameLayoutSpace.classList.remove("mario-wins");
        gameLayoutSpace.classList.remove("bowser-wins");

        if (player === "Mario") {
            this.gameMessageText.textContent = "Mario chooses the next pipe.";
            gameLayoutSpace.classList.add("mario-turn");
        } else {
            this.gameMessageText.textContent = "Bowser wants to block the rescue.";
            gameLayoutSpace.classList.add("bowser-turn");
        }
    },


//TODO: Notify the player when the game is over. Make it clear how the
//      Game ended. If it's a win, show the winning stones.



    showGameOver: function (winner, winningStones) {
        let gameLayoutSpace = document.getElementById("game-layout");

        if (winner === null) {
            this.gameMessageText.textContent = "The game ended in a draw.";
            gameLayoutSpace.classList.remove("mario-turn");
            gameLayoutSpace.classList.remove("bowser-turn");
            return;
        }

        this.currentPlayerText.textContent = "Winner: " + winner;

        gameLayoutSpace.classList.remove("mario-turn");
        gameLayoutSpace.classList.remove("bowser-turn");

        if (winner === "Mario") {
            this.gameMessageText.textContent = "Mario connected four and saved Princess Peach!";
            gameLayoutSpace.classList.add("mario-wins");
        } else {
            this.gameMessageText.textContent = "Bowser connected four and keeps the castle!";
            gameLayoutSpace.classList.add("bowser-wins");
        }

        this.markWinningStones(winningStones);
    },

    markWinningStones: function (winningStones) {
        for (let i = 0; i < winningStones.length; i++) {
            let row = winningStones[i][0];
            let col = winningStones[i][1];

            let battlefieldSpace = document.getElementById("battlefield-space-" + row + "-" + col);

            if (battlefieldSpace !== null) {
                battlefieldSpace.className = battlefieldSpace.className + " winning-stone";
            }
        }
    }

};