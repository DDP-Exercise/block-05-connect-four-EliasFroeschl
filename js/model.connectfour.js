"use strict";

//TODO: Think of this model as the game-logic.
//      The model knows everything that is neccessary to manage
//      the game. It knows the players, know who's turn it is,
//      knows all the stones and where they are, knows if the
//      game is over and if so, why (draw or winner). It knows
//      which stones are the winning stones. The model also has
//      sovereignty over the battlefield.
//      First step: Create your model-object with all the properties
//      necessary to store that information.

export const connectFourModel = {
    rows: 6,
    columns: 7,
    players: ["Mario", "Bowser"],
    currentPlayerIndex: 0,
    battlefield: [],
    gameOver: false,
    winningStones: [],


//TODO: Prepare some customEvents. The model should dispatch events when
//      - The Player Changes
//      - A stone was inserted
//      - The Game is over (Draw or Winner)
//      Don't forget to give your events a namespace.
//      For each customEvent, just make a >method< for your model-object,
//      that, when called, dispatches the event. Nothing else should
//      happen in those methods.

    dispatchPlayerChange: function () {
        const event = new CustomEvent("connectFour:playerChange", {
            detail: {
                currentPlayer: this.players[this.currentPlayerIndex]
            }
        });
        document.dispatchEvent(event);
    },

    dispatchStoneInserted: function () {
        const event = new CustomEvent("connectFour:stoneInserted", {
            detail: {
                battlefield: this.battlefield
            }
        });
        document.dispatchEvent(event);
    },

    dispatchGameOver: function (winner) {
        const event = new CustomEvent("connectFour:gameOver", {
            detail: {
                winner: winner,
                winningStones: this.winningStones
            }
        });
        document.dispatchEvent(event);
    },


//TODO: Initiate the battlefield. Your model needs a representation of the
//      battlefield as data (two-dimensional array). Obviously, there are
//      no stones yet in the field.

    initBattlefield: function () {
        this.battlefield = [];
        for (let row = 0; row < this.rows; row++) {
            let currentRow = [];

            for (let col = 0; col < this.columns; col++) {
                currentRow.push(null);

            }
            this.battlefield.push(currentRow);
        }
    },

//TODO: The model should offer a method to insert a stone at a given column.
//      If the stone can be inserted, the model should insert the stone,
//      dispatch an event to let the world know that the battlefield has changed
//      and check if the game is over now.
//      Hint: This method will be called later by your controller, when the
//      user makes an according input.

    insertStone: function (column) {
        if (this.gameOver === true) {
            return;
        }

        for (let row = this.rows - 1; row >= 0; row--) {
            if (this.battlefield[row][column] === null) {
                this.battlefield[row][column] = this.players[this.currentPlayerIndex];
                this.dispatchStoneInserted();
                this.checkGameOver();

                if (this.gameOver === false) {
                    this.changePlayer();
                }
                return;
            }
        }
        window.alert("This column is already full. Please choose another one.")
    },


//TODO: Methods to check if the game is over, either by draw or a win.
//      Let the world know in both cases what happend. If it's a win,
//      Don't forget to store the winning stones and add this >detail<
//      to your custom event.

    checkGameOver: function () {
        let winner = this.checkWinner();

        if (winner !== null) {
            this.gameOver = true;
            this.dispatchGameOver(winner);
            return;
        }
        if (this.checkDraw() === true) {
            this.gameOver = true;
            this.dispatchGameOver(null);
        }
    },

    checkDraw: function () {
        for (let i = 0; i < this.columns; i++) {
            if (this.battlefield[0][i] == null) {
                return false;
            }
        }

        return true;
    },

    checkFour: function (startRow, startCol, rowStep, colStep) {
        let player = this.battlefield[startRow][startCol];
        let stones = [];

        for (let i = 0; i < 4; i++) {
            let row = startRow + i * rowStep;
            let col = startCol + i * colStep;

            if (row < 0 || row >= this.rows || col < 0 || col >= this.columns) {
                return false;
            }

            if (this.battlefield[row][col] !== player) {
                return false;
            }

            stones.push([row, col]);
        }

        this.winningStones = stones;
        return true;
    },

    checkWinner: function () {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.columns; col++) {
                let player = this.battlefield[row][col];

                if (player !== null) {
                    if (this.checkFour(row, col, 0, 1) === true) {
                        return player;
                    }

                    if (this.checkFour(row, col, 1, 0) === true) {
                        return player;
                    }

                    if (this.checkFour(row, col, 1, 1) === true) {
                        return player;
                    }

                    if (this.checkFour(row, col, 1, -1) === true) {
                        return player;

                    }
                }
            }
        }

        return null;
    },



//TODO: Method to change the current player (and dispatch the according event).

    changePlayer: function () {
        if (this.currentPlayerIndex === 0) {
            this.currentPlayerIndex = 1;
        } else {
            this.currentPlayerIndex = 0;
        }

        this.dispatchPlayerChange();
    }
};